"use strict";
const rule_1 = require('../rule');
const issue_1 = require('../issue');
/**
 * Rule to ensure tags are properly closed.
 */
class ObsoleteTagRule extends rule_1.Rule {
    constructor(obsolete) {
        super();
        this.obsoletes = obsolete ? obsolete : [];
    }
    init(parser, parseState) {
        parser.on("startTag", (tag, attrs, selfClosing, loc) => {
            if (this.obsoletes.find(x => x.tag == tag)) {
                let issue = new issue_1.Issue({
                    message: `<${tag}> is obsolete`,
                    severity: issue_1.IssueSeverity.Error,
                    line: loc.line,
                    column: loc.col,
                });
                this.reportIssue(issue);
            }
        });
    }
}
exports.ObsoleteTagRule = ObsoleteTagRule;

//# sourceMappingURL=obsolete-tag.js.map
