"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hint_1 = __importDefault(require("../Hint"));
class PythonHints {
    constructor() {
        this.dictionary = new Map([
            ["Test", new Hint_1.default("".concat("Lorem ipsum dolor sit amet, <br>", "consetetur sadipscing elitr, <br>", "sed diam nonumy eirmod tempor <br>", "invidunt ut labore et dolore <br>", "magna aliquyam erat, <br>", "sed diam voluptua. <br>", "At vero eos et accusam et <br>", "justo duo dolores et ea rebum. <br>", "Stet clita kasd gubergren, <br>", "no sea takimata sanctus est <br>", "Lorem ipsum dolor sit amet."), "".concat("Hallo, ich bin Deutsch"))]
        ]);
    }
    getDictionary() {
        return this.dictionary;
    }
}
exports.default = PythonHints;
