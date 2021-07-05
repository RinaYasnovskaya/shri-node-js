class FindUnusedCodePlugin {
  apply (compiler) {
    compiler.hooks.done.tap('Find Unused Code Plugin', (
    compilation
    ) => {

    })
  }
}

module.exports = FindUnusedCodePlugin;
