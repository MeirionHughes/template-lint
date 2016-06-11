import {Linter} from '../source/linter';
import {ObsoleteTagRule} from '../source/index';
    
describe("ObsoleteTag Rule", () => {

  var linter: Linter = new Linter([
    new ObsoleteTagRule([{tag:"my-tag"}]),
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