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
        if (!input) {
            return "";
        }
        let lines = input.split("\n");
        let i = 0;
        while (i < lines.length && !/^=+$/.test(lines[i])) {
            i++;
        }
        lines[i] = "<span class='unimportantEMP'>" + lines[i];
        i++;
        if (lines[i].substring(0, 11) === "==1==ERROR:") {
            lines[i] = "<span class='importantEMP'>" + lines[i] + "</span>";
        }
        while (i < lines.length) {
            if (/^SUMMARY/.test(lines[i])) {
                lines[i] = "<span class='importantEMP'>" + lines[i] + "</span>";
            }
            else if (!/^ /.test(lines[i])) {
                lines[i] = "<span class='normalEMP'>" + lines[i] + "</span>";
            }
            i++;
        }
        lines[lines.length - 1] += "</span>";
        input = lines.join('\n');
        return input;
    }
}
