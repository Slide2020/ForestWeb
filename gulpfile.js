const { src, dest, series, parallel, watch } = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const webp = require("gulp-webp");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const kit = require("gulp-kit");
const reload = browserSync.reload;

const paths = {
	html: "./html/**/*.kit",
	sass: "./src/sass/**/*.scss",
	js: "./src/js/**/*.js",
	img: "./src/img/**/*",
	sassDest: "./dist/css",
	jsDest: "./dist/js",
	imgDest: "./dist/img",
};

function sassCompiler(done) {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: ".min" }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sassDest));

	done();
}

function javaScriptCompiler(done) {
	src("./src/js/**/*.js")
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ["@babel/env"],
			})
		)
		.pipe(uglify())
		.pipe(rename({ suffix: ".min" }))
		.pipe(sourcemaps.write())
		.pipe(dest("./dist/js"));

	done();
}

function imgConverter(done) {
	src(paths.img).pipe(webp()).pipe(dest(paths.imgDest));
	done();
}

function handleKits(done) {
	src(paths.html).pipe(kit()).pipe(dest("./"));
	done();
}

function startBrowserSync(done) {
	browserSync.init({
		server: {
			baseDir: "./",
		},
	});
	done();
}

function watchForChanges(done) {
	watch("./*.html").on("change", reload);
	watch(
		[paths.html, paths.sass, paths.js],
		parallel(handleKits, sassCompiler, javaScriptCompiler)
	).on("change", reload);
	watch(paths.img, imgConverter).on("change", reload);
	done();
}

const mainFunctions = parallel(
	handleKits,
	sassCompiler,
	javaScriptCompiler,
	imgConverter
);
exports.default = series(mainFunctions, startBrowserSync, watchForChanges);
