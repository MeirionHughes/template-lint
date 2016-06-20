import {StartTagLocationInfo} from 'parse5';
import {Attribute} from 'parse5';

/**
 *  Node in traversal stack
 */
export class ParserNode {
    public data:any;
    constructor(
    public scope: string, 
    public name: string, 
    public attrs:Attribute[],
    public isVoid:boolean,
    public location: StartTagLocationInfo) {
        this.data = {};
    }
}