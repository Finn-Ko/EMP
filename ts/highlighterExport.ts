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

    let langObj = supportedLangs.get(proLang);

    if (!langObj) {   
        return "Sorry, language is not supported!";
    }

    let escString = "";

    for (let i = 0; i < input.length; i++) {
        //escape html
        if (input.charAt(i) === "&") {
            escString += "&amp;"
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
    //highlight the message
    input = langObj.color(escString);


    let output = "";
    //benchmark addition
    // let before = input;
    // let startTime = new Date().getTime();
    // for (let amount = 0; amount < 1000; amount++) {
    //     output = "";
    //     input = before;

    //iterate over input and check if it contains keyword from specified index
    for (let i = 0; i < input.length; i++) {
        let insert = input.charAt(i);

        //find keywords and place hints
        for (let word of langObj.getKeywordsSorted()) {
            if (input.substring(i, i + word.length) === word) {
                insert =
                    "<div class='tooltipEMP'>" 
                    + word
                    + "<span class='tooltiptextEMP'>" 
                    + langObj.getHint(word)?.getLanguage(spoLang) 
                    + "</span></div>";

                //continue search after keyword
                i += word.length;
                break;
            }
        }

        output += insert;
    }
    //trie? https://de.wikipedia.org/wiki/Trie

    // benchmark addition
    // }
    // console.log(new Date().getTime() - startTime);
    
    return output;
}

export default insertHintsEMP;