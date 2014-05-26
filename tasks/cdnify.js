/*
 * grunt-cdnify
 * https://github.com/gillesruppert/grunt-cdnify
 *
 * Copyright (c) 2014 Gilles Ruppert
 * Licensed under the MIT license.
 */

'use strict';

var interpolate = require('interpolate');

function isCss(filepath) {
  return (/\.css$/).test(filepath);
}

function isHtml(filepath, extension) {
  var htmlTest = new RegExp('\\.' + extension + '$', 'gi');
  return htmlTest.test(filepath);
}

function replace(replacer, options) {
  return function _replace(match, p1) {
    if (!options.ignore.some(function (ignore) { return match.indexOf(ignore) > -1; })) {
      if (p1.indexOf('/') !== 0 && options.cdn.lastIndexOf('/') !== options.cdn.length - 1) {
        p1 = p1 + '/';
      }
      return interpolate(replacer, { p1: p1, cdn: options.cdn });
    } else {
      return match;
    }
  };
}

function addCdnToCss(css, options) {
  console.log('css cdn', options.cdn)
  var img = /url\(['"]?(?!data:)([^)'"?]+)['"]?(?:\?v=[0-9]+)*\)/gi;
  return css.replace(img, replace('url({cdn}{p1})', options));
}

function addCdnToHtml(html, options) {
  var css = /href="(.+\.css)"/gi;
  html = html.replace(css, replace('href="{p1}?v={buster}"', options));

  var js = /src="(.+\.js)"/gi;
  html = html.replace(js, replace('src="{p1}?v={buster}"', options));

  var images = /src="(.+\.(?:png|gif|jpg|jpeg))"/gi;
  html = html.replace(images, replace('src="{p1}?v={buster}"', options));
  return html;
}


module.exports = function(grunt) {

  function cdnify(src, files, options) {
    if (isCss(files.dest)) {
      grunt.file.write(files.dest, addCdnToCss(src, options));
    }
    else if (isHtml(files.dest, options.htmlExtension)) {
      grunt.file.write(files.dest, addCdnToHtml(src, options));
    } else {
      grunt.file.write(files.dest, addCdnToHtml(src, options));
    }
    grunt.log.writeln('Assets in "' + files.dest + '" have a CDN.');
  }

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('cdnify', 'Add CDN hosts to all your static assets', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      cdn: '',
      ignore: [],
      htmlExtension: 'html'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(files) {
      var src = files.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) { return grunt.file.read(filepath); })
      .join(grunt.util.normalizelf(''));

      try {
        cdnify(src, files, options);
      } catch (e) {
        grunt.log.error('ERROR:', e.message, e);
        grunt.fail.warn('Failed to add CDN to assets in: ' + files.dest);
      }
    });

  });
};
