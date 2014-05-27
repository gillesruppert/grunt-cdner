/*
 * grunt-cdnify
 * https://github.com/gillesruppert/grunt-cdnify
 *
 * Copyright (c) 2014 Gilles Ruppert
 * Licensed under the MIT license.
 */

'use strict';

var interpolate = require('interpolate');
var path = require('path');

function hasTrailingSlash(p) {
  return p.charAt(p.length - 1) === '/';
}

function hasLeadingSlash(p) {
  return p.charAt(0) === '/';
}

function removeTrailingSlash(p) {
  if (hasTrailingSlash(p)) {
    return p.slice(0, -1);
  }
  return p;
}

function removeLeadingSlash(p) {
  if (hasLeadingSlash(p)) {
    return p.slice(1);
  }
  return p;
}

function isPathAbsolute(p) {
  // absolute path start with: /
  return p.charAt(0) === '/';
}

function hasHost(p) {
  var host = /^https?:\/\/*/;
  return host.test(p) || p.indexOf('//') === 0 ;
}

function isCss(filepath) {
  return (/\.css$/).test(filepath);
}

function isHtml(filepath, extension) {
  var htmlTest = new RegExp('\\.' + extension + '$', 'gi');
  return htmlTest.test(filepath);
}

function buildUrl(url, wwwPath, options) {
  if (hasHost(url)) {
    return url;
  } else if (isPathAbsolute(url)) {
    return options.cdn + url;
  } else {
    // TODO: create relative path
    var p = path.join(wwwPath, url);
    return options.cdn + '/' + p;
  }
}

function replace(replacer, wwwPath, options) {
  return function _replace(match, p1) {
    if (!options.ignore.some(function (ignore) { return match.indexOf(ignore) > -1; })) {
      var url = buildUrl(p1, wwwPath, options);
      return interpolate(replacer, { url: url });
    } else {
      return match;
    }
  };
}

function addCdnToCss(css, wwwPath, options) {
  var img = /url\(['"]?(?!data:)([^)'"?]+)['"]?(?:\?v=[0-9]+)*\)/gi;
  return css.replace(img, replace('url({url})', wwwPath, options));
}

function addCdnToHtml(html, wwwPath, options) {
  var css = /href="(.+\.css)"/gi;
  html = html.replace(css, replace('href="{url}"', wwwPath, options));

  var js = /src="(.+\.js)"/gi;
  html = html.replace(js, replace('src="{url}"', wwwPath, options));

  var images = /src="(.+\.(?:png|gif|jpg|jpeg))"/gi;
  html = html.replace(images, replace('src="{url}"', wwwPath, options));
  return html;
}

function buildWwwPath(p, options) {
  var wwwPath = path.dirname(p);
  if (wwwPath.indexOf(options.root) === 0) {
    wwwPath = wwwPath.slice(options.root.length);
  }
  return wwwPath;
}


module.exports = function(grunt) {

  function cdnify(src, files, options) {
    // wwwPath is the absolute path of the file, relative to the server root,
    // i.e. asset/css can be pointed to by http://example.com/asset/css
    var wwwPath = buildWwwPath(files.dest, options);

    if (isCss(files.dest)) {
      grunt.file.write(files.dest, addCdnToCss(src, wwwPath, options));
    }
    else if (isHtml(files.dest, options.htmlExtension)) {
      grunt.file.write(files.dest, addCdnToHtml(src, wwwPath, options));
    } else {
      grunt.file.write(files.dest, addCdnToHtml(src, wwwPath, options));
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
      htmlExtension: 'html',
      root: ''
    });

    // remove trailing slash from cdn
    options.cdn = removeTrailingSlash(options.cdn);
    options.root = removeLeadingSlash(removeTrailingSlash(options.root));

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
