# EMP

Error Message Parser - A website that makes programming error messages more readable  
Accessible here: https://finn-ko.github.io/EMP/  

## dependencies:

node/npm for dependency management, use `npm install` in this directory  
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm    
typescript transpiler - https://www.typescriptlang.org/  
  `npm install -g typescript --save-dev`   
http-server - to start a local server https://www.npmjs.com/package/http-server  
  `npm install -g http-server`  
  
## scripts - these only work on linux!:

`npm start` - builds the website and starts a local server  
`npm run build` - only builds the webiste  
`npm run dev` - starts the build in watch mode and a local server in parallel

## build process manually:
 
run "tsc" to transpile ts files to js
(run "http-server" to start a local server)  
  
## API  
  
You can import the highligting and adding of hints functionality to your website.  
To do this add the following script Tag:  
`<script type="module"> import insertHintsEMP from 'https://finn-ko.github.io/EMP/js/highlighterExport.js'; </script>`  
And link one of the stylesheets from /css/EMP_* like so  
`<link rel="stylesheet" type="text/css" href="https://finn-ko.github.io/EMP/css/EMP_dark.css" />`  
You can now use the insertHintsEMP(input, proLang, spoLang?) function on your website.