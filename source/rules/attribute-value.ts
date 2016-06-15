"use strict";

import {SAXParser} from 'parse5';
import {Rule} from '../rule';
import {ParseState} from '../parse-state';
import {Issue, IssueSeverity} from '../issue';

/**
 * Rule to ensure attribute values match a pattern
 */
export class AttributeValueRule extends Rule {
    private parseState: ParseState;

    patterns: Array<{ attr: string, exp: RegExp }>

    constructor(patterns?: Array<{ attr: string, exp: RegExp }>) {
        super();

        this.patterns = patterns ? patterns : []
    }

    init(parser: SAXParser, parseState: ParseState) {
        parser.on("startTag", (tag, attrs, selfClosing, loc) => {

            attrs.forEach(attr => {
                var pattern = this.patterns.find(x => x.attr == attr.name);

                if (pattern) {
                    var result = attr.value.match(pattern.exp);
                    var attrLen = attr.value.length;

                    if (result == null ||
                        result.length > 1 ||
                        result[0].length != attrLen) {
                        let issue = new Issue({
                            message: `attribute value doesn't match expected pattern`,
                            severity: IssueSeverity.Error,
                            line: loc.line,
                            column: loc.col
                        });
                        this.reportIssue(issue);

                    }
                }
            });
        });
    }
}