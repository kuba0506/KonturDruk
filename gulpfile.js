/**
 * REQUIRED PLUGINS
 */
var gulp = require('gulp'),
	gutil = require('gulp-util'), //dodatkowe narzędzia jak log
	compass = require('gulp-compass'),
	changed = require('gulp-changed'),
	// cxoncat  = require('gulp-cxoncat'),
	include  = require('gulp-include'),
	imagemin  = require('gulp-imagemin'),
	connect  = require('gulp-connect'), //tworzy serwer
	rename  = require('gulp-rename'), 
	minify = require('gulp-uglify');

/**
 * Sources
 */
var jsSources = [
	'components/scripts/_main.js'
	],

	sassSources = ['components/sass/styles.scss'],

	htmlSources = ['builds/development/*.html'],

	imgSources = './components/images/**/*',

	imgDestination = './builds/development/images';
	// imgDestination = ['./builds/development/images'];

//Proste logowanie
gulp.task('log', function () {
	gutil.log('Błąd!!');
});

//Łączenie JS
gulp.task('js',function () {
	gulp.src(jsSources)
	.pipe(include())
		.on('error', gutil.log)
	// .pipe(browserify())
	.pipe(rename('scripts.js'))
	.pipe(gulp.dest('builds/development/js'))
	.pipe(connect.reload())
	// .pipe(minify())
});

//Sass do CSS
gulp.task('sass', function () {
	gulp.src(sassSources)
	.pipe(compass({
		css: 'builds/development/css/',
		sass: 'components/sass/',
		image: 'builds/development/images',
		style: 'compact'
	}))
	.on('error', gutil.log)
	.pipe(gulp.dest('builds/development/css'))
	.pipe(connect.reload())
});

//Serwer - connect
gulp.task('connect', function () {
	connect.server({
		root: 'builds/development/',
		livereload: true
	});
});

//Html
gulp.task('html', function () {
	gulp.src(htmlSources)
	.pipe(connect.reload());
});

//Zdjęcia
gulp.task('img', function () {
	gulp.src(imgSources)
	.pipe(changed(imgDestination))
	.pipe(imagemin())
	.pipe(gulp.dest(imgDestination));
});

// ////////////////////////////////////////////////
// Build Task
// // /////////////////////////////////////////////
//usuwa wszystko za katalogu build
gulp.task('build:cleanfolder', function(callback) {
	del([
		'build/**'
	], callback);
});

//buduje katalog na wszystkie pliki
gulp.task('build:copy' , ['build:cleanfolder'],  function(){
	return gulp.src('app/**/*')
	.pipe(gulp.dest('build'));
});

//usuwa niepotrzebe pliki z katalogu build
gulp.task('build:remove' ,['build:copy'] ,function(callback) {
	del([
		'build/styles/',
		'build/js/!(*.min.js)'
		], callback);
});

gulp.task('build', ['build:copy', 'build:remove']);


/**
 * Watch task
 */
gulp.task('watch', function () {
	gulp.watch(htmlSources, ['html']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/**/*.scss', ['sass']);
	gulp.watch(imgSources, ['img']);
});

/**
 * Default task
 */
gulp.task('default', ['html', 'js', 'sass', 'img', 'connect', 'watch']);
// gulp.task('default', ['html', 'js', 'connect', 'watch']);
