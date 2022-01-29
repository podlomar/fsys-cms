import { resolve } from 'path';
import { FsysCms } from '../esm/index.js';
import { FolderTextLoader } from '../esm/plain-text-provider.js';

const cms = await FsysCms.load(
  resolve('text-content'),
  new FolderTextLoader(['.txt'])
);

console.log(cms.rootEntry);