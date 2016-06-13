import { IssueSeverity } from './issue-severity';
export { IssueSeverity } from './issue-severity';
/**
* Provide information relating to Report object
*/
export declare class Issue {
    severity: IssueSeverity;
    line: number;
    column: number;
    message: string;
    detail: string;
    url: string;
    constructor(opts: {
        message: string;
        line: number;
        column?: number;
        severity?: IssueSeverity;
        detail?: string;
        url?: string;
    });
}
