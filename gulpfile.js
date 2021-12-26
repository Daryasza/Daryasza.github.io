const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;
const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');


task('clean', () => {
  return src( `${DIST_PATH}/**/*`, { read: false }).pipe( rm() )
})

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
  .pipe(dest(DIST_PATH));
})

task('copy:img', () => {
  return src(`${SRC_PATH}/img/**/*`).pipe(dest(DIST_PATH + "/img"));
})

task('copy:video', () => {
  return src(`${SRC_PATH}/video/*.mp4`).pipe(dest(DIST_PATH + "/video"));
})

task('styles', ()=> {
  return src(STYLE_LIBS.concat(['src/styles/main.scss']))
  .pipe(concat('main.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(gulpif(env === 'prod', autoprefixer({
    cascade: false
  })))
  .pipe(gulpif(env === 'prod', gcmq()))
  .pipe(gulpif(env === 'prod', cleanCSS()))
  .pipe(dest(DIST_PATH + "/styles"))
  .pipe(browserSync.reload({ stream: true }));
});

task('scripts', () => {
  return src(JS_LIBS.concat(['src/js/*.js', '!src/js/main.js']))
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.js', {newLine: ';'}))
  .pipe(gulpif(env === 'prod', babel({
    presets: ['@babel/env']
  })))
  .pipe(gulpif(env === 'prod', uglify()))
  .pipe(gulpif(env === 'dev', sourcemaps.write()))
  .pipe(dest(DIST_PATH + "/js"))
  .pipe(browserSync.reload({ stream: true }));
});

task('server', () => {
  browserSync.init({
    server: {
      baseDir: "./src"
    },
    open: false
  });
});

task('watch', () => {
  watch('./src/scripts/*.js', series('scripts'));
  watch('./src/*.html', series('copy:html'));
  watch('./src/styles/**/*.scss', series('styles'));
});


task('default', 
  series(
    'clean', 
  parallel('copy:html','copy:img','copy:video', 'styles', 'scripts'), 
  parallel('watch','server')
  )
);

task('build',
 series(
   'clean',
   parallel('copy:html', 'copy:img','copy:video', 'styles', 'scripts'))
);