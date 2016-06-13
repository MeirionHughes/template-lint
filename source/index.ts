"use strict";

export * from './linter';
export * from './parse-state';
export * from './parse-node';
export * from './rule';
export * from './issue';

export * from './rules/self-close';
export * from './rules/parser';
export * from './rules/obsolete-tag';
export * from './rules/obsolete-attribute';
export * from './rules/unique-id';

"use strict";

import {SelfCloseRule} from './index'
import {ParserRule} from './index'

export var DefaultRules = [
    new SelfCloseRule(),
    new ParserRule()
]