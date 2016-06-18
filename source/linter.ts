"use strict";

import {Readable, Stream} from 'stream';
import {Rule} from './rule';
import {ParserState} from './parser-state';
import {Parser} from './parser';
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

    lint(html: string|Stream, path?:string): Promise<Issue[]> {
        var parseState: ParserState = new ParserState(this.scopes, this.voids);
        var parser: Parser = new Parser(parseState);                
        
        parseState.initPreRules(parser);

        let rules = this.rules;

        rules.forEach((rule) => {
            rule.init(parser, path);
        });

        parseState.initPostRules(parser);

        var work:Parser;

        if(typeof(html) === 'string')
        {
            var stream: Readable = new Readable();
            stream.push(html);
            stream.push(null);
            work = stream.pipe(parser);
        }else if(this.isStream(html))
        {
            work = html.pipe(parser);
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

            all = all.sort((a,b)=> (a.line - b.line)*1000 + (a.column- b.column));

            return all;
        });
    }

    private isStream(input): input is Stream {
      return input.pipe && typeof(input.pipe) === "function";
    }

}
