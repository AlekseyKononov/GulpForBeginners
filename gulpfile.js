var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
	gulp.src('source-files')
		.pipe(sass())
		.pipe(gulp.dest('destination'))
});
