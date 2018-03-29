const path = require('path')
const fs = require('fs')
const tempfile = require('tempfile')
const rimraf = require('rimraf')
const tar = require('tar')

/**
 *
 * Global tmpdir for this instance.
 */
var tmpDir = tempfile('.video-testdata')
fs.mkdirSync(tmpDir)
process.on('exit', function () {
  rimraf.sync(tmpDir)
  console.log('Temporary dir ' + tmpDir + ' deleted!')
})

/**
 * Return a file from the collection, extracting tar-files on the go.
 * @param filename {string} the name of a file from the "data" directory
 * @param [innerFile] {string} the name of a file within the tar-file that `filename` is pointing to.
 * @return Promise<string> the path to the test-file as Promise
 */
module.exports = async function (filename, innerFile) {
  const sourceFile = require.resolve('video-testdata/data/' + filename)

  if (path.extname(filename) === '.tar') {
    let target = path.join(tmpDir, filename)
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target)
      await tar.x({file: sourceFile, cwd: target})
    }
    return path.join(target, innerFile || '.')
  } else {
    return sourceFile
  }
}