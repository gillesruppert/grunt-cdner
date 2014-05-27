# grunt-cdnify

> Add CDN host to the path of all your static assets

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cdnify --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cdnify');
```

## The `cndify` task

### Overview
In your project's Gruntfile, add a section named `cdnify` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cdnify: {
    options: {
      cdn: '//example.com'
      ignore: [],
      root: 'dest',
      htmlExtension: 'html'
    },
    your_target: {
      // Target-specific file lists and/or options go here.
      // make sure you have separate file lists for your CSS and HTML files
    }
  }
})
```

### Options

#### options.cdn
Type: `String`
Default value: `''`

A string value that is added as a host to all your static assets.

#### options.htmlExtension
Type: `String`
Default value: `'html'`

The extension of html assets. This is useful if you use a templating language
for your html where you want to cachebust assets, i.e. `'handlebars'`

#### options.ignore
Type: `Array`
Default value: `[]`

Array of strings that if found in the path are **not** modified. This is useful if
you have some assets that are not hosted on a CDN.

#### options.root
Type: `String`
Default value: `''`

String that represents the root of the server, i.e. if your files are served out
of a `dist` directory, you need to set the root to `dist`. This is to resolve 
relative paths correctly.

### Usage Examples

#### options.cdn
```js
grunt.initConfig({
  cdnify: {
    options: {
      cdn: '//my.cdn.example.com',
      ignore: [
        '//3rd-party.cdn.example.com'
      ],
      htmlExtension: 'htm',
      root: 'dest'
    },
    build: {
      files: {
        'dest/default_options.css': ['src/testing.css'],
        'dest/default_options.htm': ['src/testing.htm']
      }
    }
  }
})
```

In this example, we defined the `cdn` option that will be added to all the
static paths. URLs that contain `//3rd-party.cdn.example.com` are *not*
modified. So if the `testing.css` or `testing.htm` files have content such as 

```css
h1 {
  background-image: url('testing.png');
}
h2 {
  background-image: url('//3rd-party.cdn.example.com/testing.png');
}
```
or
```html
<script src="testing.js"></src>
<script src="//3rd-party.cdn.example.com/testing.js"></src>
<link href="testing.css" rel="stylesheet">
<img src="testing.png">
```
the generated result would be

```css
h1 {
  background-image: url('//my.cdn.example.com/testing.png');
}
h2 {
  background-image: url('//3rd-party.cdn.example.com/testing.png');
}
```
or
```html
<script src="//my.cdn/example.com/testing.js"></src>
<script src="//3rd-party.cdn.example.com/testing.js"></src>
<link href="//my.cdn/example.com/testing.css" rel="stylesheet">
<img src="//my.cdn/example.com/testing.png">
```

**N.B: if root hadn't been set to `dest`, the resulting path would be
`//3rd-party.cdn.example.com/dest/testing.png` for a path of `testing.png`!!!**


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

 * 2014-05-27   v0.1.0   initial release
