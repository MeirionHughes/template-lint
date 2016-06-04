import { SAXParser } from 'parse5';
import { Rule } from './rule';
import { ParseState } from './parse-state';
import { RuleError } from './rule-error';
/**
 * Rule to ensure tags are properly closed.
 */
export declare class ParserRule extends Rule {
    private parseState;
    init(parser: SAXParser, parseState: ParseState): void;
    finalise(): RuleError[];
}
