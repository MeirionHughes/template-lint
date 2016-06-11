"use strict";
const rule_1 = require('./rule');
const rule_error_1 = require('./rule-error');
/**
 * Rule to ensure tags are properly closed.
 */
class ObsoleteTagRule extends rule_1.Rule {
    constructor(obsolete) {
        super();
        this.obsoletes = obsolete ? obsolete : [];
    }
    init(parser, parseState) {
        super.init(parser, parseState);
        parser.on("startTag", (tag, attrs, selfClosing, loc) => {
            var result = this.obsoletes.find(x => x.tag == tag);
            if (result) {
                let str = `<${tag}> is obsolete`;
                let error = new rule_error_1.RuleError(str, loc.line, loc.col, result.msg);
                this.reportError(error);
            }
        });
    }
}
exports.ObsoleteTagRule = ObsoleteTagRule;

//# sourceMappingURL=obsolete-tag.js.map
