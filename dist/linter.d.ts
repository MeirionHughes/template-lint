import { Rule } from './rule';
export declare class Linter {
    private rules;
    constructor(rules: Rule[]);
    lint(html: string): Promise<string[]>;
}
