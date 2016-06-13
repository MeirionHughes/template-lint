import { SAXParser } from 'parse5';
import { ParseNode } from './parse-node';
import { Issue } from './issue';
/**
 *  Helper to maintain the current state of open tags
 */
export declare class ParseState {
    private scopes;
    private voids;
    stack: ParseNode[];
    issues: Issue[];
    scope: string;
    nextScope: string;
    nextStack: ParseNode;
    constructor(scopes?: string[], voids?: string[]);
    initPreRules(parser: SAXParser): void;
    initPostRules(parser: SAXParser): void;
    finalise(): void;
    isVoid(name: string): boolean;
    isScope(name: string): boolean;
}
