'use strict';

var generators = require('yeoman-generator');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var chalk = require('chalk');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);

        this.option('skip-welcome-message', {
            desc: 'Skips the welcome message',
            type: Boolean
        });

    },

    prompting: function() {
        if (!this.options['skip-welcome-message']) {
            this.log(yosay('\'Allo \'allo! Out of the box I include the base framework of U9UpesnApp to start your app.'));
        }

        var prompts = [{
            type: 'input',
            name: 'appId',
            message: '轻应用ID',
            default: 'Demo'
        }, {
            type: 'input',
            name: 'appName',
            message: '轻应用名称',
            default: '示例应用'
        }, {
            type: 'input',
            name: 'appVersion',
            message: '轻应用版本号',
            default: '1.0.0'
        }];

        return this.prompt(prompts).then(function(answers) {
            this.appId = answers.appId;
            this.appName = answers.appName;
            this.appVersion = answers.appVersion;
        }.bind(this));
    },

    writing: {
        gulpfile: function() {
            this.fs.copyTpl(
                this.templatePath('gulpfile.js'),
                this.destinationPath('gulpfile.js'), {
                    appId: this.appId
                }
            );
            this.fs.copyTpl(
                this.templatePath('bower.json'),
                this.destinationPath('bower.json'), {
                    appId: this.appId,
                    appName: this.appName,
                    appVersion: this.appVersion
                }
            );
            this.fs.copy(
                this.templatePath('bowerrc'),
                this.destinationPath('.bowerrc')
            );
            this.fs.copy(
                this.templatePath('gitignore'),
                this.destinationPath('.gitignore')
            );
        },
        styles: function() {
            this.fs.copy(
                this.templatePath('style.css'),
                this.destinationPath('app/css/style.css')
            );
        },
        tpls: function() {
            this.fs.copyTpl(
                this.templatePath('home.html'),
                this.destinationPath('app/tpls/home.html'), {
                    appName: this.appName
                }
            );
        },
        scripts: function() {
            this.fs.copyTpl(
                this.templatePath('app.js'),
                this.destinationPath('app/js/app.js'), {
                    appId: this.appId
                }
            );
            this.fs.copyTpl(
                this.templatePath('HomeCtrl.js'),
                this.destinationPath('app/js/controllers/HomeCtrl.js'), {
                    appId: this.appId
                }
            );
            this.fs.copyTpl(
                this.templatePath('APPCONSTANTS.js'),
                this.destinationPath('app/js/utility/APPCONSTANTS.js'), {
                    appId: this.appId
                }
            );
        },
        html: function() {
            this.fs.copy(
                this.templatePath('index.html'),
                this.destinationPath('app/index.html')
            );
        },
        misc: function() {
            mkdirp('app/js/directives');
            mkdirp('app/js/filters');
            mkdirp('app/js/services');
            mkdirp('app/img');
        }
    },

    end: function() {
        var tips =
            '\n' +
            chalk.green('您的应用生成成功！') +
            '\n';

        this.log(tips);
    }
});
