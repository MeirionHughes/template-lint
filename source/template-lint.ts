"use strict";

import {SAXParser, StartTagLocationInfo} from 'parse5';
import * as parse5 from 'parse5';
import {Readable} from 'stream';

/**
* Abstract Lint Rule 
*/
export abstract class Rule {
    private errors: Error[];
    protected reportError(error: Error) {
        if (error)
            this.errors.push(error);
    }
    
    init(parser: SAXParser, parseState: ParseState) {
        this.errors = [];
    }

    finalise(): Error[] {
        return this.errors;
    }
}

/**
* An error object
*/
export class Error {
    constructor(public message: string, public line: number, public column: number) {
    }
}

/**
 * Rule to ensure non-void elements do not self-close
 */
export class SelfCloseRule extends Rule {
    init(parser: SAXParser, parseState: ParseState) {
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
                self.reportError(new Error("self-closing element", location.line, location.col))
            }
        });
    }
}

/**
 * Rule to ensure tags are properly closed. 
 */
export class ParserRule extends Rule {
    private parseState: ParseState;

    init(parser: SAXParser, parseState: ParseState) {
        super.init(parser, parseState);
        this.parseState = parseState;
    }

    finalise(): Error[] {
        return this.parseState.errors;
    }
}

/**
 *  Node in traversal stack
 */
export class ParseNode {
    constructor(public scope: string, public name: string, public location: StartTagLocationInfo) {
    }
}

/**
 *  Helper to maintain the current state of open tags  
 */
export class ParseState {
    private scopes: string[];
    private voids: string[];

    public stack: ParseNode[];
    public errors: Error[];

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
            let error = new Error("suspected unclosed element detected",
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

export class Linter {

    private rules: Array<Rule>;

    constructor(rules?: Rule[]) {
        if (!rules)
            rules = [
                new ParserRule(),
                new SelfCloseRule(),
            ];
        this.rules = rules;
    }

    lint(html: string): Promise<string[]> {
        
        var parser: SAXParser = new SAXParser({ locationInfo: true });
        var parseState: ParseState = new ParseState();
        var stream: Readable = new Readable();

        parseState.initPreRules(parser);

        let rules = this.rules;

        rules.forEach((rule) => {
            rule.init(parser, parseState);
        });

        parseState.initPostRules(parser);


        stream.push(html);
        stream.push(null);
        var work = stream.pipe(parser);

        var completed = new Promise<void>(function (resolve, reject) {
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