var gulp = require('gulp'),                         //基础库
    imagemin = require('gulp-imagemin'),            //图片压缩
    less = require('gulp-less'),                    // less
    minifycss = require('gulp-minify-css'),         //css压缩
    fileinclude  = require('gulp-file-include'),    // 文件包含
    //jshint = require('gulp-jshint'),              //js检查
    uglify  = require('gulp-uglify'),               //js压缩
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),                //重命名
    //concat  = require('gulp-concat'),             //合并文件
    //clean = require('gulp-clean'),                //清空文件夹
    notify = require('gulp-notify'),                // 信息提示
    plumber = require('gulp-plumber'),              //错误处理插件plumber
    connect = require('gulp-connect'),              //本地开发web服务器，包括实时刷新
    rev = require('gulp-rev'),
    revCollector  = require('gulp-rev-collector'),
    revReplace = require('gulp-rev-replace'),
    //多浏览器多设备同步&自动刷新
    browserSync = require('browser-sync').create(),
    SSI         = require('browsersync-ssi'),
    minify      = require('gulp-minify'),           //压缩js
    runSequence = require('run-sequence');
    minifyHTML = require('gulp-minify-html');


var devDir = 'dist';

/** less编译 **/
gulp.task('less', function () {
    gulp.src('./src/less/**/*.less')
        .pipe(less())
        //.pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./'+devDir+'/css/'));
});

/** js **/
gulp.task('js', function () {
    gulp.src(['./src/js/**/*'])
        //错误管理模块
        .pipe(plumber())
        //js压缩
        .pipe(minify())
        .pipe(gulp.dest('./'+devDir+'/js/'))
        //自动刷新浏览器
        .pipe(browserSync.stream());
});

/** 通用文件包含 **/
gulp.task('fileinclude', function() {
    gulp.src(['./src/views/**/*.html', '!./src/views/include/**.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'+devDir+'/'));
});

/** 图片处理 **/
gulp.task('images', function () {
    gulp.src(['./src/images/**/*'])
        .pipe(gulp.dest('./'+devDir+'/images/'));
});

/** 字体图标 **/
gulp.task('fonts', function () {
    gulp.src(['./src/fonts/**/*'])
        .pipe(gulp.dest('./'+devDir+'/fonts/'));
});

/** 使用connect启动一个Web服务器 **/
gulp.task('connect', function () {
    connect.server({
        root: './'+devDir+'/',
        livereload: true
    });
});

/** 刷新页面 **/
gulp.task('reload', function () {
    gulp.src('./'+devDir+'/**/*.html')
        .pipe(connect.reload());
});

/** 监测文件变动，设置自动执行的任务 **/
gulp.task('watch', function () {
    gulp.watch('./src/less/**/*.less', ['less', 'reload']);                   // 当所有less文件发生改变时，调用less任务
    gulp.watch('./src/js/**/*.js', ['js', 'reload']);                   // 当所有js文件发生改变时，调用js任务
    gulp.watch('./src/views/**/*.html', ['fileinclude', 'reload']); // 当所有模板文件变化时，重新生成生成页面到根目录
    gulp.watch('./src/images/**/*', ['images']);                    // 监听images
});

/** 开发时，运行 'gulp dev' **/
gulp.task('dev', ['connect', 'less', 'js', 'fileinclude', 'images', 'fonts', 'reload', 'watch']);



/*****************************************************************
 * dist版本，压缩版
 ****************************************************************/
/** less编译 **/
gulp.task('lessDist', function () {
    gulp.src('./src/less/**/*.less')
        .pipe(less())
        //.pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./src/rev/css'));
});

/** js **/
gulp.task('jsDist', function () {
    gulp.src(['./src/js/**/*', '!./src/js/**/*.js'])
        .pipe(gulp.dest('./dist/js'));
    gulp.src(['./src/js/**/*.js'])
        .pipe(uglify({
            mangle: {except: ['require', 'exports', 'module', '$']}
        }))
        .pipe(rev())
        .pipe(gulp.dest('./dist/dist/js/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./src/rev/js'));
});

// gulp.task('jsDist', function () {
//     gulp.src(['./src/js/**/*.js'])
//         .pipe(babel())
//         .pipe(uglify())
//         .pipe(rev())
//         .pipe(gulp.dest('./dist/js/'))
//         .pipe(rev.manifest())
//         .pipe(gulp.dest('./src/rev/js'));
// });

/** Html替换css、js文件版本**/
gulp.task('revHtml', function () {
    return gulp.src(['rev/**/*.json', 'View/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('View'));
});

/** 通用文件包含 **/
gulp.task('fileincludeDist', function() {
    gulp.src(['./src/views/**/*.html', '!./src/views/include/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist/'));
});

/** 图片处理 **/
gulp.task('imagesDist', function () {
    gulp.src(['./src/images/**/*'])
        .pipe(gulp.dest('./dist/images/'));
});

/** 字体图标 **/
gulp.task('fontsDist', function () {
    gulp.src(['./src/fonts/**/*'])
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('commonRev', function () {
    return gulp.src(['src/rev/**/*.json', 'dist/**/*.html'])
        .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': 'css',
                'js': 'js'
                //'cdn/': function(manifest_value) {
                //    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                //}
            }
        }) )
        .pipe( minifyHTML({
            empty:true,
            spare:true
        }) )
        .pipe( gulp.dest('dist') );
});


//处理seajs脚本的模块引用
gulp.task("seaRev", function() {
    var jsManifest = gulp.src('./src/rev/js/*.json');

    return gulp.src(["src/js/config.js"], {
        base: "src/js"
    })
        .pipe(revReplace({
            manifest: jsManifest
        }))
        .pipe(rev())
        .pipe(gulp.dest("dist/js"))
        .pipe(rev.manifest("rev-manifest-seajs.json", {
            merge: true
        }))
        .pipe(gulp.dest("src/rev/js"));
});


/** 发布时，运行 'gulp dist' **/
/** 需版本号，再运行 'gulp rev' **/
gulp.task('dist', ['lessDist', 'jsDist', 'revHtml', 'fileincludeDist', 'imagesDist', 'fontsDist']);
gulp.task('rev', ['commonRev', 'seaRev']);