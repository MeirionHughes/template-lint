"use strict";
/**
* Abstract Lint Rule
*/
class Rule {
    constructor() {
        this.errors = [];
    }
    reportError(error) {
        if (error) {
            this.errors.push(error);
        }
    }
    init(parser, parseState) {
    }
    finalise() {
        let errors = this.errors;
        this.errors = [];
        return errors;
    }
}
exports.Rule = Rule;

//# sourceMappingURL=rule.js.map
