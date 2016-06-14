"use strict";
const rule_1 = require('../rule');
const issue_1 = require('../issue');
class UniqueIdRule extends rule_1.Rule {
    init(parser, parseState) {
        this.ids = [];
        parser.on('startTag', (name, attrs, selfClosing, loc) => {
            let idAttr = attrs.find(x => x.name == "id");
            if (!idAttr)
                return;
            var id = idAttr.value;
            if (id === "") {
                let issue = new issue_1.Issue({
                    message: "id cannot be empty",
                    severity: issue_1.IssueSeverity.Warning,
                    line: loc.line,
                    column: loc.col
                });
                this.reportIssue(issue);
            }
            else if (id.match(/^[^a-z]+|[^\w:.-]+/) != null) {
                let issue = new issue_1.Issue({
                    message: "id contains illegal characters",
                    severity: issue_1.IssueSeverity.Error,
                    line: loc.line,
                    column: loc.col
                });
                this.reportIssue(issue);
            }
            else if (this.ids.indexOf(id) != -1) {
                let issue = new issue_1.Issue({
                    message: `duplicated id: ${id}`,
                    severity: issue_1.IssueSeverity.Error,
                    line: loc.line,
                    column: loc.col
                });
                this.reportIssue(issue);
            }
            this.ids.push(id);
        });
    }
}
exports.UniqueIdRule = UniqueIdRule;

//# sourceMappingURL=unique-id.js.map
