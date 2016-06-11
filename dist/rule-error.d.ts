/**
* An error object
*/
export declare class RuleError {
    message: string;
    line: number;
    column: number;
    detail: string;
    constructor(message: string, line: number, column: number, detail?: string);
}
