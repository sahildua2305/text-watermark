/*
* @Package: text-watermark
* @Author: sahildua2305
* @Date:   2016-05-24 06:59:44
* @Last Modified by:   Sahil Dua
* @Last Modified time: 2016-05-24 13:49:27
*/

'use strict';

var fs = require('fs');
var watermark = require('text-watermark');

var options = {
    'text' : 'Sahil Dua'
};

watermark.addWatermark('/home/sahildua2305/Downloads/sahildua.jpg', options, function(err){
	if(err)
		return console.log(err);

	return console.log("Successful");
});
