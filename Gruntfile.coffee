module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    connect:
      uses_defaults: {}
    coffee:
      module:
        files:
          'lib/popover.js': 'src/popover.coffee'
          'spec/popover-spec.js': 'spec/popover-spec.coffee'
    watch:
      scripts:
        files: ['src/**/*.coffee', 'spec/**/*.coffee']
        tasks: ['coffee']
      jasmine : {
        files: ['lib/**/*.js', 'specs/**/*.js'],
        tasks: 'jasmine:pivotal:build'
      }
    jasmine:
      pivotal:
        src: 'lib/**/*.js'
        options:
          outfile: 'spec/index.html'
          specs: 'spec/popover-spec.js'
          vendor: [
            'vendor/jquery-2.0.3.js',
          ]

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'

  grunt.registerTask 'default', ['watch']
