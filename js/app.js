"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const highlight_js_1 = __importDefault(require("highlight.js"));
const codeInputHTML = document.getElementById("codeInput");
window.addEventListener("load", function (event) {
    init();
});
function init() {
    codeInputHTML.focus();
}
const reparseInput = function (mutationsList, observer) {
    let highlighted = highlight_js_1.default.highlightAuto(codeInputHTML.innerHTML);
    console.log("Hallo");
};
const observer = new MutationObserver(reparseInput);
observer.observe(codeInputHTML, { childList: true, subtree: true });
