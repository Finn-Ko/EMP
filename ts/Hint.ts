//one Hint that saves the different languages
export default class Hint {
    private german: string;
    private english: string;

    constructor(english: string, german: string) {
        this.english = english;
        this.german = german;
    }

    getHint(language: string): string {
        if (language === "english") {
            return this.english
        }
        else if (language === "german") {
            return this.german;
        }
        else {
            return "Unknown spoken language";
        }
    }
}