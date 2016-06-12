"use strict";

import {SAXParser} from 'parse5';
import {Rule} from '../rule';
import {ParseState} from '../parse-state';
import {RuleError} from '../rule-error';

/**
 * Rule to ensure tags are properly closed. 
 */
export class ObsoleteAttributeRule extends Rule {
    private parseState: ParseState;

    private obsoletes: Array<{attr: string, tag?: string, msg?:string }>

    constructor(obsolete?: Array<{attr: string, tag?: string, msg?:string }>) {
        super();
        
        this.obsoletes = obsolete;
    }

    init(parser: SAXParser, parseState: ParseState) {
        super.init(parser, parseState);

        parser.on("startTag", (tag, attrs, selfClosing, loc) => {
            attrs.forEach(attr => {

                var obsoleteIndex = this.obsoletes.findIndex((x) => x.attr == attr.name);

                if (obsoleteIndex >= 0) {
                    var entry = this.obsoletes[obsoleteIndex];

                    if (entry.tag == null || entry.tag == "" || entry.tag == tag) {
                        let str = `${entry.attr} attribute is obsolete`;
                        let error = new RuleError(str, loc.line, loc.col, entry.msg);
                        this.reportError(error);
                    }
                }
            });
        });
    }
}