require('trace');

var fs = require("fs");
var path = require("path");
var assert = require("assert");

require("./")("samsung-smx-f40bp-edc.tar","VIDEO/100VIDEO/SDV_0999.MP4",function(err,file) {
    if (err) throw err;
    assert.equal(path.basename(file),"SDV_0999.MP4","Must be the inside file");
    assert(fs.statSync(file).isFile(),"Must exist as regular file");
});

require("./")("samsung-smx-f40bp-edc.tar",function(err,directory) {
    if (err) throw err;
    assert.equal(path.basename(directory),"samsung-smx-f40bp-edc.tar","Must be the base dir of the extracted tar");
    assert(fs.statSync(directory).isDirectory(),"Must exist as directory");
});

require("./")("0-novideo.mp4",function(err,file) {
    if (err) throw err;
    assert.equal(path.basename(file),"0-novideo.mp4","Must be the test-file.");
    assert(fs.statSync(file).isFile(),"Must exist as regular file");
});

var file = require("./")("0-novideo.mp4");
assert.equal(path.basename(file),"0-novideo.mp4","Must be the test-file.");
assert(fs.statSync(file).isFile(),"Must exist as regular file");

