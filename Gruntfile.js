/*
 * grunt-cdnify
 * https://github.com/gillesruppert/grunt-cdnify
 *
 * Copyright (c) 2014 Gilles Ruppert
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    cdnify: {
      cdn_option: {
        options: {
          cdn: '//my.cdn.example.com'
        },
        files: {
          'tmp/cdn_option.css': ['test/fixtures/images.css'],
          'tmp/cdn_option.html': ['test/fixtures/index.html'],
        },
      },

      ignore_option: {
        options: {
          cdn: '//my.cdn.example.com',
          ignore: [
            'no/cdn'
          ]
        },
        files: {
          'tmp/ignore_option.css': ['test/fixtures/images.css'],
          'tmp/ignore_option.html': ['test/fixtures/index.html'],
        }
      },

      root_option: {
        options: {
          cdn: '//my.cdn.example.com',
          ignore: [
            'no/cdn'
          ],
          root: 'tmp'
        },
        files: {
          'tmp/root_option.css': ['test/fixtures/images.css'],
          'tmp/root_option.html': ['test/fixtures/index.html'],
        }
      },

      cdn_with_path: {
        options: {
          cdn: '//my.cdn.example.com/assets',
          ignore: [
            'no/cdn'
          ],
          root: 'tmp'
        },
        files: {
          'tmp/cdn_with_path.css': ['test/fixtures/images.css'],
          'tmp/cdn_with_path.html': ['test/fixtures/index.html'],
        }
      },

      cdn_with_trailing_slash: {
        options: {
          cdn: '//my.cdn.example.com/assets/',
          ignore: [
            'no/cdn'
          ],
          root: 'tmp'
        },
        files: {
          'tmp/cdn_with_trailing_slash.css': ['test/fixtures/images.css'],
          'tmp/cdn_with_trailing_slash.html': ['test/fixtures/index.html'],
        }
      },

      root_with_trailing_slash: {
        options: {
          cdn: '//my.cdn.example.com/assets/',
          ignore: [
            'no/cdn'
          ],
          root: 'tmp/'
        },
        files: {
          'tmp/root_with_trailing_slash.css': ['test/fixtures/images.css'],
          'tmp/root_with_trailing_slash.html': ['test/fixtures/index.html'],
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'cdnify', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
