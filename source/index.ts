"use strict";

export * from './linter';
export * from './parse-state';
export * from './parse-node';
export * from './rule';
export * from './rule-error';

export * from './self-close';
export * from './parser';
export * from './obsolete-tag';
export * from './obsolete-attribute';

"use strict";

import {SelfCloseRule} from './index'
import {ParserRule} from './index'

export var DefaultRules = [
    new SelfCloseRule(),
    new ParserRule()
]