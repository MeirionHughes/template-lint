"use strict";

import {SAXParser} from 'parse5';
import {Rule} from '../rule';
import {ParseState} from '../parse-state';
import {Issue, IssueSeverity} from '../issue';

/**
 * Rule to ensure tags are properly closed. 
 */
export class ObsoleteTagRule extends Rule {
    private parseState: ParseState;

    obsoletes: Array<{ tag: string, msg?: string }>

    constructor(obsolete?: Array<{ tag: string, msg?: string }>) {
        super();

        this.obsoletes = obsolete ? obsolete : []
    }

    init(parser: SAXParser, parseState: ParseState) {
        super.init(parser, parseState);


        parser.on("startTag", (tag, attrs, selfClosing, loc) => {

            var result = this.obsoletes.find(x => x.tag == tag);

            if (result) {
                let issue = new Issue({
                    message: `<${tag}> is obsolete`,
                    severity: IssueSeverity.Error,
                    line: loc.line,
                    column: loc.col,
                });
                this.reportIssue(issue);
            }
        });
    }
}