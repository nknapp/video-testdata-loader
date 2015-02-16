This module contains test video-files that can be used to test video-conversion
to different formats.

## Usage

Syntax: `require("video-testData-loader")("<filename>",["<innerFile>"], callback(err,file))`

The callback-parameter `file` contains the path to the requested file (see below).
If the file is a tar-file, it is automatically extracted and `file` will point to
a temporary directory containing the extracted data.
If the file is a tar-file, a `innerFile` may be provided. `file` will then point to
this file within the extracted tar-file.


```js

var loadData = require("video-testData-loader");
loadData("2-video-unstreamable.mp4",function(err, file) {
    // do something
});

// ... or, for tar-files ...

loadData("panasonic-lumix-dmc-zx3.tar","PRIVATE/AVCHD/BDMV/STREAM/00000.MTS",function(err, file) {
    // do something
});

// ... or ... ,

loadData("panasonic-lumix-dmc-zx3.tar",function(err, directory) {
    // directory is the root of the extracted tar-file
});


// To just retrieve the file (without extracting tar-files, you can also do:
var file = loadData("2-video-unstreamable.mp4");
```

## Files

The following files can be used

#### `0-novideo.mp4`

This file is not actually a video but a text file containing "123". Can be used as "broken" video"

#### `1-video-streamable.mp4`

An mp4-video with H264/AAC streams with the "moov" box near the beginning, so that ffmpeg can
perform a streaming decode

#### `2-video-unstreamable.mp4`

An mp4-video with H264/AAC streams with the "moov" box not near the beginning, so that ffmpeg does not
accept this video via stdin.

#### `panasonic-lumix-dmc-zx3.tar`

A tar-file containing the sd-card content of Panasonic Lumix after recording a single video.
In particular, the inner file `PRIVATE/AVCHD/BDMV/STREAM/00000.MTS` is a AVHCD MPEG2-Transport-
Stream file.

#### `samsung-smx-f40bp-edc.tar`

A tar-file containing the sd-card content of Samsung-Camcorder after recording a single video.
In particular, the inner file `VIDEO/100VIDEO/SDV_0999.MP4` is a mp4-file.

