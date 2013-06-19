'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var DeckjsGenerator = module.exports = function DeckjsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(DeckjsGenerator, yeoman.generators.Base);

DeckjsGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'confirm',
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: true
  }, {
    name: 'title',
    message: 'What is the title of your presentation?',
    default: 'Title'
  }, {
    name: 'description',
    message: 'Describe your presentation',
    default: 'My best presentation yet.'
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;
    this.title = props.title;
    this.description = props.description;

    cb();
  }.bind(this));
};

DeckjsGenerator.prototype.app = function app() {
  this.mkdir('js');

  this.template('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_setup.js', 'js/setup.js');
};

DeckjsGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
