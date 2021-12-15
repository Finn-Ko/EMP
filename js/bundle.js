(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hint {
    constructor(english, german) {
        this.english = english;
        this.german = german;
    }
    getHint(language) {
        if (language === "english") {
            return this.english;
        }
        else if (language === "german") {
            return this.german;
        }
        else {
            return "Unknown spoken language";
        }
    }
}
exports.default = Hint;

},{}],2:[function(require,module,exports){
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
    return input;
}
exports.default = insertHintsEMP;

},{"./languages/python":3}],3:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hint_1 = __importDefault(require("../Hint"));
class PythonHints {
    constructor() {
        this.dictionary = new Map([
            ["Test", new Hint_1.default("".concat("Lorem ipsum dolor sit amet, <br>", "consetetur sadipscing elitr, <br>", "sed diam nonumy eirmod tempor <br>", "invidunt ut labore et dolore <br>", "magna aliquyam erat, <br>", "sed diam voluptua. <br>", "At vero eos et accusam et <br>", "justo duo dolores et ea rebum. <br>", "Stet clita kasd gubergren, <br>", "no sea takimata sanctus est <br>", "Lorem ipsum dolor sit amet."), "".concat("Hallo, ich bin Deutsch"))]
        ]);
    }
    getDictionary() {
        return this.dictionary;
    }
}
exports.default = PythonHints;

},{"../Hint":1}]},{},[2]);
