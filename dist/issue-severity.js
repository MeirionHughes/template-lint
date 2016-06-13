"use strict";
(function (IssueSeverity) {
    /* information on a better way */
    IssueSeverity[IssueSeverity["Info"] = 0] = "Info";
    /* an issue that may result in odd results */
    IssueSeverity[IssueSeverity["Warning"] = 1] = "Warning";
    /* an issue that will result in missing/broken content */
    IssueSeverity[IssueSeverity["Error"] = 2] = "Error";
    /* an issue that breaks the entire document/template */
    IssueSeverity[IssueSeverity["Fatal"] = 3] = "Fatal";
})(exports.IssueSeverity || (exports.IssueSeverity = {}));
var IssueSeverity = exports.IssueSeverity;

//# sourceMappingURL=issue-severity.js.map
