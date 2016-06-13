"use strict";
const issue_severity_1 = require('./issue-severity');
var issue_severity_2 = require('./issue-severity');
exports.IssueSeverity = issue_severity_2.IssueSeverity;
/**
* Provide information relating to Report object
*/
class Issue {
    constructor(opts) {
        this.severity = issue_severity_1.IssueSeverity.Error;
        Object.assign(this, opts);
    }
}
exports.Issue = Issue;

//# sourceMappingURL=issue.js.map
