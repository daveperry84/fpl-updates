import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataDir = join(__dirname, '../data/json');
const outputFile = join(__dirname, '../data/gameweeks.json');

async function concatJsonFiles(): Promise<void> {
    const files = await readdir(dataDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    const objects = [];
    for (const file of jsonFiles) {
        const filePath = join(dataDir, file);
        const content = await readFile(filePath, 'utf-8');
        try {
            const obj = JSON.parse(content);
            objects.push(obj);
        } catch {
            // skip invalid JSON files
        }
    }

    await writeFile(outputFile, JSON.stringify(objects, null, 2), 'utf-8');
}

concatJsonFiles().catch(err => {
    // eslint-disable-next-line no-console
    console.error('Error concatenating JSON files:', err);
});