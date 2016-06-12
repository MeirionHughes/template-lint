"use strict";
const rule_1 = require('../rule');
const rule_error_1 = require('../rule-error');
/**
 * Rule to ensure tags are properly closed.
 */
class ObsoleteAttributeRule extends rule_1.Rule {
    constructor(obsolete) {
        super();
        this.obsoletes = obsolete;
    }
    init(parser, parseState) {
        super.init(parser, parseState);
        parser.on("startTag", (tag, attrs, selfClosing, loc) => {
            attrs.forEach(attr => {
                var obsoleteIndex = this.obsoletes.findIndex((x) => x.attr == attr.name);
                if (obsoleteIndex >= 0) {
                    var entry = this.obsoletes[obsoleteIndex];
                    if (entry.tag == null || entry.tag == "" || entry.tag == tag) {
                        let str = `${entry.attr} attribute is obsolete`;
                        let error = new rule_error_1.RuleError(str, loc.line, loc.col, entry.msg);
                        this.reportError(error);
                    }
                }
            });
        });
    }
}
exports.ObsoleteAttributeRule = ObsoleteAttributeRule;

//# sourceMappingURL=obsolete-attribute.js.map
