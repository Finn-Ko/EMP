import LanguageInterface from "../LanguageInterface";
import Hint from "../Hint.js";
import Trie from "../Trie.js";

//class for the c language
export default class CLang implements LanguageInterface {

    private keywordsTrie: Trie;
    
    constructor() {
        this.keywordsTrie = new Trie(this.dictionary.keys());
    }
    
    public getKeywordsTrie(): Trie {
        return this.keywordsTrie;
    }

    public getHint(keyword: string): Hint | undefined {
        return this.dictionary.get(keyword);
    }

    public color(input: string): string {
        if (!input) {
            return "";
        }

        let lines = input.split("\n");

        let i = 0;
        while (i < lines.length && !/^=+$/.test(lines[i])) {
            i++;
        }

        //everything not marked otherwise is unimportant
        lines[i] = "<span class='unimportantEMP'>" + lines[i];


        //==1==ERROR: line is important
        i++;
        if (lines[i].substring(0, 11) === "==1==ERROR:") {
            lines[i] = "<span class='importantEMP'>" + lines[i] + "</span>";
        }

        while (i < lines.length) {
            //summary is important
            if (/^SUMMARY/.test(lines[i])) {
                lines[i] = "<span class='importantEMP'>" + lines[i] + "</span>";
            }

            //every line that doesn't start blank should be visible
            else if (!/^ /.test(lines[i])) {
                lines[i] = "<span class='normalEMP'>" + lines[i] + "</span>";
            }

            i++;
        }
        
        lines[lines.length - 1] += "</span>";
        input = lines.join('\n');
        return input;
    }

    private dictionary = new Map<string, Hint>(
        [
            ["AddressSanitizer", new Hint(
                //english:
                `TODO`,

                //german
                `TODO`
            )],

            ["LeakSanitizer", new Hint(
                //english:
                `TODO`,

                //german
                `TODO`
            )],
        ]
    );

}