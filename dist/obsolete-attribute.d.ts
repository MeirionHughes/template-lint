import { SAXParser } from 'parse5';
import { Rule } from './rule';
import { ParseState } from './parse-state';
/**
 * Rule to ensure tags are properly closed.
 */
export declare class ObsoleteAttributeRule extends Rule {
    private parseState;
    private obsolete;
    constructor(obsolete?: Array<{
        tag: string;
        name: string;
    }>);
    init(parser: SAXParser, parseState: ParseState): void;
}
