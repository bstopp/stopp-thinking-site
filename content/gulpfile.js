'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourceMaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');

var srcFolder = './src/main/content/';
var targetFolder = './target/classes/';
var clientLibFolder = 'etc/clientlibs/stopp-thinking';
var srcClientLibFolder = 'jcr_root/' + clientLibFolder;

var baseFolder = srcFolder + srcClientLibFolder;
var buildFolder = targetFolder + clientLibFolder;

gulp.task('sass', function(){
    var sassStream = sass({
    	errLogToConsole: true
    });	

	return gulp.src(baseFolder + '/scss/**/*.scss')
		.pipe(sourceMaps.init())
		.pipe(sassStream)
		.pipe(sourceMaps.write('.'))
		.pipe(gulp.dest(buildFolder + '/css'));
});

gulp.task('sass-only', function() {
    var sassStream = sass({
        errLogToConsole: true
    }); 

    return gulp.src(baseFolder + '/scss/**/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sassStream)
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest(baseFolder + '/css'));
});

gulp.task('js', function(){
	//adding custom error handler so the watcher doesn't quit on error
	var annotateStream = ngAnnotate({
		remove: true,
		add: true,
		single_quotes: true
	});
	annotateStream.on('error',function(e){
		console.log(e);
		annotateStream.end();
	});

	return gulp.src(baseFolder + '/js/**/*.js')
        .pipe(annotateStream)
        .pipe(gulp.dest(buildFolder + '/js'));
});


gulp.task('copy-views', function(){
	gulp.src([baseFolder + '/js/**/*.html'], { dot: true }).pipe(gulp.dest(buildFolder + '/js'));
});

gulp.task('copy-scss', function(){
	gulp.src([baseFolder + '/scss/**/*'], { dot: true }).pipe(gulp.dest(buildFolder + '/scss'));
});

gulp.task('copy-fonts', function(){
	gulp.src([baseFolder + '/fonts/**/*'], { dot: true }).pipe(gulp.dest(buildFolder + '/fonts'));
});

gulp.task('copy-images', function(){
	gulp.src([baseFolder + '/images/**/*'], { dot: true }).pipe(gulp.dest(buildFolder + '/images'));
});

gulp.task('copy-misc', function(){
	gulp.src([baseFolder + '/.content.xml'], { dot: true }).pipe(gulp.dest(buildFolder));	
});

// Rerun the task when a file changes
gulp.task('watch', ['build'], function() {
	gulp.watch(baseFolder + '/js/**/*.html', ['copy-views']);
	gulp.watch(baseFolder + '/js/**/*.js', ['js']);
	gulp.watch(baseFolder + '/scss/**/*', ['sass']);
	gulp.watch(baseFolder + '/images/**/*', ['copy-images']);
	gulp.watch(baseFolder + '/fonts/**/*', ['copy-fonts']);
});

gulp.task('copy-assets', [
	'copy-views',
	'copy-scss',
	'copy-fonts',
	'copy-images',
	'copy-misc']);
gulp.task('build', ['sass', 'js', 'copy-assets']);
gulp.task('default', ['build']);