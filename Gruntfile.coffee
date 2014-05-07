module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    sass:
      styles:
        options:
          style: 'expanded'
          bundleExec: true
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
        files: ['spec/lib/*.js']
        tasks: ['jasmine']
    jasmine:
      pivotal:
        src: 'lib/**/*.js'
        options:
          specs: 'spec/lib/popover-spec.js'
          vendor: [
            'vendor/bower/jquery/dist/jquery.min.js',
            'vendor/bower/simple-module/lib/module.js'
          ]

  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'

  grunt.registerTask 'default', ['test', 'watch']
  grunt.registerTask 'test', ['sass', 'coffee', 'jasmine']
