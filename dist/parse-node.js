"use strict";
/**
 *  Node in traversal stack
 */
class ParseNode {
    constructor(scope, name, attrs, location) {
        this.scope = scope;
        this.name = name;
        this.attrs = attrs;
        this.location = location;
    }
}
exports.ParseNode = ParseNode;

//# sourceMappingURL=parse-node.js.map
