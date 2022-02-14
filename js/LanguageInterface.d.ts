import Hint from "./Hint";
import Trie from "./Trie";
export default interface LanguageInterface {
    getKeywordsTrie(): Trie;
    getHint(keyword: string): Hint | undefined;
    color(input: string): string;
}
