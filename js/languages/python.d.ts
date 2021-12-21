import LanguageInterface from "../LanguageInterface";
import Hint from "../Hint.js";
export default class PythonLang implements LanguageInterface {
    constructor();
    getKeywordsSorted(): string[];
    getHint(keyword: string): Hint | undefined;
    color(input: string): string;
    private cleanTestbookOutput;
    private highlightPyTestOutput;
    private keywords;
    private dictionary;
}
