import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import cleancss from 'gulp-clean-css';
import browsersync from 'browser-sync';
import imagemin from 'gulp-imagemin';
import htmlmin from 'gulp-htmlmin';

const dir = {
    src: 'src/',
    dest: 'build/'
};

const scripts = {
    src: `${dir.src}/**/*.js`,
    dest: `${dir.dest}/js/`
};

const styles = {
    scss: `${dir.src}/scss/*.scss`,
    css: `${dir.src}/css/*.css`,
    dest: `${dir.dest}/css/`
};

const images = {
    src: `${dir.src}/images/**/*`,
    dest: `${dir.dest}/images/`
}

const html = {
    src: `${dir.src}/**/*.html`,
    dest: `${dir.dest}/`
}

// Styles

gulp.task('styles', () => {
    return gulp.src([styles.scss, styles.css])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('styles.bundle.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(styles.dest))
});

gulp.task('styles:min', () => {
    return gulp.src([styles.scss, styles.css])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleancss())
    .pipe(concat('styles.bundle.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(styles.dest))
});

// Scripts

gulp.task('scripts', () => {
    return gulp.src(scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('scripts.bundle.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(scripts.dest))
});

gulp.task('scripts:min', () => {
    return gulp.src(scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('scripts.bundle.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(scripts.dest))
});

//Images

gulp.task('images', () => {
    return gulp.src(images.src)
    .pipe(imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
        svgoPlugins: [{removeViewBox: true}]
    }))
    .pipe(gulp.dest(images.dest))
});

// HTML

gulp.task('html', () => {
    return gulp.src(html.src)
    .pipe(gulp.dest(html.dest))
});

gulp.task('html:min', () => {
    return gulp.src(html.src)
    .pipe(htmlmin({
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
    }))
    .pipe(gulp.dest(html.dest))
});

// Dev server

gulp.task('dev', ['default'], () => {
    browsersync.init({
        server: './build',
        port: '8123'
    });

    gulp.watch(scripts.src, ['scripts']).on('change', browsersync.reload);
    gulp.watch(styles.scss, ['styles']).on('change', browsersync.reload);
    gulp.watch(styles.css, ['styles']).on('change', browsersync.reload);
    gulp.watch(images.src, ['images']).on('change', browsersync.reload);
    gulp.watch(html.src, ['html']).on('change', browsersync.reload);
});

gulp.task('build', ['html:min', 'styles:min', 'scripts:min', 'images']);

gulp.task('default', ['html', 'styles', 'images','scripts']);