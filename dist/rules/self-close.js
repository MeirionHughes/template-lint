"use strict";
const rule_1 = require('../rule');
const issue_1 = require('../issue');
/**
 * Rule to ensure non-void elements do not self-close
 */
class SelfCloseRule extends rule_1.Rule {
    init(parser, parseState) {
        super.init(parser, parseState);
        var self = this;
        parser.on('startTag', (name, attrs, selfClosing, loc) => {
            let scope = parseState.scope;
            if (scope == 'svg' || scope == 'math') {
                return;
            }
            if (selfClosing && parseState.isVoid(name) == false) {
                let issue = new issue_1.Issue({
                    message: "self-closing element",
                    severity: issue_1.IssueSeverity.Error,
                    line: loc.line,
                    column: loc.col
                });
                this.reportIssue(issue);
            }
        });
    }
}
exports.SelfCloseRule = SelfCloseRule;

//# sourceMappingURL=self-close.js.map
