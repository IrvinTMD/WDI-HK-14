module.exports = function(grunt) {

  grunt.initConfig({

    // annotate angular dependencies/services in preparation for minification
    ngAnnotate: {
      ngapp: {
        files: {
          'public/components/home/home-controller.js': ['public/components/home/home-controller.js']
        }
      }
    },

    // minify all js files into app.min.js
    uglify: {
      build: {
        files: {
          'public/dest/js/app.min.js': ['public/app.js', 'public/components/**/*.js']
        }
      }
    }

  });

  // load tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-annotate');

  // default tasks
  grunt.registerTask('default', ['ngAnnotate', 'uglify']);

}