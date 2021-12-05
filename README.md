# EMP
Error Message Parser - A website that makes programming error messages more readable

# dependencies:
node/npm for dependency management use, npm install in this directory
npm package - browserify to transpile the js files to work in browser
npm package - (watchify) to run browserify in watch mode, this is only necessary for the run dev script
npm package - http-server to start a local server


# scripts - these only work on linux!:
npm start - builds the website and starts a local server
npm run build - only builds the webiste
npm run dev - starts necessary build tools in watch mode and a local server all in prallel (watchify needs to be installed)

# build process manually:
I highly recommend using one of the scripts instead
run "tsc" to transpile ts files to js
run "browserify js/app.js -o js/bundle.js" to transpile js files to be runnable in browser without a server setup
(run "http-server" to start a local server)
