"use strict";

import {SAXParser} from 'parse5';
import {Rule} from '../rule';
import {ParseState} from '../parse-state';
import {Issue, IssueSeverity} from '../issue';

/**
 * Rule to ensure non-void elements do not self-close
 */
export class SelfCloseRule extends Rule {
    init(parser: SAXParser, parseState: ParseState) {
        super.init(parser, parseState);

        var self = this;

        parser.on('startTag', (name, attrs, selfClosing, loc) => {

            let scope = parseState.scope;

            if (scope == 'svg' || scope == 'math') {
                return;
            }

            if (selfClosing && parseState.isVoid(name) == false) {

                let issue = new Issue({
                    message: "self-closing element",
                    severity: IssueSeverity.Error,
                    line: loc.line,
                    column: loc.col
                });
                this.reportIssue(issue);
            }
        });
    }
}