module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    sass:
      styles:
        options:
          style: 'expanded'
        files:
          'lib/popover.css': 'src/popover.scss'
    coffee:
      spec:
        files:
          'spec/lib/popover-spec.js': 'spec/src/popover-spec.coffee'
      popover:
        files:
          'lib/popover.js': 'src/popover.coffee'
    watch:
      styles:
        files: ['src/*.scss']
        tasks: ['sass']
      scripts:
        files: ['src/**/*.coffee', 'spec/**/*.coffee']
        tasks: ['coffee']
    jasmine:
      pivotal:
        src: 'lib/**/*.js'
        options:
          specs: 'spec/lib/popover-spec.js'
          vendor: [
            'vendor/jquery-2.0.3.js',
            'vendor/simple-module/lib/module.js'
          ]

  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'

  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'test', ['sass', 'coffee', 'jasmine']
