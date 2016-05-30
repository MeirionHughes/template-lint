import {StartTagLocationInfo} from 'parse5';

/**
 *  Node in traversal stack
 */
export class ParseNode {
    constructor(public scope: string, public name: string, public location: StartTagLocationInfo) {
    }
}