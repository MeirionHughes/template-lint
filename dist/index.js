"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./linter'));
__export(require('./parse-state'));
__export(require('./parse-node'));
__export(require('./rule'));
__export(require('./issue'));
__export(require('./rules/self-close'));
__export(require('./rules/parser'));
__export(require('./rules/obsolete-tag'));
__export(require('./rules/obsolete-attribute'));
__export(require('./rules/unique-id'));
__export(require('./rules/attribute-value'));
"use strict";
const self_close_2 = require('./rules/self-close');
const parser_2 = require('./rules/parser');
const unique_id_2 = require('./rules/unique-id');
exports.DefaultRules = [
    new self_close_2.SelfCloseRule(),
    new parser_2.ParserRule(),
    new unique_id_2.UniqueIdRule()
];

//# sourceMappingURL=index.js.map
