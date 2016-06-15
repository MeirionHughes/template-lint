import {Linter} from '../source/linter';
import {AttributeValueRule} from '../source/rules/attribute-value';

describe("AttributeValue Rule", () => {

    var linter: Linter = new Linter([
        new AttributeValueRule([
            { attr: /empty/ },
            { attr: /foo/, not: /\${(.?)+}/ },
            { attr: /boo/, is: /jane/, msg: "jane!" },
            { attr: /moo/, not: /^james$/ },
            { attr: /name/, is: /^john$/, tag:"my-tag" },
        ])
    ]);

    it("will reject any 'not' match", (done) => {
        linter.lint('<template foo="${person.name}"></template>')
            .then((issues) => {
                expect(issues.length).toBe(1);
                done();
            });
    });

    it("will accept no 'not' match", (done) => {
        linter.lint('<template foo="person.name"></template>')
            .then((issues) => {
                expect(issues.length).toBe(0);
                done();
            });
    });

    it("will reject value not matching 'is' exactly", (done) => {
        linter.lint('<template boo="jane has a gun"></template>')
            .then((issues) => {
                expect(issues.length).toBe(1);
                done();
            });
    });

    it("will pass value matching 'is' exactly", (done) => {
        linter.lint('<template boo="jane"></template>')
            .then((issues) => {
                expect(issues.length).toBe(0);
                done();
            });
    });


    it("will reject non-value attribute when with value", (done) => {
        linter.lint('<template empty="mooo"></template>')
            .then((issues) => {
                expect(issues.length).toBe(1);
                done();
            });
    });

    it("will pass non-value attribute when without value", (done) => {
        linter.lint('<template empty></template>')
            .then((issues) => {
                expect(issues.length).toBe(0);
                done();
            });
    });

    it("will reject failing test when element tag is equals rule tag", (done) => {
        linter.lint('<my-tag name="meh"></template>')
            .then((issues) => {
                expect(issues.length).toBe(1);
                done();
            });
    });

    it("will pass failing test when element tag is not equal to rule tag", (done) => {
        linter.lint('<div name="meh"></template>')
            .then((issues) => {
                expect(issues.length).toBe(0);
                done();
            });
    });
});