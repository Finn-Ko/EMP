"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const highlight_js_1 = __importDefault(require("highlight.js"));
const python_1 = __importDefault(require("./languages/python"));
const supportedLangs = [
    "python",
    "c",
    "fsharp",
    "java",
    "matlab"
];
const codeInputHTML = document.getElementById("codeInput");
const codeOutputHTML = document.getElementById("codeOutput");
window.addEventListener("load", (e) => {
    codeInputHTML.focus();
});
codeInputHTML.addEventListener("input", () => {
    rehighlight();
}, false);
codeInputHTML.addEventListener("paste", (e) => {
    e.preventDefault();
    if (e.clipboardData) {
        let text = e.clipboardData.getData('text/plain');
        codeInputHTML.innerText = text;
        rehighlight();
    }
});
function rehighlight() {
    let hljsOutput = highlight_js_1.default.highlightAuto(codeInputHTML.innerText, supportedLangs);
    console.log("Detected language: " + hljsOutput.language);
    let languageObject = new python_1.default();
    console.log(languageObject.insertTips(""));
    codeOutputHTML.innerHTML = hljsOutput.value;
}
