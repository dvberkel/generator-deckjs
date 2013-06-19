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
	    },
	};

	helpers.mockPrompt(this.app, {
	    'someOption': 'Y',
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
