import { SAXParser, StartTagLocationInfo } from 'parse5';
/**
* Abstract Lint Rule
*/
export declare abstract class Rule {
    private errors;
    constructor();
    protected reportError(error: Error): void;
    init(parser: SAXParser, parseState: ParseState): void;
    finalise(): Error[];
}
/**
* An error object
*/
export declare class Error {
    message: string;
    line: number;
    column: number;
    constructor(message: string, line: number, column: number);
}
/**
 * Rule to ensure non-void elements do not self-close
 */
export declare class SelfCloseRule extends Rule {
    init(parser: SAXParser, parseState: ParseState): void;
}
/**
 * Rule to ensure tags are properly closed.
 */
export declare class ParserRule extends Rule {
    private parseState;
    init(parser: SAXParser, parseState: ParseState): void;
    finalise(): Error[];
}
/**
 *  Node in traversal stack
 */
export declare class ParseNode {
    scope: string;
    name: string;
    location: StartTagLocationInfo;
    constructor(scope: string, name: string, location: StartTagLocationInfo);
}
/**
 *  Helper to maintain the current state of open tags
 */
export declare class ParseState {
    private scopes;
    private voids;
    stack: ParseNode[];
    errors: Error[];
    scope: string;
    nextScope: string;
    constructor(scopes?: string[], voids?: string[]);
    initPreRules(parser: SAXParser): void;
    initPostRules(parser: SAXParser): void;
    finalise(): void;
    private isVoid(name);
    private isScope(name);
}
export declare class Linter {
    private rules;
    constructor(rules?: Rule[]);
    lint(html: string): Promise<string[]>;
}
