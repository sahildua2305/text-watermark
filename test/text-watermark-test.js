/*
* @Package: text-watermark
* @Author: sahildua2305
* @Date:   2016-05-24 14:46:34
* @Last Modified by:   Sahil Dua
* @Last Modified time: 2016-05-24 15:36:31
*/

'use strict';

var assert = require('assert');
var watermark = require('../');

describe('text-watermark', function() {

    describe('#addWatermark()', function() {
        context('when no source is provided', function() {
            it('should throw error'), function() {
                var options = {};
                watermark.addWatermark('', options, function(err) {
                    assert.equal(err, "ERROR"); 
                });
            };
        });
    });

})
