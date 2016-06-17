import {Linter} from '../source/linter';
import {SelfCloseRule} from '../source/rules/self-close';
    
describe("SelfClose Rule", () => {

  var linter: Linter = new Linter([
    new SelfCloseRule()
  ]);
  
   it("will allow self-close within svg scope", (done) => {
    linter.lint('<template><svg><rect/></svg></template>')
      .then((issues) => {
        expect(issues.length).toBe(0);
        done();
      });
  });
  
  it("will reject self-close on svg", (done) => {
    linter.lint('<template><svg/></template>')
      .then((issues) => {
        expect(issues.length).toBeGreaterThan(0);
        done();
      });
  });
  
  it("will allow self-close within math scope", (done) => {
    linter.lint('<template><math><plus/></math></template>')
      .then((issues) => {
        expect(issues.length).toBe(0);
        done();
      });
  });
  
  it("will reject self-close on math", (done) => {
    linter.lint('<template><math/></template>')
      .then((issues) => {
        expect(issues.length).toBeGreaterThan(0);
        done();
      });
  });

  it("will reject self-closed template", (done) => {
    linter.lint('<template/>')
      .then((issues) => {
        expect(issues.length).toBeGreaterThan(0);
        done();
      });
  });

  it("will reject self-closed non-void", (done) => {
    linter.lint('<template><div/></template>')
      .then((issues) => {
        expect(issues.length).toBeGreaterThan(0);
        done();
      });
  });

  it("will reject self-closed custom-element", (done) => {
    linter.lint('<template><custom-element/></template>')
      .then((issues) => {
        expect(issues.length).toBeGreaterThan(0);
        done();
      });
  });

  it("will allow self-closed void elements", (done) => {

    linter.lint('<template><br/></template>')
      .then((issues) => {
        expect(issues.length).toBe(0);
        done();
      });
  });
});