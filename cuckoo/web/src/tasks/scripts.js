var fs 			= require('fs');
var gulp 		= require('gulp');
var browserify 	= require('browserify');
var babelify 	= require('babelify');
var source 		= require('vinyl-source-stream');
var buffer 		= require('vinyl-buffer');
var es 			= require('event-stream');
var glob 		= require('glob');

module.exports = function(done) {

	glob('./scripts/*.js', function(err, files) {

		if(err) {
			done(err);
			return;	
		}

		var tasks = files.map(function(entry) {
			return browserify({entries: entry})
				.transform(babelify, { presets: "es2015" })
				.bundle()
				.pipe(source(entry))
				.pipe(gulp.dest('../static/js/babel-test'));
		});

		es.merge(tasks).on('end', done);

	});

}