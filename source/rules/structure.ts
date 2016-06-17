"use strict";

import {Rule} from '../rule';
import {Parser} from '../parser';
import {Issue} from '../issue';

/**
 * Rule to ensure tags are properly closed. 
 */
export class StructureRule extends Rule {
    private parser: Parser;

    init(parser: Parser) {        
        this.parser = parser;
    }    
    finalise(): Issue[] {
        return this.parser.state.issues;
    }
}