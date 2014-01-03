/*jshint node:true */

"use strict";

var map = require('map-stream');
var minimatch = require('minimatch');

// pattern is a minimatch pattern or a function that returns bool: skip it?
module.exports = function(opt){
	opt = opt || {};
	if (typeof opt.pattern === 'string') {
		opt.pattern = [opt.pattern];
	} else if (opt.pattern && !Array.isArray(opt.pattern)) {
		throw new Error('pattern is not a string or array');
	}

	return map(function (file, cb){
		var i, skip = false;
		if (opt.isDirectory && file.stat && file.stat.isDirectory()) {
			skip = true;
		} else if (opt.isFile && file.stat && file.stat.isFile()) {
			skip = true;
		} else if (typeof opt.pattern === 'function') {
			skip = opt.pattern(file);
		} else if (opt.pattern) {
			for (i = 0; i < opt.pattern.length; i++) {
				if (minimatch(file.path, opt.pattern[i])) {
					skip = true;
					break;
				}
			}
		}
		if (skip) {
			return cb(); // Ignore this one
		} else {
			return cb(null, file);
		}
	});
};
