class Trie {
    constructor(words) {
        this.map = {};
        this.isWord = false;
        this.longestKeywordLength = 0;
        if (words) {
            for (let word of words) {
                if (word.length > this.longestKeywordLength) {
                    this.longestKeywordLength = word.length;
                }
                this.add(word, 0, this);
            }
        }
    }
    search(word) {
        return this.find(word, 0, this);
    }
    getLongestLength() {
        return this.longestKeywordLength;
    }
    add(word, index, letterMap) {
        if (index === word.length) {
            letterMap.isWord = true;
            return;
        }
        if (!letterMap.map[word.charAt(index)]) {
            letterMap.map[word.charAt(index)] = new Trie();
        }
        return this.add(word, index + 1, letterMap.map[word.charAt(index)]);
    }
    find(word, index, letterMap) {
        if (!letterMap) {
            return -1;
        }
        else if (letterMap.isWord) {
            let recur = this.find(word, index + 1, letterMap.map[word.charAt(index)]);
            if (recur > -1) {
                return recur;
            }
            else {
                return index;
            }
        }
        else if (letterMap.map[word[index]]) {
            return this.find(word, index + 1, letterMap.map[word.charAt(index)]);
        }
        return -1;
    }
}
export default Trie;
