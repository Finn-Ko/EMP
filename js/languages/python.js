"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PythonHints {
    constructor() {
        this.keywords = new Map([
            ["Test", "".concat("Lorem ipsum dolor sit amet, <br>", "consetetur sadipscing elitr, <br>", "sed diam nonumy eirmod tempor <br>", "invidunt ut labore et dolore <br>", "magna aliquyam erat, <br>", "sed diam voluptua. <br>", "At vero eos et accusam et <br>", "justo duo dolores et ea rebum. <br>", "Stet clita kasd gubergren, <br>", "no sea takimata sanctus est <br>", "Lorem ipsum dolor sit amet.")]
        ]);
    }
    insertHints(input) {
        for (let i = 0; i < input.length; i++) {
            for (let [key, value] of this.keywords) {
                if (input.substring(i, i + key.length) === key) {
                    let toInsert = `<div class='hint' onmouseover='showHint(\"` + value + `\")' onmouseout='removeHint()'>` + key + "</div>";
                    input = [input.slice(0, i), toInsert, input.slice(i + key.length)].join('');
                    i += toInsert.length;
                    break;
                }
            }
        }
        return input;
    }
}
exports.default = PythonHints;
