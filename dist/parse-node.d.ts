import { StartTagLocationInfo } from 'parse5';
import { Attribute } from 'parse5';
/**
 *  Node in traversal stack
 */
export declare class ParseNode {
    scope: string;
    name: string;
    attrs: Attribute[];
    location: StartTagLocationInfo;
    constructor(scope: string, name: string, attrs: Attribute[], location: StartTagLocationInfo);
}
