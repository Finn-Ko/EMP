var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import insertHintsEMP from "./highlighterExport.js";
const codeOutputHTML = document.getElementById("codeOutput");
const spoLangSelector = document.getElementById("spoLang");
const proLangSelector = document.getElementById("proLang");
let stringToHighlight = "";
alert("Test");
document.addEventListener('paste', (e) => {
    if (e.clipboardData) {
        stringToHighlight = (e.clipboardData).getData('text');
        rehighlight();
    }
}, false);
spoLangSelector.addEventListener("change", () => {
    rehighlight();
}, false);
proLangSelector.addEventListener("change", () => {
    rehighlight();
}, false);
codeOutputHTML.addEventListener('contextmenu', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    let text = yield navigator.clipboard.readText();
    if (text) {
        stringToHighlight = text;
        rehighlight();
    }
    return false;
}), false);
function rehighlight() {
    let spoLang = spoLangSelector.value;
    let proLang = proLangSelector.value;
    codeOutputHTML.innerHTML = insertHintsEMP(stringToHighlight, proLang, spoLang);
}
