"use strict";

import {SAXParser} from 'parse5';
import {Rule} from './rule';
import {ParseState} from './parse-state';
import {RuleError} from './rule-error';

/**
 * Rule to ensure tags are properly closed. 
 */
export class ParserRule extends Rule {
    private parseState: ParseState;

    init(parser: SAXParser, parseState: ParseState) {
        super.init(parser, parseState);
        this.parseState = parseState;
    }

    finalise(): RuleError[] {
        return this.parseState.errors;
    }
}