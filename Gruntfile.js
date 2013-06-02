module.exports = function(grunt) {

  // Imports
  grunt.loadNpmTasks('grunt-casperjs');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');


  // Config
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    data: grunt.file.readJSON('src/datas/index.json'),

    open : {
      build: {
        path: 'http://127.0.0.1:9001'
      },
      dist: {
        path: 'dist/invoice.pdf'
      }
    },

    compass: {
      compile: {
        options: {
          sassDir: 'src/styles',
          cssDir: 'build/styles'
        }
      }
    },

    casperjs: {
      files: ["src/scripts/*.js"]
    },

    jade: {
      compile: {
        options: {
          data: '<%= data %>'
        },
        files: {
          "build/index.html": ["src/templates/*.jade"]
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'build'
        }
      }
    },

    watch: {
      main: {
        options: {
          nospawn: true,
        },
        files: ['src/**/*', '!src/bower_components'],
        tasks: ['build']
      }
    }
  });

  // Tasks
  grunt.registerTask('default', ['main', 'open:build', 'watch']);
  grunt.registerTask('main', ['connect', 'build']);
  grunt.registerTask('build', ['jade', 'compass']);
  grunt.registerTask('dist', ['main', 'casperjs', 'open:dist']);
};