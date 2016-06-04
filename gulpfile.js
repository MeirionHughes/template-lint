'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var shell = require('gulp-shell');
var merge = require('merge2');
var jasmine = require('gulp-jasmine');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var rimraf = require('gulp-rimraf');
var replace = require('gulp-replace');

var paths = {
    source: "source/",
    output: "dist/",
    spec: "spec/"
}

gulp.task('clean', function() {
 return gulp.src([paths.output + '**/*', paths.spec + '**/*.spec.*'], { read: false }) // much faster 
   .pipe(rimraf());
});

gulp.task('compile:typescript', ['clean'], function () {

    var source = ['!' + paths.source + '**/*spec.ts',
        paths.source + '**/*.ts',
        'typings/index.d.ts'];

    var tsResult = gulp
        .src(source)
        .pipe(sourcemap.init())
        .pipe(ts({
            target: "es6",
            module: "commonjs",
            declaration: true
        }));

    return merge([
        tsResult.dts.pipe(gulp.dest(paths.output)),
        tsResult.js.pipe(sourcemap.write('.', { sourceRoot: '../source' }))
            .pipe(gulp.dest(paths.output))
    ]);
});

gulp.task('compile:tests', ['compile:typescript'], function () {
    var source = [paths.source + '**/*spec.ts',
                 'typings/index.d.ts'];

    var tsResult = gulp.src(source)
        .pipe(sourcemap.init())
        .pipe(ts({
            target: "es6",
            module: "commonjs",
            declaration: false
        }));

    return tsResult.js
        .pipe(sourcemap.write('.', { sourceRoot: '../source' }))        
        .pipe(replace(/(require\('\.\/)/g, 'require(\'..\/dist\/'))
        .pipe(gulp.dest(paths.spec));
});

gulp.task('test', ['compile:tests'], function () {
    return gulp.src('spec/*.js')
        .pipe(plumber())
        .pipe(jasmine({ verbose: true }));
});

gulp.task('watch', ['test'], function () {

    gulp.watch(paths.source + '**/*.ts', ['test']);

});

gulp.task('default', ['test'], function () {
});