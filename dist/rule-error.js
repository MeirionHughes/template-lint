"use strict";
/**
* An error object
*/
class RuleError {
    constructor(message, line, column) {
        this.message = message;
        this.line = line;
        this.column = column;
    }
}
exports.RuleError = RuleError;

//# sourceMappingURL=rule-error.js.map
