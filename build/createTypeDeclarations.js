const fs = require('fs')

function dataFiles () {
  return fs.readdirSync('node_modules/video-testdata/data')
    .map(file => `"${file}"`)
    .join(' | ')
}

fs.writeFileSync('index.d.ts', `
declare module 'video-testdata-loader' {
  type validInputFiles = ${dataFiles()}

  /**
   * Load testdata
   **/
  function loadData(file: validInputFiles): Promise<string>;
  export = loadData;

}
`)