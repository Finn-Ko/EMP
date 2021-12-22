import Hint from "../Hint.js";
export default class PythonLang {
    constructor() {
        this.dictionary = new Map([
            ["AssertionError", new Hint("".concat("An error occured when an \"assert\" \n", "statement was run. \n", "This usually happens with \n", "failed automated tests. \n", "Different types of asserts exist. \n", "Example: \"assert x == 6\". \n", "It is expected, x has the value 6.", "However if x is not 6 this error\n", "is thrown."), "".concat("Es gab einen Fehler dabei ein \"assert\" \n", "aus zu führen. \n", "Dies passiert normal bei \n", "automatisierten Tests die nicht klappen.\n", "Es gibt verschiedene Arten von asserts.\n", "Beispiel: \"assert x == 6\"\n", "Hier wird erwartet, dass x den Wert 6 hat.\n", "Wenn dies nicht der Fall ist,\n", "gibt es einen AssertionError.\n", "Assert (En) = Behaupten (De)"))],
            ["AttributeError", new Hint("".concat("An Error occured when trying to \n", "use an invalid attribute. \n", "An attribute is something that can \n", "be accessed like so: x.some_attribute\n", "Example: \n", "   x = 5\n", "   x.hello\n", "Will throw this error because the number x\n", "doesn't have a \"hello\" attribute."), "".concat("Es wurde versucht ein unbekanntes\n", "Attribut zu nutzen. \n", "Ein Attribut ist etwas auf das so\n", "zugegriffen wird: x.ein_attribut\n", "Beispiel:\n", "   x = 5\n", "   x.hallo\n", "Wird diesen Fehler ergeben, da die Zahl x\n", "kein Attribut \"hallo\" hat.\n", "Attribute (En) = Attribut / Eigenschaft (De)"))],
            ["EOFError", new Hint("".concat("EOF is short for End Of File.\n", "This error usually occurs when an\n", "input function is interrupted somehow.\n", "Example: input(\"Enter your name: \")\n", "Will raise this error if the user\n", "interrupts the resulting prompt with Ctl + D\n"), "".concat("Dieser Fehler wird normalerweise geworfen,\n", "wenn ein input unterbrochen wird.\n", "Besipiel: input(\"Gib deinen Namen ein: \")\n", "Ergibt diesen Fehler, wenn die resultierende\n", "Aufforderung mit Strg + D unterbrochen wird.\n", "EOF = End Of File (En) = Ende der Datei (De)"))],
            ["FloatingPointError", new Hint("".concat("This exception is currently not in use, how did you end up here?"), "".concat("Dieser Fehler ist zur Zeit ungenutzt, wie bist du hier gelandet?"))],
            ["GeneratorExit", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["ImportError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["ModuleNotFoundError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["IndexError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["KeyError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["KeyboardInterrupt", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["MemoryError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["NameError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["NotImplementedError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["OSError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["OverflowError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["RecursionError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["ReferenceError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["RuntimeError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["StopIteration", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["StopAsyncIteration", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["SyntaxError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["IndentationError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["TabError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["SystemError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["SystemExit", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["TypeError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["UnboundLocalError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["UnicodeError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["UnicodeEncodeError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["UnicodeDecodeError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["UnicodeTranslateError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["ValueError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["ZeroDivisionError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["BlockingIOError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["ChildProcessError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["ConnectionError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["BrokenPipeError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["ConnectionAbortedError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["ConnectionRefusedError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["ConnectionResetError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["FileExistsError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["FileNotFoundError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["InterruptedError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["IsADirectoryError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["NotADirectoryError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["PermissionError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["ProcessLookupError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["TimeoutError", new Hint("".concat("TODO"), "".concat("TODO"))],
            ["Traceback", new Hint("".concat("TODO"), "".concat("TODO"))]
        ]);
        this.keywords = [...this.dictionary.keys()];
        this.keywords.sort(function (a, b) {
            return b.length - a.length;
        });
    }
    getKeywordsSorted() {
        return this.keywords;
    }
    getHint(keyword) {
        return this.dictionary.get(keyword);
    }
    color(input) {
        if (input.substring(0, 9) === "testbook.") {
            input = this.cleanTestbookOutput(input);
        }
        if (input.substring(0, "AssertionError: ".length) === "AssertionError: ") {
            return this.highlightPyTestOutput(input);
        }
        let lines = input.split("\n");
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].substring(0, 9) === "----&gt; ") {
                lines[i] = "<span class='importantEMP'>" + lines[i] + "</span>";
            }
            else if (/\s{6}\d+/.test(lines[i].substring(0, 7))) {
                lines[i] = "<span class='normalEMP'>" + lines[i] + "</span>";
            }
            else if (/-{10}/.test(lines[i].substring(0, 10))) {
                lines[i] = "<span class='normalEMP'>" + lines[i] + "</span>";
            }
            else if (lines[i].includes("<span class='tooltiptextEMP'>")) {
                lines[i] = "<span class='normalEMP'>" + lines[i] + "</span>";
            }
            else if (lines[i].substring(0, 7) === "  File ") {
                let quoteEnd = lines[i].lastIndexOf("&quot;,");
                let lineNumberEnd = lines[i].indexOf(", in ");
                lines[i] =
                    "<span class='normalEMP'>" +
                        "  File &quot;<span class='importantEMP'>" + lines[i].substring(13, quoteEnd) + "</span>" +
                        lines[i].substring(quoteEnd, quoteEnd + 13) + "<span class='importantEMP'>" +
                        lines[i].substring(quoteEnd + 13, lineNumberEnd) + "</span>" + lines[i].substring(lineNumberEnd);
                "</span>";
                if (/\s{4}/.test(lines[i + 1].substring(0, 4))) {
                    lines[i + 1] = "<span class='importantEMP'>" + lines[i + 1] + "</span>";
                    i++;
                }
            }
        }
        input = "<span class='unimportantEMP'>" + lines.join("\n") + "</span>";
        return input;
    }
    cleanTestbookOutput(input) {
        let weird = "#x1B[";
        let lines = input.split("\n");
        let firstOcc = 0;
        while (lines[firstOcc].substring(0, weird.length) !== weird) {
            firstOcc++;
        }
        let lastOcc = firstOcc;
        while (lines[lastOcc].substring(0, weird.length) === weird) {
            lastOcc++;
        }
        lines = lines.slice(firstOcc, lastOcc);
        input = lines.join("\n");
        for (let i = 0; i < input.length; i++) {
            if (input.substring(i, i + weird.length) === weird) {
                let weirdUntil = i + weird.length;
                let maxSearchDepth = weirdUntil + 50;
                while (input.charAt(weirdUntil) !== "m" || weirdUntil > maxSearchDepth) {
                    weirdUntil++;
                }
                weirdUntil++;
                input = [input.slice(0, i), input.slice(weirdUntil)].join("");
                i--;
            }
        }
        return input;
    }
    highlightPyTestOutput(input) {
        let endOfInitialMessage = input.indexOf("\n\n");
        input = input.substring(0, endOfInitialMessage)
            + "</span>" + input.substring(endOfInitialMessage);
        let lines = input.split("\n");
        lines[0] = "<span class='importantEMP'>" + lines[0] + "</span><span class='normalEMP'>";
        let i = 1;
        let messagePresent = false;
        while (lines[i]) {
            if (lines[i].substring(0, 3) === " : ") {
                messagePresent = true;
                lines[i] = "<span class='importantEMP'>" + lines[i];
            }
            i++;
        }
        if (messagePresent) {
            lines[i] = "</span>" + "";
        }
        input = "<span class='unimportantEMP'>" + lines.join("\n") + "</span>";
        return input;
    }
}
