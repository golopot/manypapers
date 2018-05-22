const gulp = require('gulp')
const less = require('gulp-less')

gulp.task('less', () => {
  gulp.src('./less/main.less')
    .pipe(less({
      paths: [__dirname],
    }))
    .pipe(gulp.dest('../dist/css'))
})

gulp.task('watch', ['default'], () => {
  gulp.watch(['./src/**', './less/**'], ['default'])
})

gulp.task('default', ['less'])
