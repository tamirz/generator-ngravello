'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var NgravelloGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic ravello angular generator.'));

    var prompts = [{
      name: 'ngAppName',
      message: 'How do you want to call your App?'
    }];

    this.prompt(prompts, function (props) {
      this.ngAppName = props.ngAppName;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('assets');
    this.mkdir('assets/fonts');
    this.mkdir('assets/images');
    this.mkdir('assets/styles');
    this.mkdir('app/pages');
    this.mkdir('app/proxies');
    this.mkdir('app/services');
    this.mkdir('app/transformations');
    this.mkdir('app/commons');
    this.mkdir('app/commons/directives');
    this.mkdir('app/commons/entities');
    this.mkdir('app/commons/templates');
    this.mkdir('app/commons/utiles');
    
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('index.html', 'app/index.html');
    this.template('_config.json', 'config.json');
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('ravello-logo-small.png', 'assets/images/ravello-logo-small.png');
    this.copy('ravello-logo-small.png', 'assets/images/ravello-logo.png');
  },

  runtime: function () {
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
  }
});

module.exports = NgravelloGenerator;
