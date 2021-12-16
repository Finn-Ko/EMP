# EMP

Error Message Parser - A website that makes programming error messages more readable  
Accesible here: finn-ko.github.io/EMP/  

## dependencies:

node/npm for dependency management use, npm install in this directory  
typescript transpiler - https://www.typescriptlang.org/  
  npm install -g typescript --save-dev  
browserify - transpile js files to work in browser https://browserify.org/  
  npm install -g browserify  
(watchify) - to run browserify in watch mode, this is only necessary for the run dev script https://www.npmjs.com/package/watchify  
  npm install -g watchify  
http-server - to start a local server https://www.npmjs.com/package/http-server  
  npm install -g http-server  
  
## scripts - these only work on linux!:

npm start - builds the website and starts a local server  
npm run build - only builds the webiste  
npm run dev - starts necessary build tools in watch mode and a local server all in prallel (watchify needs to be installed)  

## build process manually:

I highly recommend using one of the scripts instead  
run "tsc" to transpile ts files to js  
run "browserify js/app.js -o js/bundle.js" to transpile js files to be runnable in browser without a server setup  
(run "http-server" to start a local server)  
