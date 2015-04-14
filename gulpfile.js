/* eslint-disable strict, global-strict */
'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var del = require('del');

// Paths
var appPath = 'app';
var distPath = 'dist';

var paths = {
  app: {
    html: appPath + '/**/*.{html,htm}',
    js: appPath + '/js/**/*.js',
    css: appPath + '/css/**/*.css',
    img: appPath + '/img/**/*',
    fonts: appPath + '/fonts/*.{eot,svg,ttf,woff}',
    icons: appPath + '/icons/*',
    audio: appPath + '/audio/*'
  },
  dist: {
    fonts: distPath + '/fonts',
    icons: distPath + '/icons',
    audio: distPath + '/audio',
    img: distPath + '/img'
  }
};

// Options

var options = {
  autoprefixer: {
    browsers: [
      '> 2%',
      'last 2 versions',
      'Firefox ESR',
      'ie >= 9'
    ],
    cascade: false
  },
  htmlmin: {
    removeComments: true,
    collapseWhitespace: true
  },
  imagemin: {
    progressive: true,
    svgoPlugins: [
      {removeViewBox: false}
    ],
    use: []
  }
};

// linters

gulp.task('lintjs', function() {
  return gulp.src(paths.app.js)
    .pipe($.eslint())
    .pipe($.eslint.format());
});

gulp.task('lintcss', function() {
  return gulp.src(paths.app.css)
    .pipe($.csslint())
    .pipe($.csslint.reporter());
});

// clean

gulp.task('clean', function() {
  del([
    distPath + '/*'
  ]);
});

// compile

gulp.task('compile', function() {
  var assets = $.useref.assets();

  return gulp.src(paths.app.html)
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.autoprefixer(options.autoprefixer)))
    .pipe($.if('*.css', $.csso()))
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe($.if('*.html', $.htmlmin(options.htmlmin)))
    .pipe(gulp.dest(distPath));
});

gulp.task('img', function() {
  return gulp.src(paths.app.img)
      .pipe($.imagemin(options.imagemin))
      .pipe(gulp.dest(paths.dist.img));
});

gulp.task('fonts', function() {
  return gulp.src(paths.app.fonts)
    .pipe($.flatten())
    .pipe(gulp.dest(paths.dist.fonts));
});

gulp.task('icons', function() {
  return gulp.src(paths.app.icons)
    .pipe(gulp.dest(paths.dist.icons));
});

gulp.task('audio', function() {
  return gulp.src(paths.app.audio)
    .pipe(gulp.dest(paths.dist.audio));
});

// Browser sync

gulp.task('browser-sync', function() {
  return browserSync({
    server: {
      baseDir: distPath,
      index: 'index.html'
    },
    browser: 'chrome'
  });
});

gulp.task('browser-sync-dev', function() {
  return browserSync({
    server: {
      baseDir: appPath,
      index: 'index.html'
    },
    browser: 'chrome'
  });
});

// Main gulp tasks

// builds all files and runs from dist directory
gulp.task('default', ['lintjs', 'compile', 'img', 'fonts', 'icons', 'audio', 'browser-sync']);

// skips building phase and runs from dist directory
gulp.task('run', ['browser-sync']);

// runs from app directory
gulp.task('dev', ['browser-sync-dev'], function() {
  // watch for JS changes
  gulp.watch(paths.app.js, ['lintjs', browserSync.reload]);

  // watch for CSS changes
  gulp.watch(paths.app.css, browserSync.reload);

  // watch for HTML changes
  gulp.watch(paths.app.html, browserSync.reload);
});
