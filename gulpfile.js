var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
	gulp.src('app/sass/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
});
