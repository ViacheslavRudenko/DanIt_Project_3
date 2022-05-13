const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const clean = require("gulp-clean");
const purgecss = require("gulp-purgecss");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const minifyjs = require("gulp-js-minify");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const tinypng = require("gulp-tinypng");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("tinypng", () => {
  return gulp
    .src("./src/images/**")
    .pipe(tinypng("Tf3xFMPYlz0r2SsdsXwQtghJcLspQYym"))
    .pipe(gulp.dest("./dist/images"));
});
gulp.task("buildStyles", function () {
  return (
    gulp
      .src("./src/scss/styles.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(
        autoprefixer({
          overrideBrowserList: ["last 2 versions"],
          cascade: false,
        })
      )
      // .pipe(
      //   purgecss({
      //     content: ["*.html"],
      //   })
      //)
      .pipe(rename("style.min.css"))
      .pipe(cleanCSS({ compatibility: "ie8" }))
      .pipe(gulp.dest("./dist/css/"))
  );
});
gulp.task("clean", function () {
  return gulp.src("./dist/*", { read: false }).pipe(clean());
});
gulp.task("buildJS", function () {
  return gulp.src(["./src/js/*.js"]).pipe(gulp.dest("./dist/js"));
});

gulp.task("build", gulp.series(["clean", "buildJS", "buildStyles", "tinypng"]));
gulp.task("dev", () => {
  browserSync.init({
    server: "./",
  });
  gulp.watch("./src/scss/**/**.scss", gulp.series("buildStyles"));
  gulp.watch("./src/js/**/**.js", gulp.series("buildJS"));
  gulp.watch("./index.html").on("change", browserSync.reload);
  gulp.watch("./dist/css/style.min.css").on("change", browserSync.reload);
  gulp.watch("./dist/js/**/**.js").on("change", browserSync.reload);
});
