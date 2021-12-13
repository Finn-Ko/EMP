export default interface LanguageInterface {
    //takes (html) string and outputs html string with hints added
    insertHints(input: string): string;
}