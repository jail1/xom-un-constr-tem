// ##################################################################################################################################
/* Author: Iacob Silviu - Iulian @BlissTerra
/* Project: Mox - Comming soon Template
/* Date: 08 / August / 2015
// ################################################################################################################################*/
// Nodejs Requires 
// ##################################################################################################################################

var gulp 			= require('gulp'),                  //* 
	gutil 			= require('gulp-util'),             //******** Utilities  
	gulpif 			= require('gulp-if'),               //*
	concat			= require('gulp-concat'),           //*    
	connect			= require('gulp-connect'),          //*     

	plumber			= require('gulp-plumber'),          //*
	jshint			= require('gulp-jshint'),           //******** Linting  
	notify			= require('gulp-notify'),           //*
	stylish			= require('jshint-stylish'),        //*       
          
	autoprefixer	= require('gulp-autoprefixer'),     //******** Preprocessing
	compass			= require('gulp-compass'),          //* 

	minifycss		= require('gulp-minify-css'),       //*    
	minifyhtml  	= require('gulp-minify-html'),      //******** Uglifying    
	jsonminify  	= require('gulp-jsonminify'),       //*    
	guglify			= require('gulp-uglify');           //*
	


var env, coffeeSources, jsSources, sassSources, staticSources, jsonSources, sassStyle, outputDir;
var env = process.env.NODE_ENV || 'development';
var prod = env === 'development' ? false : true;

if(env === 'development') {
	outputDir = './builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}

// ##################################################################################################################################
// File locations
// ##################################################################################################################################

    jsSources	  = ['components/bower/jquery/dist/jquery.js',
				 	 'components/scripts/*.js'],

 	sassSources	  = ['components/sass/styles.scss'],

 	staticSources = [outputDir + '*.html', outputDir + '*.php'],
 	
 	jsonSources   = [outputDir + 'js/*.json'];

// ##################################################################################################################################
// JavaScript Task
// ##################################################################################################################################

gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(gulpif(prod, guglify()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(notify({ message: 'JS Processed!' }))
		.pipe(connect.reload());
});

// ##################################################################################################################################
// JavaScript Lint Task
// ##################################################################################################################################

gulp.task('js-lint', function() {
	gulp.src(jsSources)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
});

// ##################################################################################################################################
// Compass Task
// ##################################################################################################################################

gulp.task('compass', function() {
	gulp.src(sassSources)
		.pipe(plumber())
		.pipe(compass({
			sass: 'components/sass',
			image: outputDir + 'images',
			style: sassStyle
		}).on('error', function(error) {
			gutil.log(error);
			gutil.beep();
		}))
		.pipe(autoprefixer(
            'last 2 version',
            '> 1%',
            'ie 8',
            'ie 9',
            'ios 6',
            'android 4'	
		))
		.pipe(gulpif(prod, minifycss()))
		.pipe(gulp.dest(outputDir + 'css'))
		.pipe(notify({message: 'SCSS Processed!'}))
		.pipe(connect.reload())
});

// ##################################################################################################################################
// Satic (~ HTML, PHP, etc ~) Task
// ##################################################################################################################################

gulp.task('static', function() {
	gulp.src('builds/development/*.html')
		.pipe(gulpif(prod, minifyhtml()))
		.pipe(gulpif(prod, gulp.dest(outputDir)))
		.pipe(connect.reload());
});

// ##################################################################################################################################
// Json Task
// ##################################################################################################################################

gulp.task('json', function() {
	gulp.src('builds/development/js/*.json')
		.pipe(gulpif(prod, jsonminify()))
		.pipe(gulpif(prod, gulp.dest('builds/production/js/')))
		.pipe(connect.reload());
});

// ##################################################################################################################################
// Images Task
// ##################################################################################################################################

gulp.task('images', function() {
	gulp.src('builds/development/images/**/*.*')
		.pipe(gulpif(prod, gulp.dest('builds/production/images/')))
		.pipe(connect.reload());
});

// ##################################################################################################################################
// Watch Task
// ##################################################################################################################################

gulp.task('watch', function() {
	gulp.watch(jsSources, ['js', 'js-lint']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch('builds/development/*.html', ['static']);
	gulp.watch('builds/development/js/*.json', ['json']);
	gulp.watch('builds/development/images/**/*.*', ['images']);
});

// ##################################################################################################################################
// Connect (~ Server ~) Task
// ##################################################################################################################################

gulp.task('connect', function() {
	connect.server({
		root: outputDir,
		livereload: true
	});
});

// ##################################################################################################################################
// Default Task
// ##################################################################################################################################

gulp.task('default', ['static', 'js-lint', 'json', 'js', 'compass', 'images', 'connect', 'watch']); 
// Process all of this. Yell 'gulp' in console.

// ##################################################################################################################################
// End Project
// ##################################################################################################################################