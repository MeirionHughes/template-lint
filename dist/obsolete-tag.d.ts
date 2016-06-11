import { SAXParser } from 'parse5';
import { Rule } from './rule';
import { ParseState } from './parse-state';
/**
 * Rule to ensure tags are properly closed.
 */
export declare class ObsoleteTagRule extends Rule {
    private parseState;
    obsoletes: Array<{
        tag: string;
        msg?: string;
    }>;
    constructor(obsolete?: Array<{
        tag: string;
        msg?: string;
    }>);
    init(parser: SAXParser, parseState: ParseState): void;
}
