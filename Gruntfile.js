'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
   
    cssmin: { //Compress CSS files.
      build:{
        files: {
          'public/css/style.min.css': 'public/css/style.css'
      }
        
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', [
    'develop',
    'watch','cssmin'
  ]);
};
