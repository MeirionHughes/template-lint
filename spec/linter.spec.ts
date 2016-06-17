import {Linter} from '../source/linter';
import {SelfCloseRule} from '../source/index';
import {Issue} from '../source/issue';

import {Readable} from 'stream';

describe("Linter", () => {
  it("should not throw error when given a string", () => {
    var linter: Linter = new Linter([
      new SelfCloseRule(),
    ]);

    var html = "<template/>"

    var result: Issue[]

    expect(() => linter.lint(html).then((x) => result = x)).not.toThrow();
  });

  it("should not throw error when given a stream", async (done) => {
    var linter: Linter = new Linter([
      new SelfCloseRule(),
    ]);

    var html = new Readable();

    html.push("<template/>");
    html.push(null);

    var result: Issue[];
    var error: Error;

    try {
      result = await linter.lint(html);
    }
    catch (err) {
      error = err;
    }
    
    expect(error).toBeUndefined();
    expect(result).toBeDefined();
    expect(result.length).toBe(1);

    done();
  });
});