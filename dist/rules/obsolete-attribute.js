"use strict";
const rule_1 = require('../rule');
const issue_1 = require('../issue');
/**
 * Rule to ensure tags are properly closed.
 */
class ObsoleteAttributeRule extends rule_1.Rule {
    constructor(obsolete) {
        super();
        this.obsoletes = obsolete;
    }
    init(parser, parseState) {
        parser.on("startTag", (tag, attrs, selfClosing, loc) => {
            attrs.forEach(attr => {
                var obsoleteIndex = this.obsoletes.findIndex((x) => x.attr == attr.name);
                if (obsoleteIndex >= 0) {
                    var entry = this.obsoletes[obsoleteIndex];
                    if (entry.tag == null || entry.tag == "" || entry.tag == tag) {
                        let issue = new issue_1.Issue({
                            message: `${entry.attr} attribute is obsolete`,
                            severity: issue_1.IssueSeverity.Error,
                            line: loc.line,
                            column: loc.col,
                            detail: entry.msg,
                        });
                        this.reportIssue(issue);
                    }
                }
            });
        });
    }
}
exports.ObsoleteAttributeRule = ObsoleteAttributeRule;

//# sourceMappingURL=obsolete-attribute.js.map
