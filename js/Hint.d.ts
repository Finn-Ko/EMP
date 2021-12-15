export default class Hint {
    private german;
    private english;
    constructor(english: string, german: string);
    getHint(language: string): string;
}
