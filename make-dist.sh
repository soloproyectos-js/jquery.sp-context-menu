#!/bin/bash
# This script creates the distribution files. Usage:
# ./make-dist.sh

# remove dist files 
rm -rf dist/*

# compresses JavaScript files
cat \
    src/jquery.sp-context-menu.js \
| uglifyjs \
    --compress \
    --mangle \
    --preamble "/*! jQuery.spRegex v0.1.0 | Copyright (c) 2015 Gonzalo Chumillas | https://github.com/soloproyectos-js/jquery.sp-context-menu/blob/master/README.md */" \
    -o dist/jquery.sp-context-menu.min.js
# compresses CSS files
cat \
    src/jquery.sp-context-menu.css \
| uglifycss > dist/jquery.sp-context-menu.min.css
