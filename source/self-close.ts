"use strict";

import {SAXParser} from 'parse5';
import {Rule} from './rule';
import {ParseState} from './parse-state';
import {RuleError} from './rule-error';

/**
 * Rule to ensure non-void elements do not self-close
 */
export class SelfCloseRule extends Rule {
    init(parser: SAXParser, parseState: ParseState) {
        super.init(parser, parseState);

        const voidTags = [
            'area', 'base', 'br', 'col', 'embed', 'hr',
            'img', 'input', 'keygen', 'link', 'meta',
            'param', 'source', 'track', 'wbr'];

        var self = this;

        parser.on('startTag', (name, attrs, selfClosing, location) => {
           
            let scope = parseState.scope;

            if (scope == 'svg' || scope == 'math') {
                return;
            }

            if (selfClosing && voidTags.indexOf(name) < 0) {
                self.reportError(new RuleError("self-closing element", location.line, location.col))
            }
        });
    }
}