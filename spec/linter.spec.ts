import { Linter } from '../source/linter';
import { SelfCloseRule } from '../source/rules/self-close';
import { StructureRule } from '../source/rules/structure';
import { Issue } from '../source/issue';
import { Readable } from 'stream';

describe("Linter", () => {
  it("should not throw error when given a string", () => {
    var linter: Linter = new Linter([
      new SelfCloseRule(),
    ]);

    var html = "<template/>";

    var result: Issue[];

    expect(() => linter.lint(html).then((x) => result = x)).not.toThrow();
  });

  it("should not throw error when given a string and file path", () => {
    var linter: Linter = new Linter([
      new SelfCloseRule(),
    ]);

    var html = "<template/>";
    var path = "./some/path.html";

    var result: Issue[];

    expect(() => linter.lint(html, path).then((x) => result = x)).not.toThrow();
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

  it("should return issues sorted by line", async (done) => {
    var linter: Linter = new Linter([
      new SelfCloseRule(),
      new StructureRule()
    ]);

    var html =
      `<template>
       <div/>    
    </templte>`;

    var result: Issue[];

    result = await linter.lint(html);


    expect(result.length).toBe(3);
    expect(result[0].line).toBe(1);
    expect(result[1].line).toBe(2);
    expect(result[2].line).toBe(3);

    done();
  });

  it("should return not throw error on svg namespace", async (done) => {
    var linter: Linter = new Linter([
      new SelfCloseRule(),
      new StructureRule()
    ]);

    var html =
      `<svg if.bind="!userContext.imageUri" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" style="width:20px;height:20px;"> <circle cx="20" cy="20" r="18" stroke="grey" stroke-width="1" fill="#FFFFFF" /> <text x="50%" y="50%" text-anchor="middle" stroke="#51c5cf" stroke-width="2px" dy=".3em" letter-spacing="2"></text> </svg>`;

    var result: Issue[];
    try{

    result = await linter.lint(html);

    expect(result.length).toBe(0);
    }
    catch (err)
    {
      fail(err);
    }finally{
      done();
    }
  });
});
