import {SAXParser, StartTagLocationInfo} from 'parse5';
import * as parse5 from 'parse5';
import {ParserNode} from './parser-node';
import {Issue, IssueSeverity} from './issue';

/**
 *  Helper to maintain the current state of open tags  
 */
export class ParserState {
    private scopes: string[];
    private voids: string[];

    public stack: ParserNode[];
    public issues: Issue[];

    public scope: string;
    public nextScope: string;
    public nextNode: ParserNode;

    constructor(scopes?: string[], voids?: string[]) {
        if (scopes == null)
            scopes = ['html', 'body', 'template', 'svg', 'math'];

        if (voids == null)
            voids = ['area', 'base', 'br', 'col', 'embed', 'hr',
                'img', 'input', 'keygen', 'link', 'meta',
                'param', 'source', 'track', 'wbr'];

        this.scopes = scopes;
        this.voids = voids;
    }

    initPreRules(parser: SAXParser) {
        this.stack = [];
        this.issues = [];

        var stack = this.stack;

        parser.on("startTag", (name, attrs, selfClosing, location) => {
            this.nextScope = null;
            this.nextNode = null;   

            if(stack.length> 0 && stack[stack.length-1].isVoid)
                this.popStack();
            let isVoid = this.isVoid(name);

            if (!selfClosing) {
                let currentScope = this.scope;
                let nextScope = ""

                if (stack.length > 0)
                    nextScope = stack[stack.length - 1].scope;

                if (this.isScope(name))
                    nextScope = name;

                this.nextScope = nextScope;
                this.nextNode = new ParserNode(currentScope, name, attrs, isVoid, location);
            }
        });

        parser.on("endTag", (name, location) => {

            if(stack.length> 0 && stack[stack.length-1].isVoid)
                this.popStack();
                
            let isVoid = this.isVoid(name);

            if (stack.length <= 0 || stack[stack.length - 1].name != name) {
                let issue = new Issue({
                    message: "mismatched close tag",
                    line: location.line,
                    column: location.col,
                    severity: IssueSeverity.Error
                });
                this.issues.push(issue);
            }
            else {
                this.popStack();
            }
        });
    }

    initPostRules(parser: SAXParser) {
        var self = this;

        parser.on("startTag", () => {
            if (self.nextScope !== null)
                self.scope = self.nextScope;
            self.nextScope = null;

            if (self.nextNode != null)
                self.stack.push(self.nextNode)
            self.nextNode = null;
        });
    }

    finalise() {
        let stack = this.stack;

        if (stack.length > 0) {
            let element = stack[stack.length - 1]
            let issue = new Issue({
                message: "suspected unclosed element detected",
                severity: IssueSeverity.Error,
                line: element.location.line,
                column: element.location.col,
            });
            this.issues.push(issue);
        }
    }

    public isVoid(name: string): boolean {
        return this.voids.indexOf(name) >= 0;
    }

    public isScope(name: string): boolean {
        return this.scopes.indexOf(name) >= 0;
    }

    private popStack() {
        var stack = this.stack;

        stack.pop();
        if (stack.length > 0) {
            this.scope = stack[stack.length - 1].scope;
        }
        else {
            this.scope = "";
        }
    }
}