import hljs, { AutoHighlightResult } from 'highlight.js';
import LanguageInterface from './LanguageInterface';
import PythonHints from './languages/python';

//Supported languages, add new additions here and import files above
//must be present in highlight.js dependecy aswell
let supportedLangs = new Map<string, LanguageInterface>(
    [
        ["python", new PythonHints()]
        //new languages add here

    ]);

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
window.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        codeOutputHTML!.innerHTML = "The tab key doens't work yet, sorry. \nUse spaces instead";
    }
});

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

//main function that is called when something changes in input to readjust output
function rehighlight(): void {
    
    //TODO use comboboxes
    let output = insertHintsEMP(codeInputHTML!.innerHTML, undefined, "python");
    
    codeOutputHTML!.innerHTML = output;
}

function insertHintsEMP(input: string, spoLang?: string, proLang?: string): string {
    let hljsOutput: AutoHighlightResult;
    
    //try to auto detect programming lanugage if not given
    if (!proLang) {
        hljsOutput = hljs.highlightAuto(codeInputHTML!.innerText, [...supportedLangs.keys()]);
        if (hljsOutput.language) {
            proLang = hljsOutput.language;
            input = hljsOutput.value;
        }
        else {
            return "Unknown language";
        }
    }

    //if programming language is given highlight using only the given language
    else {
        hljsOutput = hljs.highlightAuto(codeInputHTML!.innerText, [proLang]);
        if (!hljsOutput.language) {
            return "Cannot highlight with given language";
        }
        //input = hljsOutput.value;
    }

    //default spoken languge is english if not given otherwise
    if (!spoLang) {
        spoLang = "english";
    }

    let languageObject = supportedLangs.get(proLang);

    if (!languageObject) {   
        return "Language not supported";
    }

    //iterate over input and check if it contains keyword from specified index
    for (let i = 0; i < input.length; i++) {
        for (let [word, entry] of languageObject.getDictionary()) {
            //console.log(input.substring(i, i + key.length));
            if (input.substring(i, i + word.length) === word) {
                //let toInsert = `<div class='hint' onmouseover='showHint(\"` + entry.getHint(spoLang) + `\")' onmouseout='removeHint()'>` + word + "</div>";
                let toInsert =
                 "<div class='tooltip'>" + word + "<span class='tooltiptext'>" 
                 + entry.getHint(spoLang) + "</span></div>"
                input = [input.slice(0, i), toInsert, input.slice(i + word.length)].join('');
                i += toInsert.length;
                break;
            }
        }
    }
    //trie? https://de.wikipedia.org/wiki/Trie

    return input;
}

export default insertHintsEMP;