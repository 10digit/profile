module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    bower: {
        install: {
            options: {
                install: true,
                verbose: true
            }
        }
    },
    jade: {
        main: {
            options: {
            },
            files: grunt.file.expandMapping(['*.jade'], './', {
                rename: function(base, path){
                    return base + path.replace(/\.jade$/, '.html');
                }
            })
        }
    },
    concat: {
        main: {
            src: [
                'lib/angular/angular.js', 
                'lib/angular-mocks/angular-mocks.js', 
                'lib/angular-sanitize/angular-sanitize.js', 
                'bower_components/angular-ui-utils/modules/mask/mask.js',
                'bower_components/angular-ui-utils/modules/validate/validate.js',
                'lib/10digit-validation/validation.js',
                'lib/10digit-utils/utils.js',
                'lib/angular-ui-bootstrap/src/tooltip/tooltip.js',
                'lib/angular-ui-bootstrap/src/modal/modal.js',
                'lib/angular-ui-bootstrap/src/position/position.js',
                'lib/angular-ui-bootstrap/src/bindHtml/bindHtml.js',
                'profile.js'
            ],
            dest: 'test/build.js'
        }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'profile.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jasmine : {
      src : 'test/build.js',
      options : {
        specs : 'test/spec.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-task');

  grunt.registerTask('setup', ['bower', 'jade']);
  grunt.registerTask('test', ['concat', 'jshint', 'jasmine']);
  grunt.registerTask('default', ['setup', 'test']);

};
