"use strict";

import {SAXParser} from 'parse5';
import {Rule} from './rule';
import {ParseState} from './parse-state';
import {RuleError} from './rule-error';

/**
 * Rule to ensure tags are properly closed. 
 */
export class ObsoleteTagRule extends Rule {
    private parseState: ParseState;
    
    obsolete:Array<string>
    
    constructor(obsolete?:Array<string>)
    {                
        super();                     
        this.obsolete = obsolete?obsolete:[]     
    }

    init(parser: SAXParser, parseState: ParseState) {
        super.init(parser, parseState);
        
        var obsolete = this.obsolete;
        
        parser.on("startTag", (name, attrs, selfClosing, loc)=>{                     
            if(obsolete.indexOf(name) != -1 )
            {
                let str = "<"+name+"> is obsolete";
                let error = new RuleError(str, loc.line, loc.col);
                this.reportError(error);
            }
        });
    }
}