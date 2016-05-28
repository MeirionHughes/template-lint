"use strict";
const parse5_1 = require('parse5');
const stream_1 = require('stream');
/**
* Abstract Lint Rule
*/
class Rule {
    finalise() { }
}
exports.Rule = Rule;
/**
 * Rule to ensure non-void elements do not self-close
 */
class SelfCloseRule extends Rule {
    init(parser, parseState) {
        const voidTags = [
            'area', 'base', 'br', 'col', 'embed', 'hr',
            'img', 'input', 'keygen', 'link', 'meta',
            'param', 'source', 'track', 'wbr'];
        var self = this;
        self.errors = [];
        parser.on('startTag', (name, attrs, selfClosing, location) => {
            if (parseState.scope == 'svg') {
                if (name == 'svg' && selfClosing) {
                    let error = "self-closing element [line: " + location.line + "]";
                    self.errors.push(error);
                }
                return;
            }
            if (selfClosing) {
                if (voidTags.indexOf(name) < 0) {
                    let error = "self-closing element [line: " + location.line + "]";
                    self.errors.push(error);
                }
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
        this.parseState = parseState;
        this.errors = [];
    }
    finalise() {
        this.errors = this.parseState.errors;
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
    constructor(scopes) {
        if (scopes == null)
            scopes = ['html', 'body', 'template', 'svg'];
        this.scopes = scopes;
    }
    init(parser) {
        this.stack = [];
        this.errors = [];
        var self = this;
        var stack = this.stack;
        parser.on("startTag", (name, attrs, selfClosing, location) => {
            if (!selfClosing && !self.isVoid(name)) {
                let scope = "";
                if (stack.length > 0)
                    scope = stack[stack.length - 1].scope;
                if (self.isScope(name))
                    scope = name;
                self.scope = scope;
                stack.push(new ParseNode(scope, name, location));
            }
        });
        parser.on("endTag", (name, location) => {
            if (stack.length <= 0 || stack[stack.length - 1].name != name) {
                let error = "mismatched close tag found [line: " + location.line + "]";
                self.errors.push(error);
            }
            else {
                stack.pop();
            }
        });
    }
    finalise() {
        let stack = this.stack;
        let errors = this.errors;
        if (stack.length > 0) {
            let element = stack[stack.length - 1];
            let error = "suspected unclosed element detected [line: " + element.location.line + "]";
            errors.push(error);
        }
    }
    isVoid(name) {
        const voidTags = [
            'area', 'base', 'br', 'col', 'embed', 'hr',
            'img', 'input', 'keygen', 'link', 'meta',
            'param', 'source', 'track', 'wbr'];
        return voidTags.indexOf(name) >= 0;
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
                new ParseRule(),
                new SelfCloseRule(),
            ];
        this.rules = rules;
    }
    lint(html) {
        var parser = new parse5_1.SAXParser({ locationInfo: true });
        var parseState = new ParseState();
        var stream = new stream_1.Readable();
        // must be done before initialising rules
        parseState.init(parser);
        var rules = this.rules;
        rules.forEach((rule) => {
            rule.init(parser, parseState);
        });
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
                rule.finalise();
                return rule.errors;
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

//# sourceMappingURL=template-lint.js.map
