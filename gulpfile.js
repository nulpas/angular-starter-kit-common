(function() {
  'use strict';

  //# Load external modules
  var gulp = require('gulp');
  var es = require('event-stream');
  var jshint = require('gulp-jshint');
  var jscs = require('gulp-jscs');
  var concat = require('gulp-concat');
  var watch = require('gulp-watch');
  var templateCache = require('gulp-angular-templatecache');
  var htmlMin = require('gulp-htmlmin');
  var $ = require('./gulpfile.tree');

  var checkFilesArray = $.source.javascript.config.concat([$.source.javascript.all]);

  var getTplCache = function() {
    return gulp.src($.source.html.all)
      .pipe(htmlMin({
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true
      }))
      .pipe(templateCache({
        root: 'source',
        module: 'source.templateCache',
        standalone: true
      }));
  };

  //# DEBUG ##########################

  //## Search for some Best Practices errors in JS files and show them
  gulp.task('debug:best.practices', function() {
    return gulp.src(checkFilesArray)
      .pipe(jshint('./.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'));
  });
  //## Search for some Code Style errors in JS files and show them
  gulp.task('debug:code.style', function() {
    return gulp.src(checkFilesArray)
      .pipe(jscs())
      .pipe(jscs.reporter())
      .pipe(jscs.reporter('fail'));
  });
  //## Join all debugging tasks
  gulp.task('debug', ['debug:best.practices', 'debug:code.style']);

  //# CONCAT #########################

  //## Compile source JS into release directory with concat
  gulp.task('source:concat', function() {
    return es.merge(gulp.src($.source.javascript.load), getTplCache())
      .pipe(concat($.files.core))
      .pipe(gulp.dest($.paths.release));
  });

  //# WATCH ##########################

  //## Watching tasks
  gulp.task('watch', function() {
    watch(checkFilesArray, function() {
      gulp.start('debug');
    });
    watch($.source.javascript.all, function() {
      gulp.start('source:concat');
    });
  });

  //# COMPILATION ####################

  //## Compile all tasks without watch action
  gulp.task('concat', ['debug', 'source:concat']);
  //## Compile all tasks with watch action
  gulp.task('concat:watch', ['debug', 'source:concat', 'watch']);

  //# DEFAULT TASK #################################################################
  gulp.task('default', ['concat:watch']);
})();
