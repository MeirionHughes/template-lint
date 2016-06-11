/**
* An error object
*/
export class RuleError {
    constructor(public message: string, public line: number, public column: number, public detail?:string) {
    }
}