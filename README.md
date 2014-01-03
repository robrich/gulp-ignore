![status](https://secure.travis-ci.org/robrich/gulp-ignore.png?branch=master)

gulp-ignore
===========

plugin for [gulp](https://github.com/wearefractal/gulp) to ignore files in the stream based on file characteristics

Note
----

`gulp.src()` now supports multiple globs including ignore globs.  See [glob-stream](https://github.com/wearefractal/glob-stream).  In most cases, this is sufficient, removing the need for this plugin.

```javascript
gulp.task('kill-js', function() {
  gulp.src(['./**/*.js','!./node_modules/**','!./libs/**'])
    .pipe(something());
});
```

Usage
-----

options arg has 3 optional properties: {
  isFile:true, // ignore files
  isDirectory:true, // ignore directories
  pattern:'glob' // minimatch glob: string or array of strings, or a function that returns the answer to 'ignore this?'
}

```javascript
var ignore = require('gulp-ignore');

gulp.task('kill-js', function() {
  gulp.src('./**/*.js')
    .pipe(ignore({pattern:['./node_modules/**','./libs/**']}))
    .pipe(something());
});

gulp.task('kill-css', function() {
  gulp.src('./**/*.css')
    .pipe(ignore({isFile:true}))
    .pipe(something());
});
```

LICENSE
-------

(MIT License)

Copyright (c) 2013 [Richardson & Sons, LLC](http://richardsonandsons.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
