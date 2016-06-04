"use strict";

import {SAXParser} from 'parse5';
import {Rule} from './rule';
import {ParseState} from './parse-state';
import {RuleError} from './rule-error';

/**
 * Rule to ensure tags are properly closed. 
 */
export class ObsoleteAttributeRule extends Rule {
    private parseState: ParseState;

    private obsolete: Array<{ tag: string, name: string }>

    constructor(obsolete?: Array<{ tag: string, name: string }>) {
        super();
        
        this.obsolete = [];

        obsolete.forEach(x => {
            if (x['name'] != undefined) {
                this.obsolete.push({
                    name: x.name,
                    tag: x.tag || ""
                });
            }
        })
    }

    init(parser: SAXParser, parseState: ParseState) {
        super.init(parser, parseState);

        var obsolete = this.obsolete;

        parser.on("startTag", (tag, attrs, selfClosing, loc) => {

            attrs.forEach(attr => {

                var obsoleteIndex = obsolete.findIndex((x) => x.name == attr.name);

                if (obsoleteIndex >= 0) {
                    var entry = obsolete[obsoleteIndex];

                    if (entry.tag == null || entry.tag == "" || entry.tag == tag) {
                        let str = `${entry.name} attribute is obsolete`;
                        let error = new RuleError(str, loc.line, loc.col);
                        this.reportError(error);
                    }
                }
            });
        });
    }
}