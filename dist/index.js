"use strict";
const parse5_1 = require('parse5');
const stream_1 = require('stream');
/**
* Abstract Lint Rule
*/
class Rule {
    constructor() {
        this.errors = [];
    }
    reportError(error) {
        if (error) {
            this.errors.push(error);
        }
    }
    init(parser, parseState) {
    }
    finalise() {
        let errors = this.errors;
        this.errors = [];
        return errors;
    }
}
exports.Rule = Rule;
/**
* An error object
*/
class Error {
    constructor(message, line, column) {
        this.message = message;
        this.line = line;
        this.column = column;
    }
}
exports.Error = Error;
/**
 * Rule to ensure non-void elements do not self-close
 */
class SelfCloseRule extends Rule {
    init(parser, parseState) {
        super.init(parser, parseState);
        const voidTags = [
            'area', 'base', 'br', 'col', 'embed', 'hr',
            'img', 'input', 'keygen', 'link', 'meta',
            'param', 'source', 'track', 'wbr'];
        var self = this;
        parser.on('startTag', (name, attrs, selfClosing, location) => {
            if (parseState.scope == 'svg') {
                return;
            }
            if (selfClosing && voidTags.indexOf(name) < 0) {
                self.reportError(new Error("self-closing element", location.line, location.col));
            }
        });
    }
}
exports.SelfCloseRule = SelfCloseRule;
/**
 * Rule to ensure tags are properly closed.
 */
class ParserRule extends Rule {
    init(parser, parseState) {
        super.init(parser, parseState);
        this.parseState = parseState;
    }
    finalise() {
        return this.parseState.errors;
    }
}
exports.ParserRule = ParserRule;
/**
 *  Node in traversal stack
 */
class ParseNode {
    constructor(scope, name, location) {
        this.scope = scope;
        this.name = name;
        this.location = location;
    }
}
exports.ParseNode = ParseNode;
/**
 *  Helper to maintain the current state of open tags
 */
class ParseState {
    constructor(scopes, voids) {
        if (scopes == null)
            scopes = ['html', 'body', 'template', 'svg'];
        if (voids == null)
            voids = ['area', 'base', 'br', 'col', 'embed', 'hr',
                'img', 'input', 'keygen', 'link', 'meta',
                'param', 'source', 'track', 'wbr'];
        this.scopes = scopes;
        this.voids = voids;
    }
    initPreRules(parser) {
        this.stack = [];
        this.errors = [];
        var self = this;
        var stack = this.stack;
        parser.on("startTag", (name, attrs, selfClosing, location) => {
            self.nextScope = null;
            if (!selfClosing && !self.isVoid(name)) {
                let currentScope = self.scope;
                let nextScope = "";
                if (stack.length > 0)
                    nextScope = stack[stack.length - 1].scope;
                if (self.isScope(name))
                    nextScope = name;
                self.nextScope = nextScope;
                stack.push(new ParseNode(currentScope, name, location));
            }
        });
        parser.on("endTag", (name, location) => {
            if (stack.length <= 0 || stack[stack.length - 1].name != name) {
                let error = new Error("mismatched close tag", location.line, location.col);
                self.errors.push(error);
            }
            else {
                stack.pop();
                if (stack.length > 0) {
                    self.scope = stack[stack.length - 1].scope;
                }
                else {
                    self.scope = "";
                }
            }
        });
    }
    initPostRules(parser) {
        var self = this;
        parser.on("startTag", () => {
            if (self.nextScope !== null)
                self.scope = self.nextScope;
            self.nextScope = null;
        });
    }
    finalise() {
        let stack = this.stack;
        let errors = this.errors;
        if (stack.length > 0) {
            let element = stack[stack.length - 1];
            let error = new Error("suspected unclosed element detected", element.location.line, element.location.col);
            errors.push(error);
        }
    }
    isVoid(name) {
        return this.voids.indexOf(name) >= 0;
    }
    isScope(name) {
        return this.scopes.indexOf(name) >= 0;
    }
}
exports.ParseState = ParseState;
class Linter {
    constructor(rules) {
        if (!rules)
            rules = [
                new ParserRule(),
                new SelfCloseRule(),
            ];
        this.rules = rules;
    }
    lint(html) {
        var parser = new parse5_1.SAXParser({ locationInfo: true });
        var parseState = new ParseState();
        var stream = new stream_1.Readable();
        parseState.initPreRules(parser);
        let rules = this.rules;
        rules.forEach((rule) => {
            rule.init(parser, parseState);
        });
        parseState.initPostRules(parser);
        stream.push(html);
        stream.push(null);
        var work = stream.pipe(parser);
        var completed = new Promise(function (resolve, reject) {
            work.on("end", () => {
                parseState.finalise();
                resolve();
            });
        });
        var ruleTasks = [];
        rules.forEach((rule) => {
            let task = completed.then(() => {
                return rule.finalise();
            });
            ruleTasks.push(task);
        });
        return Promise.all(ruleTasks).then(results => {
            var all = [];
            results.forEach(parts => {
                all = all.concat(parts);
            });
            return all;
        });
    }
}
exports.Linter = Linter;

//# sourceMappingURL=index.js.map