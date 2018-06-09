"use strict";

let gulp = require('gulp');
let clean = require('gulp-clean');
let browserSync = require('browser-sync').create();
let webpackStream = require('webpack-stream');
let webpack2 = require('webpack');
let htmlLoader = require('html-loader');
let eslint = require('gulp-eslint');

let express = require('express');
let api = express();

gulp.task('api',()=>{
  console.log("~launching API~");
  api.get('/',(req,res)=>{
    res.send({
      version:"0.0.1"
    });
  });
  api.post('/cart',(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    //res.statusCode = 400;
    res.send({
      valid:true,
    });
  });
  api.listen(3002);
})

gulp.task('clean',()=>{
  gulp.src('dist/*', {read:false})
    .pipe(clean());
});

gulp.task('copy',['clean'], ()=>{
  return gulp.src('components/index.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('webpack',['copy'], ()=>{
  return gulp.src('components/main.js')
    .pipe(webpackStream({
      module:{
        rules:[{
          test:/\.html$/,
          use: [{
            loader:'html-loader',
            options:{
              minimize:true
            }
          }],
        },
        {
          test:/\.css$/,
          use: ['css-loader']
        }]
      },
      output:{
        filename:'main.js'
      }
      
    }, webpack2))
    .pipe(gulp.dest('dist/'));
});

gulp.task('lint',['webpack'],()=>{
  return gulp.src([
      'components/**/*.js',
      '!node_modules/**',
      '!gulpfile.js',
      '!dist/**'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['api','lint'], ()=>{
  
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  })
  gulp.watch([
    './components/**/*.js',
    './components/**/*.html',
    './components/**/*.css'
    ], ['lint']).on('change', ()=>{
    console.log('reloading');
    browserSync.reload
  });
});