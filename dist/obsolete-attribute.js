"use strict";
const rule_1 = require('./rule');
const rule_error_1 = require('./rule-error');
/**
 * Rule to ensure tags are properly closed.
 */
class ObsoleteAttributeRule extends rule_1.Rule {
    constructor(obsolete) {
        super();
        this.obsolete = [];
        obsolete.forEach(x => {
            if (x['name'] != undefined) {
                this.obsolete.push({
                    name: x.name,
                    tag: x.tag || ""
                });
            }
        });
    }
    init(parser, parseState) {
        super.init(parser, parseState);
        var obsolete = this.obsolete;
        parser.on("startTag", (tag, attrs, selfClosing, loc) => {
            attrs.forEach(attr => {
                var obsoleteIndex = obsolete.findIndex((x) => x.name == attr.name);
                if (obsoleteIndex >= 0) {
                    var entry = obsolete[obsoleteIndex];
                    if (entry.tag == null || entry.tag == "" || entry.tag == tag) {
                        let str = `${entry.name} attribute is obsolete`;
                        let error = new rule_error_1.RuleError(str, loc.line, loc.col);
                        this.reportError(error);
                    }
                }
            });
        });
    }
}
exports.ObsoleteAttributeRule = ObsoleteAttributeRule;

//# sourceMappingURL=obsolete-attribute.js.map
