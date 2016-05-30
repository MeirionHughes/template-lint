"use strict";
const parse_node_1 = require('./parse-node');
const rule_error_1 = require('./rule-error');
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
                let error = new rule_error_1.RuleError("mismatched close tag", location.line, location.col);
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
            if (self.nextStack != null)
                self.stack.push(self.nextStack);
            self.nextStack = null;
        });
    }
    finalise() {
        let stack = this.stack;
        let errors = this.errors;
        if (stack.length > 0) {
            let element = stack[stack.length - 1];
            let error = new rule_error_1.RuleError("suspected unclosed element detected", element.location.line, element.location.col);
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

//# sourceMappingURL=parse-state.js.map
