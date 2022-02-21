import LanguageInterface from "../LanguageInterface";
import Hint from "../Hint.js";
import Trie from "../Trie.js";
export default class CLang implements LanguageInterface {
    private keywordsTrie;
    constructor();
    getKeywordsTrie(): Trie;
    getHint(keyword: string): Hint | undefined;
    color(input: string): string;
    private dictionary;
}
