import { IssueSeverity } from './issue-severity';
export { IssueSeverity } from './issue-severity';

/**
* information about an issue
*/
export class Issue {
  public message: string;
  public start: number;
  public end: number;
  public line: number;
  public column: number;
  public severity: IssueSeverity = IssueSeverity.Error;
  public detail: string;
  public path: string;

  constructor(opts: {
    message: string,
    start?: number,
    end?: number,
    line?: number,
    column?: number,
    severity?: IssueSeverity
    detail?: string,
    path?: string
  }) {
    Object.assign(this, opts);
  }
}
