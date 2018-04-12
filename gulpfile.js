(function() {
  'use strict';

  //# Load external modules
  var gulp = require('gulp');
  var gulpIf = require('gulp-if');
  var esLint = require('gulp-eslint');
  var concat = require('gulp-concat');
  var $ = require('./gulpfile.tree');

  var checkFilesArray = $.source.javascript.config.concat([$.source.javascript.all]);
  var launchDebugError = false;

  //# MODE ###########################
  //## Initializes mode of gulp execution:
  gulp.task('mode:compile', function(done) {
    launchDebugError = true;
    done();
  });
  gulp.task('mode:watched', function(done) {
    launchDebugError = false;
    done();
  });

  //# DEBUG ##########################
  //## Search for some Code Style and Best Practices errors in JS files and show them:
  gulp.task('debug', function() {
    return gulp.src(checkFilesArray)
      .pipe(esLint())
      .pipe(esLint.format())
      .pipe(gulpIf(launchDebugError, esLint.failAfterError()));
  });

  //# CONCAT #########################
  //## Compile source JS into release directory with concat:
  gulp.task('source:concat', function() {
    return gulp.src($.source.javascript.load)
      .pipe(concat($.files.core))
      .pipe(gulp.dest($.paths.release));
  });

  //# WATCH ##########################
  //## Watching tasks:
  gulp.task('watch', function() {
    gulp.watch(checkFilesArray, gulp.parallel('debug'));
    gulp.watch($.source.javascript.all, gulp.parallel('source:concat'));
  });

  //# COMPILATION ####################
  //## Compile all tasks without watch action
  gulp.task('concat', gulp.series('mode:compile', 'debug', 'source:concat'));
  //## Compile all tasks with watch action
  gulp.task('concat:watch', gulp.series('mode:watched', 'debug', 'source:concat', 'watch'));

  //# DEFAULT TASK #################################################################
  gulp.task('default', gulp.parallel('concat:watch'));
})();
