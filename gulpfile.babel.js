import assign from 'object-assign';
import autoprefixer from 'gulp-autoprefixer';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import collapse from 'bundle-collapser';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import jshint from 'gulp-jshint';
import jshintStylish from 'jshint-stylish';
import sass from 'gulp-sass';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import watchify from 'watchify';
import yargs from 'yargs';
import packageJson from './package.json';

let dependencies = Object.keys(packageJson.dependencies);
let settings = {};

if(yargs.argv.p) {
	settings = {
		uglify: true,
		styles: 'compressed'
	};
} else {
	settings = {
		uglify: false,
		styles: 'nested'
	};
}

gulp.task('lint', () => {
	return gulp.src(['gulpfile.babel.js', 'scripts/**/*.js'])
		.pipe(jshint({esnext: true}))
		.pipe(jshint.reporter(jshintStylish))
	;
});

gulp.task('main', () => {
	return browserify(['./scripts/main.js'])
		.transform(babelify)
		.external(dependencies)
		.bundle()
		.pipe(source('./scripts/main.bundle.js'))
		.pipe(buffer())
		.pipe(gulpIf(settings.uglify, uglify()))
		.pipe(gulp.dest(''))
	;
});

gulp.task('libs', () => {
	return browserify()
		.require(dependencies)
		.bundle()
		.pipe(source('./scripts/libs.bundle.js'))
		.pipe(buffer())
		.pipe(gulpIf(settings.uglify, uglify()))
		.pipe(gulp.dest(''))
	;
});

gulp.task('scripts', ['lint', 'main', 'libs']);

gulp.task('styles', () => {
	return gulp.src('styles/styles.scss')
		.pipe(sass({outputStyle: settings.styles}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('styles'))
	;
});

gulp.task('watch', () => {
	gulp.watch('styles/**/*.scss', ['styles']);
	gulp.watch('scripts/libs.js', ['lint', 'libs']);
	gulp.watch([
		'scripts/main.js',
		'scripts/app.js',
		'scripts/app/**/*.js'
	], ['lint', 'main']);
});

gulp.task('default', ['styles', 'scripts', 'watch']);