import { Rule } from './rule';
import { ParserBuilder } from './parser-builder';
import { Linter } from './linter';

export class LinterBuilder {
  private rules: Rule[];
  constructor(private parserBuilder: ParserBuilder) {
  }
  withRule(rule: Rule): LinterBuilder {
    this.rules.push(rule);
    return this;
  }
  withRules(rules: Rule[]): LinterBuilder {
    this.rules.concat(rules);
    return this;
  }
  build(): Linter {
    var result = new Linter(this.rules, this.parserBuilder);
    this.reset();
    return result;
  }
  reset() {
    this.rules = [];
  }
}
