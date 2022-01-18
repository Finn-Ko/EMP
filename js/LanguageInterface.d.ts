import Hint from "./Hint";
export default interface LanguageInterface {
    getKeywordsSorted(): string[];
    getHint(keyword: string): Hint | undefined;
    color(input: string): string;
}
