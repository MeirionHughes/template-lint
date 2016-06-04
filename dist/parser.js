"use strict";
const rule_1 = require('./rule');
/**
 * Rule to ensure tags are properly closed.
 */
class ParserRule extends rule_1.Rule {
    init(parser, parseState) {
        super.init(parser, parseState);
        this.parseState = parseState;
    }
    finalise() {
        return this.parseState.errors;
    }
}
exports.ParserRule = ParserRule;

//# sourceMappingURL=parser.js.map
