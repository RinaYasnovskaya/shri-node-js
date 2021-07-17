import fs from 'fs';
import util from 'util';

const writeFileAsync = util.promisify(fs.writeFile);
const unlinkFileAsync = util.promisify(fs.unlink);
const existsFileAsync = util.promisify(fs.exists);

export const fsObj = {
  writeFile: async (path: string, content: any) => {
    await writeFileAsync(path, content, { encoding: 'utf-8' });
  },

  removeFile: async (path: string) => {
    try {
      await unlinkFileAsync(path);
    } catch (err) {
      console.log(`file ${path} doesn't exist.`);
    }
  },

  exists: async (path: string) => {
    const res = await existsFileAsync(path);
    return res;
  },
};
