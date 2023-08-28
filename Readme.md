# Babel

## Babel 설치

- npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node
- npm install --save-dev @babel/plugin-transform-runtime
- npm install --save @babel/runtime # runtime 종속성, -dev 옵션 X
- npm install --save-dev babel-plugin-transform-remove-console # build 할 때 console.log

## babel.config.js

- module.exports = {
- presets: ['@babel/env'],
- plugins:
-     process.env.NODE_ENV === 'production'
-       ? ['transform-remove-console', '@babel/plugin-transform-runtime']
-       : ['@babel/plugin-transform-runtime'],
-     ignore: ['./src/public/**/*.js'],
- };

## Package.json

- {
- "scripts": {
-     "dev": "nodemon --exec babel-node src/bin/www.js",
-     "build": "NODE_ENV=production babel src --out-dir dist --copy-files",
-     "start": "node dist/bin/www.js"
- },
- }

# GITHUB CI/CD

- https://velog.io/@phraqe/mymemory-02

# NPM INSTALL
react-query - > index.js 수정
tailwindcss - > index.css+ tailwind.config.js 수정
react-hook-form
react-router-dom
