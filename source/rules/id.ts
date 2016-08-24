"use strict";

import { Rule } from '../rule';
import { Parser } from '../parser';
import { Issue, IssueSeverity } from '../issue';

export class IdRule extends Rule {
  private ids: string[];

  constructor(
    public allowEmptyId: boolean = false,
    public allowDuplicateId: boolean = false,
    public allowIllegalChars: boolean = false,
    public ignoreAny: RegExp = null) {
    super();
  }

  init(parser: Parser) {

    this.ids = [];

    parser.on('startTag', (name, attrs, selfClosing, loc) => {

      let idAttr = attrs.find(x => x.name == "id");

      if (!idAttr)
        return;

      var id = idAttr.value;
      var illegals = id.match(/^[^a-z]+|[^\w:.-]+/) != null;

      if (!this.allowEmptyId && id === "") {
        let issue = new Issue({
          message: "id cannot be empty",
          severity: IssueSeverity.Warning,
          line: loc.line,
          column: loc.col,
          start: loc.startOffset,
          end: loc.endOffset
        });
        this.reportIssue(issue);
      } else if (this.ignoreAny != null && id.match(this.ignoreAny) != null) {
        return;
      }
      else if (!this.allowIllegalChars && illegals) {
        let issue = new Issue({
          message: `illegal characters detected in id: ${id}`,
          severity: IssueSeverity.Error,
          line: loc.line,
          column: loc.col,
          start: loc.startOffset,
          end: loc.endOffset
        });
        this.reportIssue(issue);
      }
      else if (!this.allowDuplicateId && this.ids.indexOf(id) != -1) {
        let issue = new Issue({
          message: `duplicated id: ${id}`,
          severity: IssueSeverity.Error,
          line: loc.line,
          column: loc.col,
          start: loc.startOffset,
          end: loc.endOffset
        });
        this.reportIssue(issue);
      }
      this.ids.push(id);
    });
  }
}
