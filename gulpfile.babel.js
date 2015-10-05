import assign from 'object-assign';
import autoprefixer from 'gulp-autoprefixer';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import gutil from 'gulp-util';
import sass from 'gulp-sass';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import watchify from 'watchify';
import packageJson from './package.json';
import config from './scripts/config';

let deps = Object.keys(packageJson.dependencies);

// Adjust for slash modules
deps[deps.indexOf('react')] = 'react/addons';
deps[deps.indexOf('react-pure-render')] = 'react-pure-render/function';
deps[deps.indexOf('history')] = 'history/lib/createBrowserHistory';

gulp.task('lint', () => {
	return gulp.src(['gulpfile.babel.js', 'scripts/**/*.js'])
		.pipe(eslint({quiet: true}))
		.pipe(eslint.format())
	;
});


// Main bundle
let mainOptions = assign({entries: ['./scripts/main.js']}, watchify.args);
let main = watchify(browserify(mainOptions), {poll: true})
	.transform(babelify).external(deps);
let bundleMain = () => {
	return main
		.bundle()
			.on('error', function(err) {
			gutil.log(err.message);
			this.emit('end');
		})
		.pipe(source('./public/scripts/main.bundle.js'))
		.pipe(buffer())
		.pipe(gulpIf(config.uglify, uglify()))
		.pipe(gulp.dest(''))
	;
};

gulp.task('main', bundleMain);
main.on('log', gutil.log);

// Libs bundle
let libs = watchify(browserify(assign({}, watchify.args))).require(deps);
let bundleLibs = () => {
	return libs
		.bundle()
		.on('error', function(err) {
			gutil.log(err.message);
			this.emit('end');
		})
		.pipe(source('./public/scripts/libs.bundle.js'))
		.pipe(buffer())
		.pipe(gulpIf(config.uglify, uglify()))
		.pipe(gulp.dest(''))
	;
};

gulp.task('libs', bundleLibs);
libs.on('log', gutil.log);

// Loader bundle
let loaderOptions = assign({entries: ['./scripts/loader.js']}, watchify.args);
let loader = watchify(browserify(loaderOptions), {poll: true})
	.transform(babelify);
let bundleLoader = () => {
	return loader
		.bundle()
			.on('error', function(err) {
			gutil.log(err.message);
			this.emit('end');
		})
		.pipe(source('./public/scripts/loader.bundle.js'))
		.pipe(buffer())
		.pipe(gulpIf(config.uglify, uglify()))
		.pipe(gulp.dest(''))
	;
};

gulp.task('loader', bundleLoader);
main.on('log', gutil.log);

gulp.task('scripts', ['lint', 'main', 'libs', 'loader']);

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
	gulp.watch(['scripts/**/*.js'], ['lint', 'main', 'libs', 'loader']);
});

gulp.task('default', ['styles', 'scripts', 'watch']);