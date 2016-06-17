import {SAXParser, StartTagLocationInfo} from 'parse5';
import * as parse5 from 'parse5';

import {ParserState} from './parser-state';

export class Parser extends SAXParser{
    constructor(public state:ParserState)    {
        super({ locationInfo: true });
    }

    public isVoid(name: string): boolean {
        return this.state.isVoid(name);
    }

    public isScope(name: string): boolean {
        return this.state.isScope(name);
    }
}