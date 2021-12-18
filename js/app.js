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
        insertAtCursor(codeInputHTML, "    ");
    }
});
function insertAtCursor(myField, myValue) {
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
    }
    else {
        myField.value += myValue;
    }
}
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function rehighlight() {
    let spoLang = spoLangSelector.value;
    let proLang = proLangSelector.value;
    codeOutputHTML.innerHTML = insertHintsEMP(codeInputHTML.value, proLang, spoLang);
    ;
}
function insertHintsEMP(input, proLang, spoLang) {
    var _a;
    input = escapeHtml(input);
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
        for (let word of languageObject.getKeywordsSorted()) {
            if (input.substring(i, i + word.length) === word) {
                let toInsert = "<div class='tooltipEMP'>" + word + "<span class='tooltiptextEMP'>"
                    + ((_a = languageObject.getHint(word)) === null || _a === void 0 ? void 0 : _a.getHintInLanguage(spoLang)) + "</span></div>";
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
