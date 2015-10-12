import assign from 'object-assign';
import autoprefixer from 'gulp-autoprefixer';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import gutil from 'gulp-util';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import watchify from 'watchify';
import packageJson from './package.json';
import config from './scripts/config';

if(process.env.NODE_ENV) {
	console.log('Starting in ' + process.env.NODE_ENV + ' mode...');
} else {
	console.log('No environment variable set.');
	process.exit();
}

let deps = Object.keys(packageJson.dependencies);

// Adjust for slash modules
deps[deps.indexOf('react')] = 'react/addons';
deps[deps.indexOf('react-pure-render')] = 'react-pure-render/function';

gulp.task('scripts:lint', () => {
	return gulp.src(['gulpfile.babel.js', 'scripts/**/*.js'])
		.pipe(eslint({quiet: true}))
		.pipe(eslint.format())
	;
});

let mainB = watchify(browserify(assign({}, watchify.args, {
		entries: ['./scripts/main.js']}
	)), {poll: true, ignoreWatch: '**/*.js'})
	.transform(babelify)
	.external(deps)
	.on('log', gutil.log)
;

gulp.task('scripts:bundle:main', () => {
	return mainB.bundle()
		.on('error', function(error) {
			gutil.log(error.message);
			this.emit('end');
		})
		.pipe(source('./public/scripts/main.bundle.js'))
		.pipe(buffer())
		.pipe(gulpIf(config.uglify, uglify()))
		.pipe(gulp.dest(''))
	;
});

// Libs bundle
let libsB = watchify(
		browserify(assign({}, watchify.args)),
		{poll: true, ignoreWatch: '**/*.js'}
	)
	.require(deps)
	.on('log', gutil.log)
;

gulp.task('scripts:bundle:libs', () => {
	return libsB.bundle()
		.on('error', function(error) {
			gutil.log(error.message);
			this.emit('end');
		})
		.pipe(source('./public/scripts/libs.bundle.js'))
		.pipe(buffer())
		.pipe(gulpIf(config.uglify, uglify()))
		.pipe(gulp.dest(''))
	;
});

// Loader bundle
let loaderB = watchify(browserify(assign({}, watchify.args, {
		entries: ['./scripts/loader.js']}
	)), {poll: true, ignoreWatch: '**/*.js'}
	)
	.transform(babelify)
	.on('log', gutil.log)
;

gulp.task('scripts:bundle:loader', () => {
	return loaderB.bundle()
		.on('error', function(error) {
			gutil.log(error.message);
			this.emit('end');
		})
		.pipe(source('./public/scripts/loader.bundle.js'))
		.pipe(buffer())
		.pipe(gulpIf(config.uglify, uglify()))
		.pipe(gulp.dest(''))
	;
});

gulp.task('scripts:bundle', [
	'scripts:bundle:main', 'scripts:bundle:libs', 'scripts:bundle:loader'
]);

gulp.task('scripts', ['scripts:lint', 'scripts:bundle']);

gulp.task('styles', () => {
	return gulp.src('styles/styles.scss')
		.pipe(sass({outputStyle: config.styles}))
		.on('error', sass.logError)
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('public/styles'))
	;
});

gulp.task('watch', () => {
	gulp.watch('styles/**/*.scss', ['styles']);
	gulp.watch(
		['gulpfile.babel.js', 'scripts/**/*.js'],
		() => {runSequence('scripts:lint', 'scripts:bundle');}
	);
});

gulp.task('default', ['styles', 'scripts', 'watch']);