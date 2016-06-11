"use strict";
/**
* An error object
*/
class RuleError {
    constructor(message, line, column, detail) {
        this.message = message;
        this.line = line;
        this.column = column;
        this.detail = detail;
    }
}
exports.RuleError = RuleError;

//# sourceMappingURL=rule-error.js.map
