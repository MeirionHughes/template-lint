import { SAXParser } from 'parse5';
import { ParseState } from './parse-state';
import { Issue } from './issue';
/**
* Abstract Lint Rule
*/
export declare abstract class Rule {
    private issues;
    constructor();
    protected reportIssue(issue: Issue): void;
    init(parser: SAXParser, parseState: ParseState): void;
    finalise(): Issue[];
}
