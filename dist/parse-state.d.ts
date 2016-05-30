import { SAXParser } from 'parse5';
import { ParseNode } from './parse-node';
import { RuleError } from './rule-error';
/**
 *  Helper to maintain the current state of open tags
 */
export declare class ParseState {
    private scopes;
    private voids;
    stack: ParseNode[];
    errors: RuleError[];
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
