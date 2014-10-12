module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    sass:
      styles:
        options:
          style: 'expanded'
          bundleExec: true
          sourcemap: 'none'
        files:
          'styles/popover.css': 'styles/popover.scss'

    coffee:
      options:
        bare: true
      spec:
        files:
          'spec/popover-spec.js': 'spec/popover-spec.coffee'
      popover:
        files:
          'lib/popover.js': 'src/popover.coffee'

    watch:
      styles:
        files: ['styles/*.scss']
        tasks: ['sass']
      scripts:
        files: ['src/*.coffee', 'spec/*.coffee']
        tasks: ['coffee', 'umd']
      jasmine:
        files: [
          'styles/popover.css'
          'lib/popover.js'
          'specs/*.js'
        ],
        tasks: 'jasmine:test:build'

    jasmine:
      test:
        src: ['lib/popover.js']
        options:
          outfile: 'spec/index.html'
          styles: 'styles/popover.css'
          specs: 'spec/popover-spec.js'
          vendor: [
            'vendor/bower/jquery/dist/jquery.min.js'
            'vendor/bower/simple-module/lib/module.js'
          ]
    umd:
      all:
        src: 'lib/popover.js'
        template: 'umd.hbs'
        amdModuleId: 'simple-popover'
        objectToExport: 'popover'
        globalAlias: 'popover'
        deps:
          'default': ['$', 'SimpleModule']
          amd: ['jquery', 'simple-module']
          cjs: ['jquery', 'simple-module']
          global:
            items: ['jQuery', 'SimpleModule']
            prefix: ''


  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-umd'

  grunt.registerTask 'default', ['sass', 'coffee', 'umd', 'jasmine:test:build', 'watch']
  grunt.registerTask 'test', ['sass', 'coffee', 'jasmine:terminal']

