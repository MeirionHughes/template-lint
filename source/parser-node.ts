import { StartTagLocationInfo } from 'parse5';
import { ASTAttribute } from 'parse5';

/**
 *  Node in traversal stack
 */
export class ParserNode {
  public data: any;
  constructor(
    public scope: string,
    public name: string,
    public attrs: ASTAttribute[],
    public isVoid: boolean,
    public location: StartTagLocationInfo) {
    this.data = {};
  }
}
