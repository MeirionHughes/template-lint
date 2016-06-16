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
        parseState.initPreRules(parser);
        let rules = this.rules;
        rules.forEach((rule) => {
            rule.init(parser, parseState);
        });
        parseState.initPostRules(parser);
        var work;
        if (typeof (html) === 'string') {
            var stream = new stream_1.Readable();
            stream.push(html);
            stream.push(null);
            work = stream.pipe(parser);
        }
        else if (html.pipe !== undefined) {
            work = html.pipe(parser);
        }
        else {
            throw new Error("html isn't pipeable");
        }
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
