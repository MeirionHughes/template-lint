"use strict";
/// <reference path="template-lint.ts" />
const template_lint_1 = require('../dist/template-lint');
describe("SelfClose Rule", () => {
    var linter = new template_lint_1.Linter([
        new template_lint_1.SelfCloseRule()
    ]);
    it("will allow self-close within svg scope", (done) => {
        linter.lint('<template><svg><rect/></svg></template>')
            .then((errors) => {
            expect(errors.length).toBe(0);
            done();
        });
    });
    it("will reject self-close on svg", (done) => {
        linter.lint('<template><svg/></template>')
            .then((errors) => {
            expect(errors.length).toBeGreaterThan(0);
            done();
        });
    });
    it("will reject self-closed template", (done) => {
        linter.lint('<template/>')
            .then((errors) => {
            expect(errors.length).toBeGreaterThan(0);
            done();
        });
    });
    it("will reject self-closed non-void", (done) => {
        linter.lint('<template><div/></template>')
            .then((errors) => {
            expect(errors.length).toBeGreaterThan(0);
            done();
        });
    });
    it("will reject self-closed custom-element", (done) => {
        linter.lint('<template><custom-element/></template>')
            .then((errors) => {
            expect(errors.length).toBeGreaterThan(0);
            done();
        });
    });
    it("will allow self-closed void elements", (done) => {
        linter.lint('<template><br/></template>')
            .then((errors) => {
            expect(errors.length).toBe(0);
            done();
        });
    });
});
describe("Parser Rule", () => {
    var linter = new template_lint_1.Linter([
        new template_lint_1.ParserRule(),
    ]);
    it("will reject unclosed element", (done) => {
        linter.lint('<template>')
            .then((errors) => {
            expect(errors.length).toBeGreaterThan(0);
            done();
        });
    });
    it("will reject nested unclosed element", (done) => {
        linter.lint('<template><div></template>')
            .then((errors) => {
            expect(errors.length).toBeGreaterThan(0);
            done();
        });
    });
    it("will reject nested misnamed closing element", (done) => {
        linter.lint('<template><div></dvi></template>')
            .then((errors) => {
            expect(errors.length).toBeGreaterThan(0);
            done();
        });
    });
    it("will reject multiple nested closing element (multiple)", (done) => {
        linter.lint('<template><div><div><div></div></div></template>')
            .then((errors) => {
            expect(errors.length).toBeGreaterThan(0);
            done();
        });
    });
    it("will accept unclosed void elements", (done) => {
        linter.lint('<template><img></template>')
            .then((errors) => {
            expect(errors.length).toBe(0);
            done();
        });
    });
});

//# sourceMappingURL=template-lint.spec.js.map
