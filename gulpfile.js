// Import the dependencies needed
const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      del = require('del'),
      // sass = require('gulp-sass'),
      cleanCSS = require('gulp-clean-css'),
      rename = require('gulp-rename'),
      purgecss = require('gulp-purgecss');
      // browserSync = require('browser-sync').create();

// Set where to find the files/folders and what to rename them
const folders = {
  build: {
    main: 'build',
    css: 'css',
    js: 'js',
  },
  prod: {
    main: 'prod',
    css: 'styles',
    js: 'scripts',
  },
}

// Clears the production folders and files before re-building
const clear = () => {
  return del(['prod/**']);
};

// Runs the processes on styling
const css = (cb) => {
  gulp.src(`./${folders.build.main}/${folders.build.css}/styles.css`)
    // 1st - Prefix css for browser compatibility
    .pipe(autoprefixer())
    // 2nd - Minify css to a single line and imported files code into file itself
    .pipe(cleanCSS({debug: true, compatibility: 'ie8'}))
    // 3rd - Rename file to {filename}.min.css
    .pipe(rename(function(path) {
      path.extname = ".min.css";
    }))
    // 4th - Delete unused css styles - WARNING a pain for dynamic class names. 
    .pipe(purgecss({content: [`./${folders.build.main}/**/*.html`]}))
    // - Push new code into distributable folder
    .pipe(gulp.dest(`./${folders.prod.main}/${folders.prod.css}/`))      
    // .pipe(browserSync.stream());
  cb();
};

// Runs the processes on scripts
const js = (cb) => {
 
  cb();
};

// In series (one after the other)
// Clears first
// Runs css and js builds in parallel as they shouldnt need to rely on one-another
exports.default = gulp.series(
  clear, 
  gulp.parallel(css, js)
);