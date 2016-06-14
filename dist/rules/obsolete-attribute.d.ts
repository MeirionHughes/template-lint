import { SAXParser } from 'parse5';
import { Rule } from '../rule';
import { ParseState } from '../parse-state';
/**
 * Rule to ensure tags are properly closed.
 */
export declare class ObsoleteAttributeRule extends Rule {
    private obsoletes;
    constructor(obsolete?: Array<{
        attr: string;
        tag?: string;
        msg?: string;
    }>);
    init(parser: SAXParser, parseState: ParseState): void;
}
