"use strict";
const parse5_1 = require('parse5');
const stream_1 = require('stream');
const parse_state_1 = require('./parse-state');
class Linter {
    constructor(rules, scopes, voids) {
        if (!rules)
            rules = [];
        this.rules = rules;
        this.scopes = scopes;
        this.voids = voids;
    }
    lint(html) {
        var parser = new parse5_1.SAXParser({ locationInfo: true });
        var parseState = new parse_state_1.ParseState(this.scopes, this.voids);
        var stream = new stream_1.Readable();
        parseState.initPreRules(parser);
        let rules = this.rules;
        rules.forEach((rule) => {
            rule.init(parser, parseState);
        });
        parseState.initPostRules(parser);
        stream.push(html);
        stream.push(null);
        var work = stream.pipe(parser);
        var completed = new Promise(function (resolve, reject) {
            work.on("end", () => {
                parseState.finalise();
                resolve();
            });
        });
        var ruleTasks = [];
        rules.forEach((rule) => {
            let task = completed.then(() => {
                return rule.finalise();
            });
            ruleTasks.push(task);
        });
        return Promise.all(ruleTasks).then(results => {
            var all = new Array();
            results.forEach(parts => {
                all = all.concat(parts);
            });
            return all;
        });
    }
}
exports.Linter = Linter;

//# sourceMappingURL=linter.js.map
