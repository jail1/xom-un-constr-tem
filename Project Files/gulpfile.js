// ##################################################################################################################################
/* Author: Iacob Silviu - Iulian @BlissTerra
/* Project: Mox - Comming soon Template
/* Date: 08 / August / 2015
// ################################################################################################################################*/
// Nodejs Requires 
// ##################################################################################################################################

var gulp 			= require('gulp'),                  //* 
	gutil       	= require('gulp-util'),             //******** Utilities  
	gulpif      	= require('gulp-if'),               //*
	concat      	= require('gulp-concat'),           //*    
	connect     	= require('gulp-connect'),          //*   
	browserSync 	= require('browser-sync'),          //*   

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
	
var env, jsSources, sassSources, staticSources, fontsSources, jsonSources, sassStyle, outputDir, bootsrapPath, fontAwesomePath, ioniconsPath, bowerPath, jqmbytp;
var env = process.env.NODE_ENV || 'development';
var prod = env === 'development' ? false : true;

if(env === 'development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}

console.warn('Current node env is ', outputDir);

// ##################################################################################################################################
// File locations
// ##################################################################################################################################

	bowerPath 		= 'components/bower/';
	bootsrapPath    = 'components/bower/bootstrap-sass/assets/'; 
	fontAwesomePath = 'components/bower/fontawesome/';
	ioniconsPath    = 'components/bower/ionicons/';
	jqmbytp  		= 'jquery.mb.YTPlayer/dist/css/';

    jsSources	  = ['components/bower/jquery/dist/jquery.js',
    				 'components/bower/animateCSS/dist/jquery.animatecss.js',
    				 'components/bower/jquery-backstretch/jquery.backstretch.js',
    				 'components/bower/vegas/dist/vegas.js',
    				 bootsrapPath + 'javascripts/bootstrap/transition.js',
    				 bootsrapPath + 'javascripts/bootstrap/tooltip.js',
    				 bootsrapPath + 'javascripts/bootstrap/popover.js',
    				 bootsrapPath + 'javascripts/bootstrap/modal.js',
    				 bootsrapPath + 'javascripts/bootstrap/alert.js',
				 	 'components/scripts/*.js'];

 	fontsSources  = [bootsrapPath    + 'fonts/bootstrap/*.{ttf,woff,woff2,eot,svg}',
				     fontAwesomePath + 'fonts/*.{ttf,woff,woff2,eot,svg,otf}',
				     ioniconsPath    + 'fonts/*.{ttf,woff,eot,svg}',
				     jqmbytp         + 'font/*.{ttf,woff,eot}'];

 	cssSources 	  = [bowerPath + 'vegas/dist/vegas.css',
					 bowerPath + jqmbytp + 'jquery.mb.YTPlayer.min.css']

 	sassSources	  = [bootsrapPath + 'stylesheets/_bootstrap.scss',  
					'components/sass/styles.scss'];

 	staticSources = [outputDir + '*.html', outputDir + '*.php'];
 	
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
// JavaScript Lint Task (Disabled for now!)
// ##################################################################################################################################

/*
gulp.task('js-lint', function() {
	gulp.src(jsSources)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
});
*/

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
// Move fonts Task
// ##################################################################################################################################

gulp.task('fonts', function() {
	gulp.src(fontsSources)
		.pipe(gulp.dest('builds/development/fonts/'))
		.pipe(gulp.dest('builds/production/fonts/'));
});

// ##################################################################################################################################
// Move plain CSS Task
// ##################################################################################################################################

gulp.task('css', function() {
	gulp.src(cssSources)
		.pipe(gulp.dest('builds/development/css/vendor/'))
		.pipe(gulp.dest('builds/production/css/vendor/'));
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
// Browser Sync (~ Server and Workflow ~) Task
// ##################################################################################################################################

// # Separate watchers for the browser-sync watcher.
gulp.task('bs-sass-watch', ['compass'], browserSync.reload);
gulp.task('bs-js-watch', ['js'], browserSync.reload);
gulp.task('bs-static-watch', ['static'], browserSync.reload);

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: outputDir + '/'
		}
	});

	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch('builds/development/js/*.json', ['json']);

	gulp.watch('builds/development/*.html', ['bs-static-watch']);
	gulp.watch(jsSources, ['bs-js-watch']);
	gulp.watch('components/sass/*.scss', ['bs-sass-watch']);
});

// ##################################################################################################################################
// Default Task
// ##################################################################################################################################

gulp.task('default2', ['static', 'js-lint', 'json', 'js', 'compass', 'images', 'connect', 'watch']); 
gulp.task('default', ['static', 'json', 'js', 'compass', 'fonts', 'css', 'images', 'browser-sync']); 
// Process all of this. Yell 'gulp' in console.

// ##################################################################################################################################
// End Project
// ##################################################################################################################################
