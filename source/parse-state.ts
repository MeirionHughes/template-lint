import {SAXParser, StartTagLocationInfo} from 'parse5';
import * as parse5 from 'parse5';
import {ParseNode} from './parse-node';
import {RuleError} from './rule-error';

/**
 *  Helper to maintain the current state of open tags  
 */
export class ParseState {
    private scopes: string[];
    private voids: string[];

    public stack: ParseNode[];
    public errors: RuleError[];

    public scope: string;
    public nextScope: string;

    constructor(scopes?: string[], voids?: string[]) {
        if (scopes == null)
            scopes = ['html', 'body', 'template', 'svg'];

        if (voids == null)
            voids = ['area', 'base', 'br', 'col', 'embed', 'hr',
                'img', 'input', 'keygen', 'link', 'meta',
                'param', 'source', 'track', 'wbr'];

        this.scopes = scopes;
        this.voids = voids;
    }

    initPreRules(parser: SAXParser) {
        this.stack = [];
        this.errors = [];

        var self = this;
        var stack = this.stack;

        parser.on("startTag", (name, attrs, selfClosing, location) => {
            self.nextScope = null;
            if (!selfClosing && !self.isVoid(name)) {

                let currentScope = self.scope;
                let nextScope = ""

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
                let error = new RuleError("mismatched close tag", location.line, location.col);
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

    initPostRules(parser: SAXParser) {
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
            let element = stack[stack.length - 1]
            let error = new RuleError("suspected unclosed element detected",
                element.location.line, 
                element.location.col);
            errors.push(error);
        }
    }

    private isVoid(name: string): boolean {
        return this.voids.indexOf(name) >= 0;
    }

    private isScope(name: string): boolean {
        return this.scopes.indexOf(name) >= 0;
    }
}