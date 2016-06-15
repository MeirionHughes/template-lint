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
                var pattern = this.patterns.find(x => x.attr == attr.name);
                if (pattern) {
                    var result = attr.value.match(pattern.exp);
                    var attrLen = attr.value.length;
                    if (result == null ||
                        result.length > 1 ||
                        result[0].length != attrLen) {
                        let issue = new issue_1.Issue({
                            message: `attribute value doesn't match expected pattern`,
                            severity: issue_1.IssueSeverity.Error,
                            line: loc.line,
                            column: loc.col
                        });
                        this.reportIssue(issue);
                    }
                }
            });
        });
    }
}
exports.AttributeValueRule = AttributeValueRule;

//# sourceMappingURL=attribute-value.js.map
