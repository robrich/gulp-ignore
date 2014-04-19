gulp-ignore ![status](https://secure.travis-ci.org/robrich/gulp-ignore.png?branch=master)
===========

Include or exclude [gulp](https://github.com/gulpjs/gulp) files from the stream based on a condition

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

Uglify everything but only copy certain things to the dist folder

```javascript
var exclude = require('gulp-ignore').exclude;
var uglify = require('gulp-uglify');

gulp.task('task', function() {
  gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(exclude('./libs/**'))
    .pipe(gulp.dest('./dist/'));
});
```

```javascript
var include = require('gulp-ignore').include;
var uglify = require('gulp-uglify');

gulp.task('task', function() {
  gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(include('**/*.min.*'))
    .pipe(gulp.dest('./dist/'));
});
```

API
---

### exclude(condition)

Exclude files whose `file.path` matches, include everything else

### include(condition)

Include files whose `file.path` matches, exclude everything else

### condition

Type: `boolean` or [`stat`](http://nodejs.org/api/fs.html#fs_class_fs_stats) object or `function` that takes in a vinyl file and returns a boolean or `RegularExpression` that works on the `file.path`

The condition parameter is any of the conditions supported by [gulp-match](https://github.com/robrich/gulp-match).  The `file.path` is passed into `gulp-match`.

If a function is given, then the function is passed a vinyl `file`. The function should return a `boolean`.


LICENSE
-------

(MIT License)

Copyright (c) 2014 [Richardson & Sons, LLC](http://richardsonandsons.com/)

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
