"use strict";
/// <reference path="index.ts" />
const linter_1 = require('../dist/linter');
const index_1 = require('../dist/index');
describe("ObsoleteTag Rule", () => {
    var linter = new linter_1.Linter([
        new index_1.ObsoleteTagRule(['my-tag']),
    ]);
    it("will reject obsolete element", (done) => {
        linter.lint('<my-tag></my-tag>')
            .then((errors) => {
            expect(errors.length).toBe(1);
            expect(errors[0].message).toBe("<my-tag> is obsolete");
            done();
        });
    });
    it("will allow non-obsolete element", (done) => {
        linter.lint('<my-tag2></my-tag2>')
            .then((errors) => {
            expect(errors.length).toBe(0);
            done();
        });
    });
});

//# sourceMappingURL=obsolete-tag.spec.js.map
