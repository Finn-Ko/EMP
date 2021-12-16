import LanguageInterface from './LanguageInterface';
import PythonLang from './languages/python';

//Supported languages, add new additions here and import files above
let supportedLangs = new Map<string, LanguageInterface>(
    [
        //add new languages here
        ["python", new PythonLang()]

    ]);

const codeInputHTML = document.getElementById("codeInput")!;
const codeOutputHTML = document.getElementById("codeOutput")!;
const spoLangSelector = document.getElementById("spoLang")! as HTMLSelectElement;
const proLangSelector = document.getElementById("proLang")! as HTMLSelectElement;

//initialize when page is loaded
window.addEventListener("load", (e) => {
    codeInputHTML.focus();
});

//rehighlight on input or different language selected
codeInputHTML.addEventListener("input", () => {
    rehighlight();
}, false);

spoLangSelector.addEventListener("change", () => {
    rehighlight();
}, false);

proLangSelector.addEventListener("change", () => {
    rehighlight();
}, false);

//prevent tab key from focusing out of the textarea
//TODO
window.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        codeOutputHTML.innerHTML = "The tab key doens't work yet, sorry. \nUse spaces instead";
    }
});

codeInputHTML!.addEventListener("paste", (e) => {
    // cancel paste to prevent preformated text
    e.preventDefault();
    // get text representation of clipboard
    if (e.clipboardData) {
        let text = e.clipboardData.getData('text/plain');
        // insert text manually, this will replace text already present
        codeInputHTML.innerText = text;
        rehighlight();
    }
});

//main function that is called when something changes in input to readjust output
function rehighlight(): void {

    let spoLang = spoLangSelector.value;
    let proLang = proLangSelector.value;
    
    codeOutputHTML.innerHTML = insertHintsEMP(codeInputHTML!.innerHTML, proLang, spoLang);;
}

function insertHintsEMP(input: string, proLang: string, spoLang?: string ): string {

    //default spoken languge is english if not given otherwise
    if (!spoLang) {
        spoLang = "english";
    }

    proLang = proLang.toLocaleLowerCase();
    spoLang = spoLang.toLocaleLowerCase();

    let languageObject = supportedLangs.get(proLang);

    if (!languageObject) {   
        return "Language not supported";
    }

    //iterate over input and check if it contains keyword from specified index
    for (let i = 0; i < input.length; i++) {
        for (let [word, entry] of languageObject.getDictionary()) {
            //console.log(input.substring(i, i + key.length));
            if (input.substring(i, i + word.length) === word) {
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

    input = languageObject.color(input);

    return input;
}

export default insertHintsEMP;