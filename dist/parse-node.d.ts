import { StartTagLocationInfo } from 'parse5';
/**
 *  Node in traversal stack
 */
export declare class ParseNode {
    scope: string;
    name: string;
    location: StartTagLocationInfo;
    constructor(scope: string, name: string, location: StartTagLocationInfo);
}
