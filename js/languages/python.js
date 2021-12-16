"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hint_1 = __importDefault(require("../Hint"));
class PythonLang {
    constructor() {
        this.dictionary = new Map([
            ["AssertionError", new Hint_1.default("".concat("Lorem ipsum dolor sit amet, <br>", "consetetur sadipscing elitr, <br>", "sed diam nonumy eirmod tempor <br>", "invidunt ut labore et dolore <br>", "magna aliquyam erat, <br>", "sed diam voluptua. <br>", "At vero eos et accusam et <br>", "justo duo dolores et ea rebum. <br>", "Stet clita kasd gubergren, <br>", "no sea takimata sanctus est <br>", "Lorem ipsum dolor sit amet."), "".concat("Es gab einen Fehler dabei ein \"assert\" <br>", "aus zu führen. <br>", "Dies passiert normal bei <br>", "automatisierten Tests die nicht klappen.<br>", "Suche in der Fehlermeldung nach einer Zeile,<br>", "in der \"assert irgendetwas\" steht.<br>", "Es wurde hier erwartet, dass das \"irgendetwas\"<br>", "Stimmt, also zu True auswertet.<br><br>", "Beispiel: assert x == 6<br>", "Hier wird erwartet, dass x den Wert 6 hat.<br>", "Wenn dies nicht der Fall ist,<br>", "gibt es einen AssertionError"))],
            ["AttributeError", new Hint_1.default("".concat("Lorem ipsum dolor sit amet, <br>", "consetetur sadipscing elitr, <br>", "sed diam nonumy eirmod tempor <br>", "invidunt ut labore et dolore <br>", "magna aliquyam erat, <br>", "sed diam voluptua. <br>", "At vero eos et accusam et <br>", "justo duo dolores et ea rebum. <br>", "Stet clita kasd gubergren, <br>", "no sea takimata sanctus est <br>", "Lorem ipsum dolor sit amet."), "".concat("Hallo, ich bin Deutsch"))]
        ]);
    }
    color(input) {
        return input + "TODO";
    }
    getDictionary() {
        return new Map(this.dictionary);
    }
}
exports.default = PythonLang;
