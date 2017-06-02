(function() {
  'use strict';

  //# Directories
  var sourceDir = 'source';
  var releaseDir = 'release';

  //# File Names
  var coreFile = 'angular-starter-kit-core.js';

  module.exports = {
    files: {
      core: coreFile
    },
    paths: {
      source: './' + sourceDir,
      release: './' + releaseDir
    },
    source: {
      javascript: {
        all: './' + sourceDir + '/**/*.js',
        load: [
          './' + sourceDir + '/source.module.js',
          './' + sourceDir + '/source.config.js',

          './' + sourceDir + '/**/*.module.js',
          './' + sourceDir + '/**/*.config.js',
          './' + sourceDir + '/**/!(*.module || *.config).js'
        ],
        config: [
          './gulpfile.js',
          './gulpfile.tree.js'
        ]
      },
      html: {
        all: './' + sourceDir + '/**/*.tpl.html'
      }
    }
  };
})();
