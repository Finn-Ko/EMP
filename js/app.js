"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const python_1 = __importDefault(require("./languages/python"));
let supportedLangs = new Map([
    ["python", new python_1.default()]
]);
const codeInputHTML = document.getElementById("codeInput");
const codeOutputHTML = document.getElementById("codeOutput");
const spoLangSelector = document.getElementById("spoLang");
const proLangSelector = document.getElementById("proLang");
window.addEventListener("load", (e) => {
    codeInputHTML.focus();
});
codeInputHTML.addEventListener("input", () => {
    rehighlight();
}, false);
spoLangSelector.addEventListener("change", () => {
    rehighlight();
}, false);
proLangSelector.addEventListener("change", () => {
    rehighlight();
}, false);
window.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        codeOutputHTML.innerHTML = "The tab key doens't work yet, sorry. \nUse spaces instead";
    }
});
codeInputHTML.addEventListener("paste", (e) => {
    e.preventDefault();
    if (e.clipboardData) {
        let text = e.clipboardData.getData('text/plain');
        codeInputHTML.innerText = text;
        rehighlight();
    }
});
function rehighlight() {
    let spoLang = spoLangSelector.value;
    let proLang = proLangSelector.value;
    codeOutputHTML.innerHTML = insertHintsEMP(codeInputHTML.innerHTML, proLang, spoLang);
    ;
}
function insertHintsEMP(input, proLang, spoLang) {
    if (!spoLang) {
        spoLang = "english";
    }
    proLang = proLang.toLocaleLowerCase();
    spoLang = spoLang.toLocaleLowerCase();
    let languageObject = supportedLangs.get(proLang);
    if (!languageObject) {
        return "Language not supported";
    }
    for (let i = 0; i < input.length; i++) {
        for (let [word, entry] of languageObject.getDictionary()) {
            if (input.substring(i, i + word.length) === word) {
                let toInsert = "<div class='tooltip'>" + word + "<span class='tooltiptext'>"
                    + entry.getHint(spoLang) + "</span></div>";
                input = [input.slice(0, i), toInsert, input.slice(i + word.length)].join('');
                i += toInsert.length;
                break;
            }
        }
    }
    input = languageObject.color(input);
    return input;
}
exports.default = insertHintsEMP;
