/*
* @Package: text-watermark
* @Author: sahildua2305
* @Date:   2016-05-24 06:44:49
* @Last Modified by:   Sahil Dua
* @Last Modified time: 2016-05-25 23:19:24
*/

'use strict';

var fs = require('fs');
var im = require('imagemagick');
var ratify = require('node-ratify');

// Default options for watermarking
var defaultOptions = {
    "text" : "Sample Text Watermark",
    "color" : "rgba(0,0,0,0.4)",
    "scale" : "100%",
    "override-image" : false
};

/**
 * addWatermark
 * @param {String}   source     image source
 * @param {Object}   options    watermark options
 * @param {Function} callback   callback function containing errors, if any
 */
function addWatermark(source, options, callback) {
    var error;

    // check for valid/invalid arguments
    if((arguments.length < 2) ||
        (arguments.length  === 2 && !ratify.isFunction(arguments[1])) ||
        (arguments.length > 2 && !ratify.isFunction(arguments[2]))) {
        throw new Error('Text-Watermark::addWatermark : Invalid arguments');
    }
    else if(arguments.length === 2 && ratify.isFunction(arguments[1])) {
        callback = arguments[1];
        options = null;
    }

    // if no image source is found
    if(!source || source == "") {
        error = new Error('Text-Watermark::addWatermark : No image source');
        return callback(error);
    }

    // check if source file exists at the specified path
    fs.lstat(source, function(err, stats) {
        if(err) {
            error = new Error('Text-Watermark::addWatermark : Image file doesn\'t exist at source ' + source);
            return callback(error);
        }
        else if(!stats.isFile()) {
            error = new Error('Text-Watermark::addWatermark : Invalid image source at ' + source);
            return callback(error);
        }
        else {
            // use default options if options aren't properly specified
            if(!options || typeof options !== 'object')
                options = defaultOptions;

            im.identify(source, function(err, imageData) {
                if(err) {
                    error = new Error('Text-Watermark::addWatermark : Unable to process image file : ' + err);
                    return callback(error);
                }

                return callback("Successful - Execution stopped after ImageMagick read the image data");
            });
        }
    });

    return;
}

exports = module.exports = {
    addWatermark : addWatermark,
    version : JSON.parse(
        require('fs').readFileSync(__dirname + '/package.json', 'utf-8')
    ).version
};
