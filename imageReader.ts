import fs from 'fs/promises';
import path from 'path';

export class ImageReader {
    public static async read(src: string): Promise<Buffer> {
        const s = await fs.readFile(path.join(__dirname, 'img', src));
        return s;
    }
}