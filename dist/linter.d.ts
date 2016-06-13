import { Rule } from './rule';
import { Issue } from './issue';
export declare class Linter {
    private rules;
    private scopes;
    private voids;
    constructor(rules: Rule[], scopes?: string[], voids?: string[]);
    lint(html: string): Promise<Issue[]>;
}
