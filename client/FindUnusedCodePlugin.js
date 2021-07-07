const fs = require('fs');
const path = require('path');
class FindUnusedCodePlugin {
  apply (compiler) {
    compiler.hooks.afterCompile.tap('Find Unused Code Plugin', (
    compilation
    ) => {
      const usedModule = compilation.assets; // ? modules
      const resultFileSystem = getAllFiles('./src');

      const resultArray = [];

      resultFileSystem.forEach((el) => {
        if (!usedModule.includes(el)) {
          resultArray.push(el);
        }
      });

      fs.writeFileSync('./unused.json', JSON.stringify(resultArray));
    })
  }
}

function getAllFiles (dir) {
  return fs.readdirSync(dir).reduce((files, file) => {
      const name = path.join(dir, file);
      const isDirectory = fs.statSync(name).isDirectory();
      return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, []);
}

module.exports = FindUnusedCodePlugin;
