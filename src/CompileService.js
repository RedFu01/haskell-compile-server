import fs from 'fs';
import { spawn } from 'child_process';
import { resolve } from 'path';

export default class CompileService {
    constructor(path) {
        this.path = `./user_data/${path}`;
        fs.mkdirSync(this.path, { recursive: true })
    }

    async compile(data) {
        const result = {};
        const files = Object.keys(data);

        for (let i = 0; i < files.length; i++) {
            await new Promise(resolve => {
                const fileName = files[i];
                result[fileName] = ''; //{ stdout: '', stderr: '' };
                const filePath = `${this.path}/${fileName}`
                fs.writeFileSync(filePath, data[fileName]);
                const process = spawn('stack', [filePath]);
                process.stdout.on('data', (data) => {
                    result[fileName] += data.toString();
                });
                process.stderr.on('data', (data) => {
                    result[fileName] += data.toString();
                });
                process.on('exit', () => resolve());
            });
        }

        return result;
    }
}