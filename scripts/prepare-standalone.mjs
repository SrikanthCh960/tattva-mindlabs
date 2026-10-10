import { cpSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, '.next', 'standalone');

if (!existsSync(join(output, 'server.js'))) {
  throw new Error('Standalone server was not generated. Run npm run build for Node.js hosting, or npm run build:static for a static export.');
}

cpSync(join(root, 'public'), join(output, 'public'), { recursive: true });
cpSync(join(root, '.next', 'static'), join(output, '.next', 'static'), { recursive: true });
console.log('Standalone server prepared with images, fonts, JavaScript and CSS.');
