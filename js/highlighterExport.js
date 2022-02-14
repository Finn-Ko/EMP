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
    input = langObj.color(input);
    for (let i = 0; i < input.length; i++) {
        let searchString = input.substring(i, i + langObj.getKeywordsTrie().getLongestLength());
        let foundLength = langObj.getKeywordsTrie().search(searchString);
        if (foundLength > -1) {
            let word = searchString.substring(0, foundLength);
            let toInsert = "<div class='tooltipEMP'>"
                + word
                + "<span class='tooltiptextEMP'>"
                + ((_a = langObj.getHint(word)) === null || _a === void 0 ? void 0 : _a.getLanguage(spoLang))
                + "</span></div>";
            input =
                input.slice(0, i)
                    + toInsert
                    + input.slice(i + foundLength);
            i += toInsert.length;
        }
    }
    return input;
}
export default insertHintsEMP;
