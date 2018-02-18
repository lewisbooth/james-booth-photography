var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('stylus', function () {
  return gulp.src('src/stylus/main.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('src/stylus'));
});

gulp.task('watch', function () {
  gulp.watch('src/stylus/**/*.styl', ['stylus']);
});

gulp.task('default', ['stylus', 'watch']);