"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const highlight_js_1 = __importDefault(require("highlight.js"));
const python_1 = __importDefault(require("./languages/python"));
let supportedLangs = new Map([
    ["python", new python_1.default()]
]);
const codeInputHTML = document.getElementById("codeInput");
const codeOutputHTML = document.getElementById("codeOutput");
window.addEventListener("load", (e) => {
    codeInputHTML.focus();
});
codeInputHTML.addEventListener("input", () => {
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
    let output = insertHintsEMP(codeInputHTML.innerHTML, undefined, "python");
    codeOutputHTML.innerHTML = output;
}
function insertHintsEMP(input, spoLang, proLang) {
    let hljsOutput;
    if (!proLang) {
        hljsOutput = highlight_js_1.default.highlightAuto(codeInputHTML.innerText, [...supportedLangs.keys()]);
        if (hljsOutput.language) {
            proLang = hljsOutput.language;
            input = hljsOutput.value;
        }
        else {
            return "Unknown language";
        }
    }
    else {
        hljsOutput = highlight_js_1.default.highlightAuto(codeInputHTML.innerText, [proLang]);
        if (!hljsOutput.language) {
            return "Cannot highlight with given language";
        }
    }
    if (!spoLang) {
        spoLang = "english";
    }
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
    return input;
}
exports.default = insertHintsEMP;
