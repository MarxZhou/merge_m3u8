import moduleAlias from 'module-alias';

moduleAlias();

import fs from 'fs';
import { execSync } from 'child_process';

// import utils, { Log, deleteFolderRecursive } from './utils';
const utils = require('@/utils').default;
const { Log } = utils;
console.log('Log:', Log);
console.log('utils:', utils);

// import pathConfig from '@/config';
// console.log('config:', pathConfig);
