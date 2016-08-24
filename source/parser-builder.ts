import { Parser } from './parser';
import { ParserState } from './parser-state';

export class ParserBuilder {
  private voids: string[] = ['area', 'base', 'br', 'col', 'embed', 'hr',
    'img', 'input', 'keygen', 'link', 'meta',
    'param', 'source', 'track', 'wbr'];
  private scopes: string[] = ['html', 'body', 'template', 'svg', 'math'];

  withVoids(voids: string[]): ParserBuilder {
    this.voids = voids;
    return this;
  }

  withScopes(scopes: string[]): ParserBuilder {
    this.scopes = scopes;
    return this;
  }

  build(): Parser {
    return new Parser(new ParserState(this.scopes, this.voids));
  }
}
