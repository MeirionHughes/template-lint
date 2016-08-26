"use strict";

import { Readable, Stream } from 'stream';
import { Rule } from './rule';

import { Parser } from './parser';
import { ParserState } from './parser-state';
import { ParserBuilder } from './parser-builder';
import { Issue } from './issue';

import { ASTGenerator } from './ast';

export class Linter {

  private rules: Array<Rule>;
  private parserBuilder: ParserBuilder;
  private astGenerator: ASTGenerator;


  constructor(rules: Rule[], parserBuilder?: ParserBuilder, astGenerator?: ASTGenerator) {
    this.rules = rules || [];
    this.parserBuilder = parserBuilder || new ParserBuilder();
    this.astGenerator = astGenerator || new ASTGenerator();
  }

  lint(html: string | Stream, path?: string): Promise<Issue[]> {
    var parser = this.parserBuilder.build();
    parser.init(this.rules, path);

    if (typeof (html) === 'string') {
      var stream: Readable = new Readable();
      stream.push(html);
      stream.push(null);
      stream.pipe(parser);
    } else if (this.isStream(html)) {
      html.pipe(parser);
    }
    else {
      throw new Error("html isn't pipeable");
    }

    var completed = new Promise<void>(function (resolve, reject) {
      parser.on("end", () => {
        parser.finalise();
        resolve();
      });
    });

    var ruleTasks = [];

    this.rules.forEach((rule) => {
      let task = completed.then(() => {
        return rule.finalise(this.astGenerator.root);
      });
      ruleTasks.push(task);
    });

    return Promise.all(ruleTasks).then(results => {

      var all = new Array<Issue>();

      results.forEach(parts => {
        all = all.concat(parts);
      });

      all = all.sort((a, b) => (a.line - b.line) * 1000 + (a.column - b.column));

      return all;
    });
  }

  private isStream(input): input is Stream {
    return input.pipe && typeof (input.pipe) === "function";
  }
}
