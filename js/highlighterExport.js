import PythonLang from './languages/python.js';
import CLang from './languages/python.js';
let supportedLangs = new Map([
    ["python", new PythonLang()],
    ["c", new CLang()]
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
        let searchString = input.substring(i, i + langObj.getKeywordsTrie().getLongestLength());
        let foundLength = langObj.getKeywordsTrie().search(searchString);
        if (foundLength > -1) {
            let word = searchString.substring(0, foundLength);
            output +=
                "<div class='tooltipEMP'>"
                    + word
                    + "<span class='tooltiptextEMP'>"
                    + ((_a = langObj.getHint(word)) === null || _a === void 0 ? void 0 : _a.getLanguage(spoLang))
                    + "</span></div>";
            i += foundLength - 1;
        }
        else {
            output += input.charAt(i);
        }
    }
    return output;
}
export default insertHintsEMP;
