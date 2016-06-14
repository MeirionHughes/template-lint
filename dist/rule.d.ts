import { SAXParser } from 'parse5';
import { ParseState } from './parse-state';
import { Issue } from './issue';
/**
* Abstract Lint Rule
*/
export declare abstract class Rule {
    private issues;
    constructor();
    /**
    * Initialise the Rule and hook into the parser.
    */
    abstract init(parser: SAXParser, parseState: ParseState): any;
    /**
    * Called by the parser to gather any reported issues
    * (if you override this, ensure you `return super.finalise()`)
    */
    finalise(): Issue[];
    /**
    * Save and issue that will be returned from the linter
    */
    protected reportIssue(issue: Issue): void;
}
