"use strict";
const rule_1 = require('../rule');
const issue_1 = require('../issue');
/**
 * Rule to ensure attribute values match a pattern
 */
class AttributeValueRule extends rule_1.Rule {
    constructor(patterns) {
        super();
        this.patterns = patterns ? patterns : [];
    }
    init(parser, parseState) {
        parser.on("startTag", (tag, attrs, selfClosing, loc) => {
            attrs.forEach(attr => {
                var pattern = this.patterns.find(x => {
                    var matches = attr.name.match(x.attr);
                    return matches != null;
                });
                if (pattern) {
                    if (pattern.is != null) {
                        var matches = attr.value.match(pattern.is);
                        if (matches == null || matches[0] != attr.value) {
                            let issue = new issue_1.Issue({
                                message: pattern.msg || `attribute value doesn't match expected pattern`,
                                severity: issue_1.IssueSeverity.Error,
                                line: loc.line,
                                column: loc.col,
                            });
                            this.reportIssue(issue);
                        }
                    }
                    else if (pattern.not != null) {
                        var matches = attr.value.match(pattern.not);
                        if (matches != null) {
                            let issue = new issue_1.Issue({
                                message: pattern.msg || `attribute value matched a disallowed pattern`,
                                severity: issue_1.IssueSeverity.Error,
                                line: loc.line,
                                column: loc.col
                            });
                            this.reportIssue(issue);
                        }
                    }
                    else {
                        if (attr.value != "") {
                            let issue = new issue_1.Issue({
                                message: pattern.msg || `attribute should not have a value`,
                                severity: issue_1.IssueSeverity.Error,
                                line: loc.line,
                                column: loc.col
                            });
                            this.reportIssue(issue);
                        }
                    }
                }
            });
        });
    }
}
exports.AttributeValueRule = AttributeValueRule;

//# sourceMappingURL=attribute-value.js.map
