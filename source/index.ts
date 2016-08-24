"use strict";

export * from './linter';

export * from './parser';
export * from './parser-builder';
export * from './parser-state';
export * from './parser-node';
export * from './rule';
export * from './issue';

export * from './rules/self-close';
export * from './rules/structure';
export * from './rules/obsolete-tag';
export * from './rules/obsolete-attribute';
export * from './rules/id-attribute';
export * from './rules/attribute-value';
export * from './rules/conflicting-attributes';

"use strict";

import { SelfCloseRule } from './rules/self-close';
import { StructureRule } from './rules/structure';
import { IdAttributeRule } from './rules/id-attribute';

export var DefaultRules = [
  new SelfCloseRule(),
  new StructureRule(),
  new IdAttributeRule()
];
