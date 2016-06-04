"use strict";
const rule_1 = require('./rule');
const rule_error_1 = require('./rule-error');
/**
 * Rule to ensure non-void elements do not self-close
 */
class SelfCloseRule extends rule_1.Rule {
    init(parser, parseState) {
        super.init(parser, parseState);
        var self = this;
        parser.on('startTag', (name, attrs, selfClosing, location) => {
            let scope = parseState.scope;
            if (scope == 'svg' || scope == 'math') {
                return;
            }
            if (selfClosing && parseState.isVoid(name) == false) {
                self.reportError(new rule_error_1.RuleError("self-closing element", location.line, location.col));
            }
        });
    }
}
exports.SelfCloseRule = SelfCloseRule;

//# sourceMappingURL=self-close.js.map
