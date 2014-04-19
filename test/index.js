/*global describe:false, it:false */

"use strict";

var exclude = require('../');
var fs = require('fs');
var should = require('should');
require('mocha');

describe('gulp-filter', function() {
	describe('exclude()', function() {
		var tempFileContent = 'A test generated this file and it is safe to delete';

		it('should pass file structure through', function(done) {
			// Arrange
			var tempFile = './temp.txt';

			var stream = exclude(); // don't filter anything
			var fakeFile = {
				path: tempFile,
				contents: new Buffer(tempFileContent)
			};

			// Assert
			stream.on('data', function(actualFile){
				// Test that content passed through
				should.exist(actualFile);
				should.exist(actualFile.path);
				should.exist(actualFile.contents);
				actualFile.path.should.equal(tempFile);
				String(actualFile.contents).should.equal(tempFileContent);
				done();
			});

			// Act
			stream.write(fakeFile);
			stream.end();
		});

		it('should allow non-matching file', function(done) {
			// Arrange
			var tempFile = './temp.txt';
			fs.writeFileSync(tempFile, tempFileContent);
			fs.existsSync(tempFile).should.equal(true);
			var a = 0;

			var stream = exclude('./nottemp.txt');
			var fakeFile = {
				path: tempFile,
				contents: new Buffer(tempFileContent)
			};

			// Assert
			stream.on('data', function(){
				a++;
			});
			stream.once('end', function(){
				a.should.equal(1);
				done();
			});

			// Act
			stream.write(fakeFile);
			stream.end();
		});

		it('should block matching file', function(done) {
			// Arrange
			var tempFile = './temp.txt';
			fs.writeFileSync(tempFile, tempFileContent);
			fs.existsSync(tempFile).should.equal(true);
			var a = 0;

			var stream = exclude('./temp.txt');
			var fakeFile = {
				path: tempFile,
				contents: new Buffer(tempFileContent)
			};

			// Assert
			stream.on('data', function(){
				a++;
			});
			stream.once('end', function(){
				a.should.equal(0);
				done();
			});

			// Act
			stream.write(fakeFile);
			stream.end();
		});

		it('should block files', function(done) {
			// Arrange
			var tempFile = './temp.txt';
			var a = 0;

			var stream = exclude({isFile:true});
			var fakeFile = {
				path: tempFile,
				contents: new Buffer(tempFileContent),
				stat: {
					isFolder: function () {
						return false;
					},
					isFile: function () {
						return true;
					}
				}
			};

			// Assert
			stream.on('data', function(/*fakeFolder*/){
				a++;
			});
			stream.once('end', function(){
				a.should.equal(0);
				done();
			});

			// Act
			stream.write(fakeFile);
			stream.end();
		});

		it('should block folders', function(done) {
			// Arrange
			var tempFile = './temp/temp.txt';
			var a = 0;

			var stream = exclude({isDirectory:true});
			var fakeFolder = {
				path: tempFile,
				contents: new Buffer(tempFileContent),
				stat: {
					isDirectory: function () {
						return true;
					},
					isFile: function () {
						return false;
					}
				}
			};

			// Assert
			stream.on('data', function(/*fakeFolder*/){
				a++;
			});
			stream.once('end', function(){
				a.should.equal(0);
				done();
			});

			// Act
			stream.write(fakeFolder);
			stream.end();
		});

	});
});
