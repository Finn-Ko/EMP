import LanguageInterface from './LanguageInterface';
import PythonLang from './languages/python';

//Supported languages, add new additions here and import files above
let supportedLangs = new Map<string, LanguageInterface>(
    [
        //add new languages here
        ["python", new PythonLang()]

    ]);

const codeInputHTML = document.getElementById("codeInput")! as HTMLInputElement;
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
window.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        insertAtCursor(codeInputHTML, "    ");
    }
});

function insertAtCursor(myField: HTMLInputElement, myValue: string) {
    if (myField.selectionStart) {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        if (endPos) {
            myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
        }
        else {
            myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(startPos, myField.value.length);
        }
    } else {
        myField.value += myValue;
    }
}

//html string escaper 
//https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript
function escapeHtml(unsafe: string): string {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

//main function that is called when something changes in input to readjust output
function rehighlight(): void {

    let spoLang = spoLangSelector.value;
    let proLang = proLangSelector.value;
    
    codeOutputHTML.innerHTML = insertHintsEMP(codeInputHTML.value, proLang, spoLang);;
}

function insertHintsEMP(input: string, proLang: string, spoLang?: string ): string {

    //escape HTML in input
    input = escapeHtml(input);

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
        for (let word of languageObject.getKeywordsSorted()) {
            //console.log(input.substring(i, i + key.length));
            if (input.substring(i, i + word.length) === word) {
                let toInsert =
                 "<div class='tooltip'>" + word + "<span class='tooltiptext'>" 
                 + languageObject.getHint(word)?.getHintInLanguage(spoLang) + "</span></div>"
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