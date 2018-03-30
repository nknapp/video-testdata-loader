const fs = require('fs')
const path = require('path')

function dataFiles () {
  const videoTestdata = path.dirname(require.resolve('video-testdata/package.json'))
  return fs.readdirSync(path.join(videoTestdata, 'data'))
    .map(file => `"${file}"`)
    .join(' | ')
}

fs.writeFileSync('index.d.ts', `
declare module 'video-testdata-loader' {
  type validInputFiles = ${dataFiles()}

  /**
   * Load testdata
   **/
  function loadData(file: validInputFiles, innerFile: string, options?: LoadDataOptions): Promise<string>;
  function loadData(file: validInputFiles, options?: LoadDataOptions): Promise<string>;
  export = loadData;

  interface LoadDataOptions {
    to: string
  }
}
`)