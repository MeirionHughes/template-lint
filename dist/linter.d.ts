import { Rule } from './rule';
import { RuleError } from './rule-error';
export declare class Linter {
    private rules;
    private scopes;
    private voids;
    constructor(rules: Rule[], scopes?: string[], voids?: string[]);
    lint(html: string): Promise<RuleError[]>;
}
