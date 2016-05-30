import { SAXParser } from 'parse5';
import { ParseState } from './parse-state';
import { RuleError } from './rule-error';
/**
* Abstract Lint Rule
*/
export declare abstract class Rule {
    private errors;
    constructor();
    protected reportError(error: RuleError): void;
    init(parser: SAXParser, parseState: ParseState): void;
    finalise(): RuleError[];
}
