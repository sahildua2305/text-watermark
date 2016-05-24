/*
* @Author: sahildua2305
* @Date:   2016-05-24 06:44:49
* @Last Modified by:   Sahil Dua
* @Last Modified time: 2016-05-24 06:56:20
*/

'use strict';

var fs = require('fs'),
    im = require('imagemagick'),
    path = require('path'),
    ratify = require('node-ratify');

var defaultOptions = {
    "text" : "Sample Text Watermark",
    "color" : "rgba(0,0,0,0.4)",
    "scale" : "100%",
    "override-image" : false
};

function addWatermark(source, options) {
    if(!source || source == "")
        throw new Error('Text-Watermark::addWatermark : Specificied invalid image source');
}

function addWatermarkWithCb(source, options, callback) {
}


exports = module.exports = {
    addWatermark : addWatermark,
    addWatermarkWithCb : addWatermarkWithCb,
    version : JSON.parse(
        require('fs').readFileSync(__dirname + '/package.json', 'utf-8')
    ).version
};
