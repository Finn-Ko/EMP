import Hint from "./Hint";
import Trie from "./Trie";

export default interface LanguageInterface {
    //returns keywords sorted in descending order
    //the sorting is best done once in cosntructor for performance reasons
    getKeywordsTrie(): Trie;

    //just passes through to the internal dictionary
    getHint(keyword: string): Hint | undefined;

    //takes string and outputs html string with coloring added
    color(input: string): string;
}