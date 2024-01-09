import fs from 'fs/promises';
import path from 'path';
export class TextReader {
    public static async read(src: string): Promise<string> {
        const text = await fs.readFile(path.join(__dirname, 'data', src), 'utf-8');
        return text;
    }
}