import hljs from 'highlight.js';
import LanguageInterface from './LanguageInterface';
import Python from './languages/python';

//Supported languages, add new additions here and import files above
//must be present in highlight.js dependecy aswell
const supportedLangs = 
    [
        "python",
        "c",
        "fsharp",
        "java",
        "matlab"
    ];

const codeInputHTML = document.getElementById("codeInput");
const codeOutputHTML = document.getElementById("codeOutput");

//initialize when page is loaded
window.addEventListener("load", (e) => {
    codeInputHTML!.focus();
});

codeInputHTML!.addEventListener("input", () => {
    rehighlight();
}, false);

//prevent tab key from focusing out of the textarea
//TODO
// codeInputHTML!.addEventListener('keydown', (e) => {
//     if (e.key === 'Tab') {
//         e.preventDefault();
//         insertTextAtCursor(codeInputHTML!, "    ");
//     }
// });

codeInputHTML!.addEventListener("paste", (e) => {
    // cancel paste to prevent preformated text
    e.preventDefault();
    // get text representation of clipboard
    if (e.clipboardData) {
        let text = e.clipboardData.getData('text/plain');
        // insert text manually, this will replace text already present
        codeInputHTML!.innerText = text;
        rehighlight();
    }
});

function rehighlight() {
    let hljsOutput = hljs.highlightAuto(codeInputHTML!.innerText, supportedLangs);
    console.log("Detected language: " + hljsOutput.language);
    
    //TODO this is a placeholder
    let languageObject = new Python();
    console.log(languageObject.insertTips(""));

    codeOutputHTML!.innerHTML = hljsOutput.value;
}