import LanguageInterface from "../LanguageInterface";

//class for the python language
export default class Python implements LanguageInterface {
    
    private keywords = 
        [
            "if", 
            "return"
        ];

    insertTips(input: string): string {
        return "TODO" + this.keywords.join;
    }
}
