import LanguageInterface from "../LanguageInterface";
import Hint from "../Hint";
export default class PythonLang implements LanguageInterface {
    color(input: string): string;
    private dictionary;
    getDictionary(): Map<string, Hint>;
}
