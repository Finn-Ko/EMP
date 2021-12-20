import insertHintsEMP from "./highlighterExport.js";
const codeOutputHTML = document.getElementById("codeOutput");
const spoLangSelector = document.getElementById("spoLang");
const proLangSelector = document.getElementById("proLang");
let stringToHighlight = "";
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
function rehighlight() {
    let spoLang = spoLangSelector.value;
    let proLang = proLangSelector.value;
    codeOutputHTML.innerHTML = insertHintsEMP(stringToHighlight, proLang, spoLang);
}
