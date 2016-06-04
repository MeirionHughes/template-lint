"use strict";
const rule_1 = require('./rule');
const rule_error_1 = require('./rule-error');
/**
 * Rule to ensure tags are properly closed.
 */
class ObsoleteTagRule extends rule_1.Rule {
    constructor(obsolete) {
        super();
        this.obsolete = obsolete ? obsolete : [];
    }
    init(parser, parseState) {
        super.init(parser, parseState);
        var obsolete = this.obsolete;
        parser.on("startTag", (name, attrs, selfClosing, loc) => {
            if (obsolete.indexOf(name) != -1) {
                let str = "<" + name + "> is obsolete";
                let error = new rule_error_1.RuleError(str, loc.line, loc.col);
                this.reportError(error);
            }
        });
    }
}
exports.ObsoleteTagRule = ObsoleteTagRule;

//# sourceMappingURL=obsolete-tag.js.map
