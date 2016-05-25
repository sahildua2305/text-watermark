/*
* @Package: text-watermark
* @Author: sahildua2305
* @Date:   2016-05-24 06:44:49
* @Last Modified by:   Sahil Dua
* @Last Modified time: 2016-05-26 01:09:13
*/

'use strict';

var fs = require('fs');
var im = require('imagemagick');
var path = require('path');
var ratify = require('node-ratify');

// Default options for watermarking
var defaultOptions = {
    "text" : "Sample Text Watermark",
    "color" : "rgba(0,0,0,0.5)",
    "scale" : "100%",
    "rotation" : "dia",
    "position" : "Center",
    "override-image" : false
};

/**
 * _parseOptions
 * @param  {Object} imageData   image data as read by ImageMagick
 * @param  {String} source      original image path
 * @param  {Object} options     watermark options
 * @return {Object}             watermark final options to be passed to ImageMagick for watermarking
 */
function _parseOptions(imageData, source, options) {
    var finalObj = {};

    var width = imageData.width;
    var height = imageData.height;

    var watermarkText = ratify.isEmpty(options.text) ? defaultOptions.text : options.text;
    var color = ratify.isEmpty(options.color) ? defaultOptions.color : options.color;
    var scale = ratify.isEmpty(options.scale) ? defaultOptions.scale : options.scale;
    var rotation = ratify.isEmpty(options.rotation) ? defaultOptions.rotation : options.rotation;
    var position = defaultOptions.position;
    var font = options.font;

    var outputPath = null;
    var angle = null;

    // check if image needs to be overridden or not
    // update the outputPath accordingly
    if(options['override-image'] && ratify.isBoolean(options['override-image'])
        && options['override-image'].toString() === 'true') {
        outputPath = source;
    }
    else {
        outputPath = ratify.isEmpty(options.outputPath) ? (path.dirname(source) + "/watermark_" + path.basename(source)) : options.outputPath;
    }

    var pointWidth = width;
    var pointHeight = height;

    // check if given scale value is valid or not
    // if it is, scale the pointWidth and pointHeight accordingly
    if(scale.toString().indexOf("%") == -1) {
        scale = defaultOptions.scale;
    }
    else {
        var scaleFactor = (parseFloat(scale) / 100);
        pointWidth *= scaleFactor;
        pointHeight *= scaleFactor;
    }

    var pointSize = Math.sqrt(pointWidth * pointWidth + pointHeight * pointHeight) / watermarkText.length;

    if(rotation.toString() == "dia") {
        angle = (Math.atan(height / width) * (180 / Math.PI)) * -1;
    }
    else {
        angle = parseInt(rotation.toString());
    }

    var args = [];

    // original image path
    args.push(source);

    // size of final image
    args.push("-size");
    args.push(width + "x" + height);

    // scale factor
    args.push("-resize");
    args.push(scale);

    // set font, if passed in options
    if(!ratify.isEmpty(font)) {
        args.push("-font");
        args.push(font);
    }

    // color of watermark text on the final image
    args.push("-fill");
    args.push(color);

    // pointSize calculated on the basis of original image size and length of the watermark text
    args.push("-pointsize");
    args.push(pointSize);

    // alignment of the watermark text
    args.push("-gravity");
    args.push(position);

    // angle of the watermark text wrt to X-axis
    args.push("-annotate");
    args.push(angle);

    // watermark text
    args.push(watermarkText);

    // path of final image with watermark path
    args.push(outputPath);

    finalObj.args = args;
    finalObj.outputPath = outputPath;

    return finalObj;

}

/**
 * addWatermark
 * @param {String}   source     original image path
 * @param {Object}   options    watermark options
 * @param {Function} callback   callback function containing errors, if any
 */
function addWatermark(source, options, callback) {
    var error;

    // check for valid/invalid arguments
    if((arguments.length < 2)
        || (arguments.length  === 2 && !ratify.isFunction(arguments[1]))
        || (arguments.length > 2 && !ratify.isFunction(arguments[2]))) {
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
                    error = new Error('Text-Watermark::addWatermark : Error while processing image file : ' + err);
                    return callback(error);
                }

                var finalObj = _parseOptions(imageData, source, options);

                im.convert(finalObj.args, function(err, stdout) {
                    if(err) {
                        error = new Error('Text-Watermark::addWatermark : Error in applying watermark : ' + err);
                        return callback(error);
                    }
                    else {
                        console.log('Text-Watermark::addWatermark : Watermark applied. You can check the output file at : ' + finalObj.outputPath);
                        return callback(null);
                    }
                });
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
