import { SAXParser } from 'parse5';
import { Rule } from '../rule';
import { ParseState } from '../parse-state';
import { Issue } from '../issue';
export declare class UniqueIdRule extends Rule {
    private ids;
    init(parser: SAXParser, parseState: ParseState): void;
    finalise(): Issue[];
}
