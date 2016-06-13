"use strict";

import {SAXParser} from 'parse5';
import {Rule} from '../rule';
import {ParseState} from '../parse-state';
import {Issue, IssueSeverity} from '../issue'

export class UniqueIdRule extends Rule {

    private ids:string[];

    init(parser: SAXParser, parseState: ParseState) {
        super.init(parser, parseState);
        
        this.ids = [];

        parser.on('startTag', (name, attrs, selfClosing, loc) => {

            let idAttr = attrs.find(x => x.name == "id");

            if (!idAttr) 
                return;

            var id = idAttr.value;

            if (id === "") {
                let issue = new Issue({
                    message: "id cannot be empty",
                    severity: IssueSeverity.Warning,
                    line: loc.line,
                    column: loc.col
                });
                this.reportIssue(issue);
            }
            else if (id.match(/^[^a-z]+|[^\w:.-]+/) != null){
                let issue = new Issue({
                    message: "id contains illegal characters",
                    severity: IssueSeverity.Error,
                    line: loc.line,
                    column: loc.col
                });
                this.reportIssue(issue);
            }
            else if (this.ids.indexOf(id) != -1) {
                let issue = new Issue({
                    message: `duplicated id: ${id}`,
                    severity: IssueSeverity.Error,
                    line: loc.line,
                    column: loc.col
                });
                this.reportIssue(issue);
            }

            this.ids.push(id);
        });
    }

    finalise(): Issue[] {
        this.ids = [];
        return super.finalise();
    }
}