import Hint from "./Hint";
export default interface LanguageInterface {
    getDictionary(): Map<string, Hint>;
    color(input: string): string;
}
