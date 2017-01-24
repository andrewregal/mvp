'use strict';
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

var paths = {
  src: {
    scripts: ['client/app/**/*.js'],
    html: ['client/app/**/*.html', 'client/index.html'],
    styles: ['client/styles/styles.css']
  },
  server: 'server/server.js'
};

gulp.task('serve', function() {
  nodemon({
    script: paths.server
  });
});

gulp.task('start', ['serve'], function() {
  browserSync.init({
    notify: true,
    files: paths.src.scripts.concat(paths.src.html, paths.src.style),
    proxy: 'localhost:8080/#/'
  });
});
