This module is a loader for the test video-files contained
in [the video-testdata package](http://github.com/nknapp/video-testdata)
Those can be used to test video-conversion to different formats.

## Usage

Syntax: `const file = await loadData("<filename>",["<innerFile>"], [options])`

The call returns a promise that resolves to the target file once it is ready.
If the file is a tar-file, it is automatically extracted and `file` will point to
a temporary directory containing the extracted data.
If the file is a tar-file, an `innerFile` may be provided. `file` will then point to
this file within the extracted tar-file.

### Options

"options" is an object that can have the following properties

* `to`: The file to copy the media file to, or the name of the directory to extract the tar file to.

### Examples

```js

var loadData = require("video-testData-loader");

const file = await loadData("2-video-unstreamable.mp4")

// ... or,

const file = await loadData("2-video-unstreamable.mp4", { to: "testTmp/video.mp4" })

// ... or, for tar-files ...

const file = await loadData("panasonic-lumix-dmc-zx3.tar","PRIVATE/AVCHD/BDMV/STREAM/00000.MTS")

// ... or ... ,

const directory = loadData("panasonic-lumix-dmc-zx3.tar")
// directory is the root of the extracted tar-file

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

