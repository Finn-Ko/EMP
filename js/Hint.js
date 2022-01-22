export default class Hint {
    constructor(english, german) {
        this.english = english;
        this.german = german;
    }
    getHintInLanguage(language) {
        if (language === "english") {
            return this.english;
        }
        else if (language === "german" && this.german) {
            return this.german;
        }
        else {
            return this.english;
        }
    }
}
