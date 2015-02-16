var path = require("path");
var fs = require("fs");
var tempfile = require("tempfile");
var extract = require('tar').Extract;
var es = require("event-stream");
var rimraf = require("rimraf");

/**
 *
 * Global tmpdir for this instance.
 */
var tmpDir = tempfile(".video-testdata");
fs.mkdirSync(tmpDir);
process.on("exit", function () {
    rimraf.sync(tmpDir);
    console.log("Temporary dir " + tmpDir + " deleted!");
});

/**
 *
 * @param filepath {string} the name of a tar-file inside the `data` directory
 * @param callback
 */
function untar(filepath, callback) {
    var targetDir = path.join(tmpDir, path.basename(filepath));
    fs.exists(targetDir, function (err, exists) {
        if (err) {
            callback(err);
            return;
        }
        if (exists) {
            callback(err, targetDir);
        } else {
            fs.createReadStream(filepath)
                .pipe(extract({path: targetDir}))
                .pipe(es.wait(function (err) {
                    callback(err, targetDir);
                }));
        }
    });

}

/**
 * Return a file from the collection, extracting tar-files on the go.
 * @param filename {string} the name of a file from the "data" directory
 * @param [innerFile] {string} the name of a file within the tar-file that `filename` is pointing to.
 * @param callback {function(error,string)} a callback that receives
 *    the path to the test-file as second parameter.
 */
module.exports = function (filename, innerFile, callback) {
    var targetFile = require.resolve("video-testdata/data/" + filename);
    if (!innerFile && !callback) { // Only a filename is given: synchronously resolve file
        return targetFile;
    }
    if (typeof innerFile == "function" && !callback) {   // innerFile is optional
        callback = innerFile;
        innerFile = null;
    }
    if (path.extname(filename) !== ".tar") {
        return callback(null, targetFile);
    } else {
        return untar(targetFile, function (err, extractedBase) {
            if (err) {
                return callback(err, null);
            }
            callback(err, path.join(extractedBase, innerFile || "."));
        });
    }
};