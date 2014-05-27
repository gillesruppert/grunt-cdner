'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.cdnify = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  cdn_option_css: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/cdn_option.css');
    var expected = grunt.file.read('test/expected/cdn_option.css');
    test.equal(actual, expected, 'CSS should have images prefixed with cdn option');

    test.done();
  },
  cdn_option_html: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/cdn_option.html');
    var expected = grunt.file.read('test/expected/cdn_option.html');
    test.equal(actual, expected, 'HTML should have assets prefixed with cdn option');

    test.done();
  },

  ignore_option_css: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/ignore_option.css');
    var expected = grunt.file.read('test/expected/ignore_option.css');
    test.equal(actual, expected, 'css url paths in the ignore option should be prefixed with the cdn');

    test.done();
  },
  ignore_option_html: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/ignore_option.html');
    var expected = grunt.file.read('test/expected/ignore_option.html');
    test.equal(actual, expected, 'asset url paths in the ignore option should not be prefixed with the cdn');

    test.done();
  },

  root_option_css: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/root_option.css');
    var expected = grunt.file.read('test/expected/root_option.css');
    test.equal(actual, expected, 'relative urls in the css should have the correct base url');

    test.done();
  },
  root_option_html: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/root_option.html');
    var expected = grunt.file.read('test/expected/root_option.html');
    test.equal(actual, expected, 'relative urls in the html should have the correct base url');

    test.done();
  },

  cdn_with_path_css: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/cdn_with_path.css');
    var expected = grunt.file.read('test/expected/all_opts.css');
    test.equal(actual, expected, 'cdn with paths should work fine (css)');

    test.done();
  },
  cdn_with_path_html: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/cdn_with_path.html');
    var expected = grunt.file.read('test/expected/all_opts.html');
    test.equal(actual, expected, 'cdn with paths should work fine (html)');

    test.done();
  },

  cdn_with_trailing_slash_css: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/cdn_with_trailing_slash.css');
    var expected = grunt.file.read('test/expected/all_opts.css');
    test.equal(actual, expected, 'cdn with trailing slash should work fine (css)');

    test.done();
  },
  cdn_with_trailing_slash_html: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/cdn_with_trailing_slash.html');
    var expected = grunt.file.read('test/expected/all_opts.html');
    test.equal(actual, expected, 'cdn with trailing slash should work fine (html)');

    test.done();
  },

  root_with_trailing_slash_css: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/root_with_trailing_slash.css');
    var expected = grunt.file.read('test/expected/all_opts.css');
    test.equal(actual, expected, 'root with trailing slash should work fine (css)');

    test.done();
  },
  root_with_trailing_slash_html: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/root_with_trailing_slash.html');
    var expected = grunt.file.read('test/expected/all_opts.html');
    test.equal(actual, expected, 'root with trailing slash should work fine (html)');

    test.done();
  },

};
