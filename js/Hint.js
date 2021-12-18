"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hint {
    constructor(english, german) {
        this.english = english;
        this.german = german;
    }
    getHintInLanguage(language) {
        if (language === "english") {
            return this.english;
        }
        else if (language === "german") {
            return this.german;
        }
        else {
            return "Unknown spoken language";
        }
    }
}
exports.default = Hint;
