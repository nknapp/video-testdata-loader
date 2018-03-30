const path = require('path')
const fs = require('fs-extra')
const tempfile = require('tempfile')
const tar = require('tar')

const tmpDir = tempfile('.video-testdata')
process.on('exit', function () {
  fs.removeSync(tmpDir)
  console.log('Temporary dir ' + tmpDir + ' deleted!')
})

/**
 * Return a file from the collection, extracting tar-files on the go.
 * @param filename {string} the name of a file from the "data" directory
 * @param [innerFile] {string} the name of a file within the tar-file that `filename` is pointing to.
 * @param [options] {object} optional parameters
 * @param [options.to] {string} an optional target path for the file (including the filename)
 * @return Promise<string> the path to the test-file as Promise
 */
module.exports = async function (filename, innerFile, options) {
  if (typeof innerFile !== 'string' && options === undefined) {
    options = innerFile
    innerFile = undefined
  }

  options = {
    to: path.join(tmpDir, filename),
    ...options
  }

  const sourceFile = require.resolve('video-testdata/data/' + filename)

  if (path.extname(filename) === '.tar') {
    if (!fs.existsSync(options.to)) {
      await fs.mkdirs(options.to)
      await tar.x({file: sourceFile, cwd: options.to})
    }
    return path.join(options.to, innerFile || '.')
  } else {
    await fs.copy(sourceFile, options.to)
    return options.to
  }
}
