import PythonLang from './languages/python.js';
let supportedLangs = new Map([
    ["python", new PythonLang()]
]);
function insertHintsEMP(input, proLang, spoLang) {
    var _a;
    if (!spoLang) {
        spoLang = "english";
    }
    if (proLang) {
        proLang = proLang.toLocaleLowerCase();
    }
    else {
        return "No programming language given!";
    }
    spoLang = spoLang.toLocaleLowerCase();
    let languageObject = supportedLangs.get(proLang);
    if (!languageObject) {
        return "Sorry, language is not supported!";
    }
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) === "&") {
            let insert = "&amp;";
            input = [input.slice(0, i), insert, input.slice(i + 1)].join('');
            i += insert.length - 1;
        }
        else if (input.charAt(i) === "<") {
            let insert = "&lt;";
            input = [input.slice(0, i), insert, input.slice(i + 1)].join('');
            i += insert.length - 1;
        }
        else if (input.charAt(i) === ">") {
            let insert = "&gt;";
            input = [input.slice(0, i), insert, input.slice(i + 1)].join('');
            i += insert.length - 1;
        }
        else if (input.charAt(i) === '"') {
            let insert = "&quot;";
            input = [input.slice(0, i), insert, input.slice(i + 1)].join('');
            i += insert.length - 1;
        }
        else if (input.charAt(i) === "'") {
            let insert = "&#039;";
            input = [input.slice(0, i), insert, input.slice(i + 1)].join('');
            i += insert.length - 1;
        }
    }
    input = languageObject.color(input);
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
    return input;
}
export default insertHintsEMP;
