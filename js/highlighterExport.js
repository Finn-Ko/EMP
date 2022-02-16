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
    let langObj = supportedLangs.get(proLang);
    if (!langObj) {
        return "Sorry, language is not supported!";
    }
    let escString = "";
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) === "&") {
            escString += "&amp;";
        }
        else if (input.charAt(i) === "<") {
            escString += "&lt;";
        }
        else if (input.charAt(i) === ">") {
            escString += "&gt;";
        }
        else if (input.charAt(i) === '"') {
            escString += "&quot;";
        }
        else if (input.charAt(i) === "'") {
            escString += "&#039;";
        }
        else {
            escString += input.charAt(i);
        }
    }
    input = langObj.color(escString);
    let output = "";
    for (let i = 0; i < input.length; i++) {
        let insert = input.charAt(i);
        for (let word of langObj.getKeywordsSorted()) {
            if (input.substring(i, i + word.length) === word) {
                insert =
                    "<div class='tooltipEMP'>"
                        + word
                        + "<span class='tooltiptextEMP'>"
                        + ((_a = langObj.getHint(word)) === null || _a === void 0 ? void 0 : _a.getLanguage(spoLang))
                        + "</span></div>";
                i += word.length;
                break;
            }
        }
        output += insert;
    }
    return output;
}
export default insertHintsEMP;
