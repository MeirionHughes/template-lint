import {SAXParser} from 'parse5';
import {ParseState} from './parse-state';
import {RuleError} from './rule-error';

/**
* Abstract Lint Rule 
*/
export abstract class Rule {
    private errors: RuleError[];
    
    constructor()
    {
        this.errors = [];
    }
        
    protected reportError(error: RuleError) {
        if (error){
            this.errors.push(error);
        }
    }
    
    init(parser: SAXParser, parseState: ParseState) {
    }

    finalise(): RuleError[] {
        let errors = this.errors;
        this.errors = [];
        return errors;        
    }
}