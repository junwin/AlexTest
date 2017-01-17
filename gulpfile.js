'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');

/** Configuration **/
var user = 'MY_FTP_USER_ID';
var password = 'MY_FTP_PASSWORD';
var host = 'MY_FTP_SITE';

var port = 21;
var localFilesGlob = ['./**/*'];
var remoteFolder = '/site/wwwroot'


// helper function to build an FTP connection based on our configuration
function getFtpConnection() {
    return ftp.create({
        host: host,
        port: port,
        user: user,
        password: password,
        parallel: 1,
        log: gutil.log,
        secure: false
    });
}

/**
 * Deploy task.
 * Copies the new files to the server
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy`
 */
gulp.task('ftp-deploy', function () {

    try {
        var conn = getFtpConnection();
    }
    catch (e) {
        console.error(e);
    }
    return gulp.src(localFilesGlob, { base: '.', buffer: false })
        .pipe(conn.newer(remoteFolder)) // only upload newer files 
        .pipe(conn.dest(remoteFolder))
        ;
});

gulp.task('ftp-test', function () {
    var watcher = gulp.watch('{*.js,*.html,*.css}');
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type);
        var conn = getFtpConnection();
        return gulp.src([event.path], { base: '.', buffer: false })
            .pipe(conn.newer(remoteFolder)) // only upload newer files 
            .pipe(conn.dest(remoteFolder))
            ;
    });
});



/**
 * Watch deploy task.
 * Watches the local copy for changes and copies the new files to the server whenever an update is detected
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy-watch`
 */
gulp.task('ftp-deploy-watch', function () {

    var conn = getFtpConnection();

    gulp.watch(localFilesGlob)
        .on('change', function (event) {
            console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);

            return gulp.src([event.path], { base: '.', buffer: false })
                .pipe(conn.newer(remoteFolder)) // only upload newer files 
                .pipe(conn.dest(remoteFolder))
                ;
        });
});