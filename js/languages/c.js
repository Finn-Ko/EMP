import Hint from "../Hint.js";
import Trie from "../Trie.js";
export default class CLang {
    constructor() {
        this.dictionary = new Map([
            ["AddressSanitizer", new Hint(`TODO`, `TODO`)],
            ["LeakSanitizer", new Hint(`TODO`, `TODO`)],
        ]);
        this.keywordsTrie = new Trie(this.dictionary.keys());
    }
    getKeywordsTrie() {
        return this.keywordsTrie;
    }
    getHint(keyword) {
        return this.dictionary.get(keyword);
    }
    color(input) {
        return input;
    }
}
