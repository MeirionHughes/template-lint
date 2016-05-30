/**
* An error object
*/
export declare class RuleError {
    message: string;
    line: number;
    column: number;
    constructor(message: string, line: number, column: number);
}
