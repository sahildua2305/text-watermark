/*
* @Package: text-watermark
* @Author: sahildua2305
* @Date:   2016-05-24 06:59:44
* @Last Modified by:   Sahil Dua
* @Last Modified time: 2016-05-24 07:14:05
*/

'use strict';

var fs = require('fs');
var im = require('imagemagick');
var path = require('path');
var ratify = require('node-ratify');
var watermark = require('../../text-watermark.js');

var options = {
    'text' : 'Sahil Dua'
};

watermark.addWatermark('/home/sahildua2305/Downloads/sahildua.jpg', options);
