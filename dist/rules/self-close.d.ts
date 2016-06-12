import { SAXParser } from 'parse5';
import { Rule } from '../rule';
import { ParseState } from '../parse-state';
/**
 * Rule to ensure non-void elements do not self-close
 */
export declare class SelfCloseRule extends Rule {
    init(parser: SAXParser, parseState: ParseState): void;
}
