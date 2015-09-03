var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var eol = require('gulp-eol');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

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
		.pipe(gulpIf('*.css', minifyCss()))
		.pipe(gulpIf('*.js', uglify()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(eol('\n'))
		.pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
		.pipe(cache(imagemin({
			interlaced:true
			})))
		.pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean', function(callback){
	del('dist');
	return cache.clearAll(callback); // make sure images are processed again (clear cache), since they were deleted by this task...
});

gulp.task('clean:dist', function(callback){
	del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback)
});

gulp.task('build', function(callback) {
	runSequence('clean:dist',
		['sass', 'useref', 'images', 'fonts'],
		callback)
});
