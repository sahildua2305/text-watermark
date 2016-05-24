/*
* @Package: text-watermark
* @Author: sahildua2305
* @Date:   2016-05-24 06:44:49
* @Last Modified by:   Sahil Dua
* @Last Modified time: 2016-05-24 13:48:28
*/

'use strict';

var fs = require('fs');
var im = require('imagemagick');
var path = require('path');
var ratify = require('node-ratify');

var defaultOptions = {
    "text" : "Sample Text Watermark",
    "color" : "rgba(0,0,0,0.4)",
    "scale" : "100%",
    "override-image" : false
};

function addWatermark(source, options, callback) {
    var error;

    if(!source || source == "") {
        error = new Error('Text-Watermark::addWatermark : Invalid image source');
        return callback(error);
    }
    return callback(null);
}


exports = module.exports = {
    addWatermark : addWatermark,
    version : JSON.parse(
        require('fs').readFileSync(__dirname + '/package.json', 'utf-8')
    ).version
};
