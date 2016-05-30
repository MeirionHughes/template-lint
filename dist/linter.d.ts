import { Rule } from './rule';
import { RuleError } from './rule-error';
export declare class Linter {
    private rules;
    constructor(rules: Rule[]);
    lint(html: string): Promise<RuleError[]>;
}
