import { SAXParser, StartTagLocationInfo } from 'parse5';
import * as parse5 from 'parse5';

import { ParserState } from './parser-state';
import { Rule } from './rule';
import { AST } from './ast';

export class Parser extends SAXParser {
  constructor(public state: ParserState) {
    super({ locationInfo: true });
    this.setMaxListeners(100);
  }

  public isVoid(name: string): boolean {
    return this.state.isVoid(name);
  }

  public isScope(name: string): boolean {
    return this.state.isScope(name);
  }

  public init(rules: Rule[], ast: AST, path: string) {
    this.state.initPreRules(this);

    ast.init(this);

    rules.forEach((rule) => {
      rule.init(this, path);
    });

    this.state.initPostRules(this);
  }

  public finalise() {
    this.state.finalise();
  }
}
