#   Starter Kit

[![Build Status](https://travis-ci.org/UserLoveWolf/starter-kit.svg?branch=master)](https://travis-ci.org/UserLoveWolf/starter-kit)

###  Starter kit for web dev using [Gulp](https://www.gulpjs.com), [Babel](https://www.babeljs.io) and [MDL](https://www.getmdl.io)

##  To get started
### Download / Clone
```bash
$ git clone https://github.com/UserLoveWolf/starter-kit.git
```
### Install gulp globlally
```bash
$ npm install gulp -g
```

### Run
```bash
$ npm install
```
```bash
$ gulp dev
```
##  Go to localhost:8123

(Browsersync is used, so do not worry about reloading the page every time you save)

### Develop your web in the folder "src"
Every time you save your files they are in the build folder but not minified, so your files are minified when run
```bash
$ gulp build
```