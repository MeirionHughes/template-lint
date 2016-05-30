"use strict";
const rule_1 = require('../rule');
const rule_error_1 = require('../rule-error');
/**
 * Rule to ensure non-void elements do not self-close
 */
class SelfCloseRule extends rule_1.Rule {
    init(parser, parseState) {
        super.init(parser, parseState);
        const voidTags = [
            'area', 'base', 'br', 'col', 'embed', 'hr',
            'img', 'input', 'keygen', 'link', 'meta',
            'param', 'source', 'track', 'wbr'];
        var self = this;
        parser.on('startTag', (name, attrs, selfClosing, location) => {
            let scope = parseState.scope;
            if (scope == 'svg' || scope == 'math') {
                return;
            }
            if (selfClosing && voidTags.indexOf(name) < 0) {
                self.reportError(new rule_error_1.RuleError("self-closing element", location.line, location.col));
            }
        });
    }
}
exports.SelfCloseRule = SelfCloseRule;

//# sourceMappingURL=self-close.js.map
