import { SAXParser, StartTagLocationInfo } from 'parse5';
/**
* Abstract Lint Rule
*/
export declare abstract class Rule {
    name: string;
    description: string;
    errors: string[];
    abstract init(parser: SAXParser, parseState: ParseState): any;
    finalise(): void;
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
    finalise(): void;
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
    stack: ParseNode[];
    errors: string[];
    private scopes;
    scope: string;
    constructor(scopes?: string[]);
    init(parser: SAXParser): void;
    finalise(): void;
    private isVoid(name);
    private isScope(name);
}
export declare class Linter {
    private rules;
    constructor(rules?: Rule[]);
    lint(html: string): Promise<string[]>;
}
