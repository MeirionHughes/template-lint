import {Parser} from './parser';
import {Issue} from './issue';

/**
* Abstract Lint Rule 
*/
export abstract class Rule {
    private issues: Issue[];

    constructor() {
        this.issues = [];
    }

    /**
    * Initialise the Rule and hook into the parser. 
    */
    public abstract init(parser: Parser);


    /**
    * Called by the parser to gather any reported issues
    * (if you override this, ensure you `return super.finalise()`)
    */
    public finalise(): Issue[] {
        let issues = this.issues;
        this.issues = [];
        return issues;
    }

    /**
    * Save and issue that will be returned from the linter
    */
    protected reportIssue(issue: Issue) {
        if (issue) {
            this.issues.push(issue);
        }
    }
}