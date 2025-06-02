var gulp        = require('gulp');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
var coffee      = require('gulp-coffee');
var less        = require('gulp-less');
var connect     = require('gulp-connect');
var streamqueue = require('streamqueue');

gulp.task('webserver', function() {
  connect.server({
    host: '0.0.0.0',
    port: 3000
  });
});

gulp.task('less', function() {
  gulp.src('app.less')
    .pipe(less())
    .pipe(gulp.dest('assets'))
    .pipe(connect.reload());
});

gulp.task('js', function() {
  var app = gulp.src('app.coffee')
    .pipe(coffee({ bare: true }));
  
  var includes = gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/papaparse/papaparse.js'
  ]);

  streamqueue({ objectMode: true }, includes, app)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('assets'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('app.less', ['less']);
  gulp.watch('app.coffee', ['js']);
});

gulp.task('default', ['less', 'js', 'webserver', 'watch']);