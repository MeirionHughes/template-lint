"use strict";
const parse_node_1 = require('./parse-node');
const issue_1 = require('./issue');
/**
 *  Helper to maintain the current state of open tags
 */
class ParseState {
    constructor(scopes, voids) {
        if (scopes == null)
            scopes = ['html', 'body', 'template', 'svg', 'math'];
        if (voids == null)
            voids = ['area', 'base', 'br', 'col', 'embed', 'hr',
                'img', 'input', 'keygen', 'link', 'meta',
                'param', 'source', 'track', 'wbr'];
        this.scopes = scopes;
        this.voids = voids;
    }
    initPreRules(parser) {
        this.stack = [];
        this.issues = [];
        var self = this;
        var stack = this.stack;
        parser.on("startTag", (name, attrs, selfClosing, location) => {
            self.nextScope = null;
            self.nextStack = null;
            if (!selfClosing && !self.isVoid(name)) {
                let currentScope = self.scope;
                let nextScope = "";
                if (stack.length > 0)
                    nextScope = stack[stack.length - 1].scope;
                if (self.isScope(name))
                    nextScope = name;
                self.nextScope = nextScope;
                self.nextStack = new parse_node_1.ParseNode(currentScope, name, location);
            }
        });
        parser.on("endTag", (name, location) => {
            if (stack.length <= 0 || stack[stack.length - 1].name != name) {
                let issue = new issue_1.Issue({
                    message: "mismatched close tag",
                    line: location.line,
                    column: location.col,
                    severity: issue_1.IssueSeverity.Error
                });
                self.issues.push(issue);
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
            if (self.nextStack != null)
                self.stack.push(self.nextStack);
            self.nextStack = null;
        });
    }
    finalise() {
        let stack = this.stack;
        if (stack.length > 0) {
            let element = stack[stack.length - 1];
            let issue = new issue_1.Issue({
                message: "suspected unclosed element detected",
                severity: issue_1.IssueSeverity.Error,
                line: element.location.line,
                column: element.location.col,
            });
            this.issues.push(issue);
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

//# sourceMappingURL=parse-state.js.map
