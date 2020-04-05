const { dest, parallel, series, src, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const minimist = require('minimist');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');

const paths = {
  dist: './dist',
  scss: './src/scss'
};

const knownFlags = {
  boolean: ['production'],
  default: {
    production: false
  }
};

const flags = minimist(process.argv.slice(2), knownFlags);

function stylesTask() {
  return src(`${paths.scss}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: flags.production ? 'compressed' : 'expanded' }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(sourcemaps.write('/'))
    .pipe(dest(`${paths.dist}/css`));
}

function scriptsTask() {
  return src(`${paths.js}/**/*.js`)
    .pipe(
      webpack({
        mode: flags.production ? 'production' : 'development',
        devtool: flags.production ? 'none' : 'eval-source-map',
        ...require('./webpack.config.js')
      })
    )
    .pipe(dest(`${paths.dist}/js`))
    .pipe(browserSync.stream());
}

function watchTask() {
  watch([`${paths.scss}/**/*.scss`], stylesTask);
}

function startServer() {
  browserSync.init({
    proxy: 'http://localhost:5000',
    notify: false,
    online: true
  });

  watchTask();
}

exports.styles = stylesTask;
exports.scripts = scriptsTask;
exports.build = series(stylesTask, scriptsTask);
exports.default = series(parallel(stylesTask, scriptsTask), startServer);
