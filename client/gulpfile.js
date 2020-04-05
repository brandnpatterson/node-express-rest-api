const { dest, series, src, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
  dist: './dist',
  scss: './src/scss'
};

function stylesTask() {
  return src(`${paths.scss}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(sourcemaps.write('/'))
    .pipe(dest(`${paths.dist}/css`));
}

function watchTask() {
  watch([`${paths.scss}/**/*.scss`], stylesTask);
}

exports.styles = stylesTask;
exports.default = series(stylesTask, watchTask);
