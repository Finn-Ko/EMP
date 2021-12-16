import Hint from "./Hint";

export default interface LanguageInterface {
    //getter for language dictionary
    getDictionary(): Map<string, Hint>;

    //takes (html) string and outputs html string with coloring added
    color(input: string): string;
}