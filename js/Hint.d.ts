export default class Hint {
    private german;
    private english;
    constructor(english: string, german: string);
    getLanguage(language: string): string;
}
