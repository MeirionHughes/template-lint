"use strict";
/**
* Abstract Lint Rule
*/
class Rule {
    constructor() {
        this.issues = [];
    }
    reportIssue(issue) {
        if (issue) {
            this.issues.push(issue);
        }
    }
    init(parser, parseState) {
    }
    finalise() {
        let issues = this.issues;
        this.issues = [];
        return issues;
    }
}
exports.Rule = Rule;

//# sourceMappingURL=rule.js.map
