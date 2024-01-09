import fs from 'fs/promises';
import path from 'path';

export interface User {
    name: string;
    id: number;
}

export class LSVParser {
    public static async read(src: string): Promise<User[]> {
        const file = await fs.readFile(path.join(__dirname, 'db', src), 'utf8');
        const lines = file.split('\n');
        let result: User[] = [];
        lines.forEach(line => {
            const s = line.split(' ');
            if (s.length > 1) {
                result.push({
                    id: +s[0],
                    name: s[1]
                });
            }
        });
        return result;
    }

    public static async append(src: string, id: number, name: string): Promise<void> {
        await fs.appendFile(path.join(__dirname, 'db', src), `${id} ${name}\n`, {
            encoding: 'utf8'
        });
    }
}