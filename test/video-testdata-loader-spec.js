const chai = require('chai')
const assert = chai.assert
chai.use(require('dirty-chai'))
const fs = require('fs')
const path = require('path')
const loader = require('../index')

describe('the video-testdata-loader', function () {
  it('should extract a file inside the tar file', async function () {
    const file = await loader('samsung-smx-f40bp-edc.tar', 'VIDEO/100VIDEO/SDV_0999.MP4')
    assert.equal(path.basename(file), 'SDV_0999.MP4', 'Must be the inside file')
    assert(fs.statSync(file).isFile(), 'Must exist as regular file')
  })

  it('should extract the tar file to a directory if no inner file is given', async function () {
    const directory = await loader('samsung-smx-f40bp-edc.tar')
    assert.equal(path.basename(directory), 'samsung-smx-f40bp-edc.tar', 'Must be the base dir of the extracted tar')
    assert(fs.statSync(directory).isDirectory(), 'Must exist as directory')
  })

  it('should copy files outside the tar file', async function () {
    const file = await loader('0-novideo.mp4')
    assert.equal(path.basename(file), '0-novideo.mp4', 'Must be the test-file.')
    assert(fs.statSync(file).isFile(), 'Must exist as regular file')
  })
})
