const { dest, parallel, series, src, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');

const paths = {
  dist: './dist',
  js: './src/js',
  scss: './src/scss'
};

function stylesTask(outputStyle) {
  return src(`${paths.scss}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(sourcemaps.write('/'))
    .pipe(dest(`${paths.dist}/css`))
    .pipe(browserSync.stream());
}

function scriptsTask(webpackConfig) {
  return src(`${paths.js}/**/*.js`)
    .pipe(
      webpack({
        ...webpackConfig,
        ...require('./webpack.config.js')
      })
    )
    .pipe(dest(`${paths.dist}/js`))
    .pipe(browserSync.stream());
}

function stylesBuild() {
  return stylesTask('compressed');
}

function stylesDev() {
  return stylesTask('expanded');
}

function scriptsBuild() {
  return scriptsTask({
    mode: 'production'
  });
}

function scriptsDev() {
  return scriptsTask({
    mode: 'development'
  });
}

function watchTask() {
  watch(
    [`${paths.scss}/**/*.scss`, `${paths.js}/**/*.js`],
    series(parallel(stylesDev, scriptsDev))
  );
}

function startServer() {
  browserSync.init({
    proxy: 'http://localhost:5000',
    notify: false,
    online: true
  });

  watchTask();
}

exports.styles = stylesDev;
exports.scripts = scriptsDev;
exports.build = series(stylesBuild, scriptsBuild);
exports.default = series(parallel(stylesDev, scriptsDev), startServer);
