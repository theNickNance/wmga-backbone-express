// Configuration for Copy task(s)
// Copies specified folders/files to specified destination
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('copy', {
    dist: {
      files: [{
        expand: true,
        cwd: '<%= yeogurt.client %>/',
        dest: '<%= yeogurt.dist %>/client/',
        src: [
          'bower_components/requirejs/require.js',
          'styles/fonts/**/*.{woff,woff2,otf,ttf,eot,svg}',
          'styles/**/*.{png,jpg,gif}',
          'images/**/*.{webp}',
          '!*.js',
          '*.{ico,png,txt}',
          '*.html'
        ]
      }, {
        expand: true,
        cwd: '<%= yeogurt.server %>/templates/',
        dest: '<%= yeogurt.tmp %>',
        src: [
          'index.html'
        ]
      }, {
        expand: true,
        cwd: './',
        dest: '<%= yeogurt.dist %>/',
        src: [
          '<%= yeogurt.server %>/**/*',
          'server.js',
          'package.json'
        ]
      }]
    }
  });

};

module.exports = taskConfig;
