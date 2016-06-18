import {IssueSeverity} from './issue-severity';
export {IssueSeverity} from './issue-severity';

/**
* information about an issue
*/
export class Issue {

    public severity: IssueSeverity = IssueSeverity.Error;

    public line: number;
    public column: number;
    public message: string;
    public detail: string;
    public url: string;

    constructor(opts: {
        message: string,
        line: number,
        column?: number,
        severity?: IssueSeverity
        detail?: string,
        url?: string
    }) {
        Object.assign(this, opts);
    }
}