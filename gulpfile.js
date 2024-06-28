const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// Task to minify HTML
gulp.task('minify-html', () => {
  return gulp
    .src('src/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'))
});

// Task to compile and minify SCSS
gulp.task('minify-css', () => {
  return gulp
    .src('src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/styles'));
});

// Task to optimize images
gulp.task('images', () => {
  return gulp
    .src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

// Task to start the server and watch for changes
gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });

  gulp
    .watch('src/includes/*.pug', gulp.series('minify-html'))
    .on('change', browserSync.reload);
  gulp
    .watch('src/styles/*.scss', gulp.series('minify-css'))
    .on('change', browserSync.reload);
  gulp
    .watch('src/img/*', gulp.series('images'))
    .on('change', browserSync.reload);
});

// Default task
gulp.task(
  'default',
  gulp.series('minify-html', 'minify-css', 'images', 'serve')
);
