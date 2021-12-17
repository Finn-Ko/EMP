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
function rehighlight() {
    let spoLang = spoLangSelector.value;
    let proLang = proLangSelector.value;
    codeOutputHTML.innerHTML = insertHintsEMP(codeInputHTML.value, proLang, spoLang);
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

},{"./languages/python":3}],3:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hint_1 = __importDefault(require("../Hint"));
class PythonLang {
    constructor() {
        this.dictionary = new Map([
            ["AssertionError", new Hint_1.default("".concat("An error occured when an \"assert\" <br>", "statement was run. <br>", "This usually happens with <br>", "failed automated tests. <br>", "Look for a line of code that <br>", "reads \"assert something\". <br>", "It was expected, that \"something\" <br>", "would turn out to be true. <br>", "Stet clita kasd gubergren, <br>", "no sea takimata sanctus est <br>", "Lorem ipsum dolor sit amet."), "".concat("Es gab einen Fehler dabei ein \"assert\" <br>", "aus zu führen. <br>", "Dies passiert normal bei <br>", "automatisierten Tests die nicht klappen.<br>", "Suche in der Fehlermeldung nach einer Zeile,<br>", "in der \"assert irgendetwas\" steht.<br>", "Es wurde hier erwartet, dass das \"irgendetwas\"<br>", "Stimmt, also zu True auswertet.<br><br>", "Beispiel: assert x == 6<br>", "Hier wird erwartet, dass x den Wert 6 hat.<br>", "Wenn dies nicht der Fall ist,<br>", "gibt es einen AssertionError"))],
            ["AttributeError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["EOFError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["FloatingPointError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["GeneratorExit", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["ImportError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["ModuleNotFoundError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["IndexError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["KeyError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["KeyboardInterrupt", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["MemoryError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["NameError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["NotImplementedError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["OSError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["OverflowError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["RecursionError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["ReferenceError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["RuntimeError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["StopIteration", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["StopAsyncIteration", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["SyntaxError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["IndentationError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["TabError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["SystemError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["SystemExit", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["TypeError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["UnboundLocalError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["UnicodeError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["UnicodeEncodeError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["UnicodeDecodeError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["UnicodeTranslateError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["ValueError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["ZeroDivisionError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["BlockingIOError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["ChildProcessError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["ConnectionError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["BrokenPipeError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["ConnectionAbortedError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["ConnectionRefusedError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["ConnectionResetError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["FileExistsError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["FileNotFoundError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["InterruptedError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["IsADirectoryError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["NotADirectoryError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["PermissionError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["ProcessLookupError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))],
            ["TimeoutError", new Hint_1.default("".concat("TODO"), "".concat("TODO"))]
        ]);
    }
    color(input) {
        let lines = input.split("\n");
        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i] + "WAS";
        }
        input = "<span style='color: #484848;'>" + lines.join("\n") + "</span>";
        return input;
    }
    getDictionary() {
        return new Map(this.dictionary);
    }
}
exports.default = PythonLang;

},{"../Hint":1}]},{},[2]);
