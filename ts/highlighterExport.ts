import LanguageInterface from './LanguageInterface';
import PythonLang from './languages/python.js';

//Supported languages, add new additions here and import files above
let supportedLangs = new Map<string, LanguageInterface>(
    [
        //add new languages here
        ["python", new PythonLang()]

    ]);

function insertHintsEMP(input: string, proLang: string, spoLang?: string ): string {

    //default spoken languge is english if not given otherwise
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

    //iterate over input and check if it contains keyword from specified index
    for (let i = 0; i < input.length; i++) {
        //escape html
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

        //find keywords and place hints
        else {
            for (let word of languageObject.getKeywordsSorted()) {
                //console.log(input.substring(i, i + key.length));
                if (input.substring(i, i + word.length) === word) {
                    let toInsert =
                    "<div class='tooltipEMP'>" + word + "<span class='tooltiptextEMP'>" 
                    + languageObject.getHint(word)?.getHintInLanguage(spoLang) + "</span></div>"
                    input = [input.slice(0, i), toInsert, input.slice(i + word.length)].join('');
                    i += toInsert.length;
                    break;
                }
            }
        }
    }
    //trie? https://de.wikipedia.org/wiki/Trie

    input = languageObject.color(input);
    
    return input;
}

export default insertHintsEMP;