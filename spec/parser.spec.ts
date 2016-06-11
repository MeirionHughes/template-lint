import {Linter} from '../source/linter';
import {ParserRule} from '../source/index';

describe("Parser Rule", () => {

  var linter: Linter = new Linter([
    new ParserRule(),
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