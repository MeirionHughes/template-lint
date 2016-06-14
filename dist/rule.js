"use strict";
/**
* Abstract Lint Rule
*/
class Rule {
    constructor() {
        this.issues = [];
    }
    /**
    * Called by the parser to gather any reported issues
    * (if you override this, ensure you `return super.finalise()`)
    */
    finalise() {
        let issues = this.issues;
        this.issues = [];
        return issues;
    }
    /**
    * Save and issue that will be returned from the linter
    */
    reportIssue(issue) {
        if (issue) {
            this.issues.push(issue);
        }
    }
}
exports.Rule = Rule;

//# sourceMappingURL=rule.js.map
