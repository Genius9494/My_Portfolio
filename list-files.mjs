// list-files.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// لجعل __dirname يعمل في ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function listFiles(dir, prefix = '') {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    const isDir = stat.isDirectory();

    console.log(prefix + (isDir ? '📁 ' : '📄 ') + file);

    if (isDir) {
      listFiles(fullPath, prefix + '  ');
    }
  });
}

// 🔻 هنا تحدد المسار الجذري للمشروع حسب مجلدك
const projectRoot = path.resolve(__dirname, './app');
listFiles(projectRoot);

console.log('Done');
