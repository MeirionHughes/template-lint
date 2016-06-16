"use strict";

import {SAXParser, StartTagLocationInfo} from 'parse5';
import * as parse5 from 'parse5';
import {Readable, Stream} from 'stream';
import {Rule} from './rule';
import {ParseState} from './parse-state';
import {Issue} from './issue';

export class Linter {

    private rules: Array<Rule>;
    private scopes: string[];
    private voids: string[];

    constructor(rules: Rule[], scopes?: string[], voids?: string[]) {
        if (!rules)
            rules = [];

        this.rules = rules;
        this.scopes = scopes;
        this.voids = voids;
    }

    lint(html: string|Stream): Promise<Issue[]> {

        var parser: SAXParser = new SAXParser({ locationInfo: true });
        var parseState: ParseState = new ParseState(this.scopes, this.voids);
        
        parseState.initPreRules(parser);

        let rules = this.rules;

        rules.forEach((rule) => {
            rule.init(parser, parseState);
        });

        parseState.initPostRules(parser);

        var work:SAXParser;

        if(typeof(html) === 'string')
        {
            var stream: Readable = new Readable();
            stream.push(html);
            stream.push(null);
            work = stream.pipe(parser);       
        }else if((<any>html).pipe !== undefined)
        {
            work = (<any>html).pipe(parser);
        }       
        else{
            throw new Error("html isn't pipeable");
        }

        var completed = new Promise<void>(function (resolve, reject) {
            work.on("end", () => {
                parseState.finalise();
                resolve();
            });
        });

        var ruleTasks = [];

        rules.forEach((rule) => {
            let task = completed.then(() => {
                return rule.finalise();
            });
            ruleTasks.push(task);
        });

        return Promise.all(ruleTasks).then(results => {

            var all = new Array<Issue>();

            results.forEach(parts => {
                all = all.concat(parts);
            });

            return all;
        });
    }    
}