import { Linter } from '../source/linter';
import { IdRule } from '../source/rules/id';

describe("UniqueId Rule", () => {

  var linter: Linter = new Linter([
    new IdRule()
  ]);

  it("will reject an empty id", (done) => {
    linter.lint('<template id=""><svg></svg></template>')
      .then((issues) => {
        expect(issues.length).toBe(1);
        expect(issues[0].message).toBe("id cannot be empty");
        done();
      });
  });

  it("will reject an id with space", (done) => {
    linter.lint('<template id="hello world"><svg></svg></template>')
      .then((issues) => {
        expect(issues.length).toBe(1);
        //expect(issues[0].message).toBe("id contains illegal characters");
        done();
      });
  });

  it("will reject an id with illegal character", (done) => {
    linter.lint('<template id="hello%world"><svg></svg></template>')
      .then((issues) => {
        expect(issues.length).toBe(1);
        //expect(issues[0].message).toBe("id contains illegal characters");
        done();
      });
  });

  it("will reject a duplicated id", (done) => {
    linter.lint('<template id="foo"><svg id="foo"></svg></template>')
      .then((issues) => {
        expect(issues.length).toBe(1);
        //expect(issues[0].message).toBe("duplicated id: foo");
        done();
      });
  });

  it("will pass a legal id", (done) => {
    linter.lint('<template id="foo"></template>')
      .then((issues) => {
        expect(issues.length).toBe(0);
        //expect(issues[0].message).toBe("duplicated id: foo");
        done();
      });
  });

  it("will pass a multiple non-duplicate ids", (done) => {
    linter.lint('<template id="foo"><div id="bar"></div></template>')
      .then((issues) => {
        expect(issues.length).toBe(0);
        //expect(issues[0].message).toBe("duplicated id: foo");
        done();
      });
  });
});
