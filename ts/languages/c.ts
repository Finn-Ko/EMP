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