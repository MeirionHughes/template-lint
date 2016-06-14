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
        parser.on("startTag", (tag, attrs, selfClosing, loc) => {            
            if (this.obsoletes.find(x => x.tag == tag)) {
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