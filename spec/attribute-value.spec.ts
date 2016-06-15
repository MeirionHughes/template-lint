import {Linter} from '../source/linter';
import {AttributeValueRule} from '../source/rules/attribute-value';

describe("UniqueId Rule", () => {

    var linter: Linter = new Linter([
        new AttributeValueRule([
            {attr:"empty", exp:/$^/},
            {attr:"foo", exp:/jimmy/}
            ])
    ]);

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
});