/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var fs      = require('fs');
var _       = require('lodash');
var expect  = require('chai').expect;

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

    it('files have correct content', function (done) {
	var expectations = {
	    'package.json' : function(content) {
		var pkg = JSON.parse(content);
		expect(pkg.name).to.equal('presentation-the-winding-road-to-eloquence');
		expect(pkg.description).to.equal('A tale of love lost');
	    },
	    'bower.json' : function(content) {
		var pkg = JSON.parse(content);
		expect(pkg.name).to.equal('presentation-the-winding-road-to-eloquence');
		expect(pkg.dependencies['deck.js']).to.equal('latest');
		expect(pkg.dependencies['jasmine']).to.equal('latest');
	    },
	    'README.md' : function(content) {
		var title = /^Presentation The winding road to eloquence/;
		expect(!!content.match(title)).to.equal(true);
	    },
	    'index.html' : function(content) {
		var title = /<title>The winding road to eloquence<\/title>/;
		var h1 = /<h1>The winding road to eloquence<\/h1>/
		expect(!!content.match(title)).to.equal(true);
		expect(!!content.match(h1)).to.equal(true);
	    },
	    'spec/namespaceSpec.js' : function(content) {
		var describe = /describe\('A namespace', function\(\)/;
		var it = /it\('should be defined', function\(\)/;
		var expectation = /expect\(presentation\).toBeDefined\(\);/;
		expect(!!content.match(describe)).to.equal(true);
		expect(!!content.match(it)).to.equal(true);
		expect(!!content.match(expectation)).to.equal(true);
	    },
	    'js/namespace.js' : function(content) {
		var window = /window.presentation =/;
		var validReturn = /return presentation;/;
		expect(!!content.match(window)).to.equal(true);
		expect(!!content.match(validReturn)).to.equal(true);
	    },
	};

	helpers.mockPrompt(this.app, {
	    'title': 'The winding road to eloquence',
	    'description': 'A tale of love lost',
	});
	this.app.options['skip-install'] = true;
	this.app.run({}, function () {
	    var base = path.join(__dirname, 'temp');
	    for (var subject in expectations) {
		var file = path.join(base, subject);
		expectations[subject](fs.readFileSync(file, 'utf8'));
	    }
	    done();
	});
    });
});
