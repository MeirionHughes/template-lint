import { SAXParser } from 'parse5';
import { Rule } from '../rule';
import { ParseState } from '../parse-state';
/**
 * Rule to ensure attribute values match a pattern
 */
export declare class AttributeValueRule extends Rule {
    private parseState;
    patterns: Array<{
        attr: RegExp;
        is?: RegExp;
        not?: RegExp;
        msg?: string;
    }>;
    constructor(patterns?: Array<{
        attr: RegExp;
        is?: RegExp;
        not?: RegExp;
        msg?: string;
    }>);
    init(parser: SAXParser, parseState: ParseState): void;
}
