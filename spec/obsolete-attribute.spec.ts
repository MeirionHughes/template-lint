import {Linter} from '../source/linter';
import {ObsoleteAttributeRule} from '../source/index';

describe("ObsoleteAttribute Rule", () => {

  var linter: Linter = new Linter([
    new ObsoleteAttributeRule([
      { attr: 'atty', tag: 'my-tag', msg:"use 'foo' instead"},
      { attr: 'atty2', tag: ''  },
      { attr: 'atty3'}
    ]),
  ]);

  it("will reject obsolete attribute", (done) => {
    linter.lint('<moo atty2></moo><moo atty3></moo>')
      .then((errors) => {
        expect(errors.length).toBe(2);
        expect(errors[0].message).toBe("atty2 attribute is obsolete");
        expect(errors[1].message).toBe("atty3 attribute is obsolete");
        done();
      });
  });

  it("will reject obsolete attribute specific to tag", (done) => {
    linter.lint('<my-tag atty></my-tag>')
      .then((errors) => {
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe("atty attribute is obsolete");
        expect(errors[0].detail).toBe("use 'foo' instead");
        done();
      });
  });

  it("will accept obsolete attribute specific to tag when applied to other tag", (done) => {
    linter.lint('<my-tag2 atty></my-tag2>')
      .then((errors) => {
        expect(errors.length).toBe(0);
        done();
      });
  });




  it("will accept normal attribute", (done) => {
    linter.lint('<my-tag moo></my-tag>')
      .then((errors) => {
        expect(errors.length).toBe(0);
        done();
      });
  });

});