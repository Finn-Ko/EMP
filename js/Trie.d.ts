declare class Trie {
    private map;
    private isWord;
    private longestKeywordLength;
    constructor(words?: IterableIterator<string>);
    search(word: string): number;
    getLongestLength(): number;
    private add;
    private find;
}
export default Trie;
