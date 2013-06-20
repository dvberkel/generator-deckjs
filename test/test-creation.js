/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('deckjs generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('deckjs:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      'js/setup.js',
      'package.json',
      'bower.json',
      'README.md',
      'index.html',
      'SpecRunner.html',
      'spec/namespaceSpec.js',
      'js/namespace.js',
    ];

    helpers.mockPrompt(this.app, {
      'someOption': 'Y',
      'title': 'The winding road to eloquence',
      'description': 'A tale of love lost',
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
