var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream:true
		}))
});

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
	})
});

gulp.task('useref', function(){
	var assets = useref.assets();

	return gulp.src('app/*.html')
		.pipe(assets)
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('dist'));
});
