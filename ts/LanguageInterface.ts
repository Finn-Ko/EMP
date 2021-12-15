import Hint from "./Hint";

export default interface LanguageInterface {
    //takes (html) string and outputs html string with hints added
    getDictionary(): Map<string, Hint>;
}