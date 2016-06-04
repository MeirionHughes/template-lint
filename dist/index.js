"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./linter'));
__export(require('./parse-state'));
__export(require('./parse-node'));
__export(require('./rule'));
__export(require('./rule-error'));
__export(require('./self-close'));
__export(require('./parser'));
__export(require('./obsolete-tag'));
"use strict";
const index_1 = require('./index');
const index_2 = require('./index');
exports.DefaultRules = [
    new index_1.SelfCloseRule(),
    new index_2.ParserRule()
];

//# sourceMappingURL=index.js.map
