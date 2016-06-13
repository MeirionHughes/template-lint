import {SAXParser} from 'parse5';
import {ParseState} from './parse-state';
import {Issue} from './issue';

/**
* Abstract Lint Rule 
*/
export abstract class Rule {
    private issues: Issue[];

    constructor() {
        this.issues = [];
    }

    protected reportIssue(issue: Issue) {
        if (issue) {
            this.issues.push(issue);
        }
    }

    init(parser: SAXParser, parseState: ParseState) {
    }

    finalise(): Issue[] {
        let issues = this.issues;
        this.issues = [];
        return issues;
    }
}