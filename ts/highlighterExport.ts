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
    }
    //highlight the message
    input = langObj.color(input);

    //benchmark addition
    // let before = input;
    // let startTime = new Date().getTime();
    // for (let amount = 0; amount < 1000; amount++) {
    //     input = before;
    
    //trie https://de.wikipedia.org/wiki/Trie
    //find keywords and place hints
    for (let i = 0; i < input.length; i++) {
        //only search a string that is as long as longest keyword
        let searchString = 
            input.substring(
                i, 
                i + langObj.getKeywordsTrie().getLongestLength()
            );

        let foundLength = langObj.getKeywordsTrie().search(searchString);
        
        //if word was found, place hint in HTML
        if (foundLength > -1) {
            let word = searchString.substring(0, foundLength);

            let toInsert =
                "<div class='tooltipEMP'>" 
                + word
                + "<span class='tooltiptextEMP'>" 
                + langObj.getHint(word)?.getLanguage(spoLang) 
                + "</span></div>";

            input = 
                input.slice(0, i) 
                + toInsert 
                + input.slice(i + foundLength);

            //continue search after insert
            i += toInsert.length;
        }
    }

    //benchmark addition
    // }
    // console.log(new Date().getTime() - startTime);

    //iterate over input and check if it contains keyword from specified index
    //deprecated algorithm, see above for replacement
    // for (let i = 0; i < input.length; i++) {
    //     //find keywords and place hints
    //     for (let word of langObj.getKeywordsSorted()) {
    //         if (input.substring(i, i + word.length) === word) {
    //             let toInsert =
    //                 "<div class='tooltipEMP'>" 
    //                 + word 
    //                 + "<span class='tooltiptextEMP'>" 
    //                 + langObj.getHint(word)?.getLanguage(spoLang) 
    //                 + "</span></div>";

    //             input = 
    //                 input.slice(0, i) 
    //                 + toInsert 
    //                 + input.slice(i + word.length);

    //             //continue search after insert
    //             i += toInsert.length;
    //             break;
    //         }
    //     }
    // }
    
    return input;
}

export default insertHintsEMP;