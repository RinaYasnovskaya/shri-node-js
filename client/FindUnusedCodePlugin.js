const fs = require('fs');
const path = require('path');
class FindUnusedCodePlugin {
  apply (compiler) {
    compiler.hooks.afterCompile.tap('Find Unused Code Plugin', (
    compilation
    ) => {
      // console.log(compilation.);
      const resultFileSystem = getAllFiles('./src');
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
