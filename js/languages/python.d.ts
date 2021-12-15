import LanguageInterface from "../LanguageInterface";
import Hint from "../Hint";
export default class PythonHints implements LanguageInterface {
    private dictionary;
    getDictionary(): Map<string, Hint>;
}
