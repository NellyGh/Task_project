"use strict";

const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require('gulp-clean-css');
const imagemin = require("gulp-imagemin");
const cleanDirectory = require("del");
const { src } = require("gulp");
const browserSync = require("browser-sync").create();
const sourcemaps = require('gulp-sourcemaps');



const srcPath = "src/";
const buildPath = "build/";
const path = {
    build: {
        css: `${buildPath}css`,
        images: `${buildPath}images`
    },
    src: {
        css: `${srcPath}scss/*.scss`,
        images: `${srcPath}images/**/*.{jpeg,png,svg,gif,ico,webp,webmanifest,xml,json}`
    },
    watch: {
        html: `*.html`,
        css: `${srcPath}scss/**/*.scss`,
        images: `${srcPath}images/**/*.{jpeg,png,svg,gif,ico,webp,webmanifest,xml,json}`
    },
    clean: `./${buildPath}`
};

function styles() {
    return gulp.src(path.src.css)
                .pipe(sourcemaps.init())
                .pipe(sass())
                .pipe(autoprefixer())
                .pipe(gulp.dest(path.build.css))
                .pipe(cleanCSS({compatibility: 'ie8'}))
                .pipe(rename({
                    suffix: ".min",
                    extname: ".css"
                }))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(path.build.css))
                .pipe(browserSync.reload({stream: true}));
}

function images() {
    return gulp.src(path.src.images)
                .pipe(imagemin([
                    imagemin.gifsicle({interlaced: true}),
                    imagemin.mozjpeg({quality: 65, progressive: true}),
                    imagemin.optipng({optimizationLevel: 4}),
                    imagemin.svgo({
                        plugins: [
                            {removeViewBox: true},
                            {cleanupIDs: false}
                        ]
                    })
                ]))
                .pipe(gulp.dest(path.build.images))
                .pipe(browserSync.reload({stream: true}));
}

function clean() {
    return cleanDirectory(path.clean);
}

function watchFiles() {
    gulp.watch([path.watch.css], styles);
    gulp.watch([path.watch.images], images);
    gulp.watch([path.watch.html]).on('change', browserSync.reload);
}

function server() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}



const build = gulp.series(clean, gulp.parallel(styles, images));
const watch = gulp.parallel(build, watchFiles, server);

exports.styles = styles;
exports.images = images;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;