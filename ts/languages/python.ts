import LanguageInterface from "../LanguageInterface";
import Hint from "../Hint";

//class for the python language
export default class PythonLang implements LanguageInterface {

    public color(input: string): string {
        //1. Mark everything unimportant
        //2. find important things
        //TODO
        return input;
    }
    
    private dictionary = new Map<string, Hint>(
        [
            //exceptions https://docs.python.org/3/library/exceptions.html
            ["AssertionError", new Hint(
                //english:
                "".concat(
                    "Lorem ipsum dolor sit amet, <br>",
                    "consetetur sadipscing elitr, <br>",
                    "sed diam nonumy eirmod tempor <br>",
                    "invidunt ut labore et dolore <br>", 
                    "magna aliquyam erat, <br>",
                    "sed diam voluptua. <br>", 
                    "At vero eos et accusam et <br>",
                    "justo duo dolores et ea rebum. <br>",
                    "Stet clita kasd gubergren, <br>",
                    "no sea takimata sanctus est <br>",
                    "Lorem ipsum dolor sit amet."
                ),
                //german
                "".concat(
                    "Es gab einen Fehler dabei ein \"assert\" <br>",
                    "aus zu führen. <br>",
                    "Dies passiert normal bei <br>",
                    "automatisierten Tests die nicht klappen.<br>",
                    "Suche in der Fehlermeldung nach einer Zeile,<br>",
                    "in der \"assert irgendetwas\" steht.<br>",
                    "Es wurde hier erwartet, dass das \"irgendetwas\"<br>",
                    "Stimmt, also zu True auswertet.<br><br>",
                    "Beispiel: assert x == 6<br>",
                    "Hier wird erwartet, dass x den Wert 6 hat.<br>",
                    "Wenn dies nicht der Fall ist,<br>",
                    "gibt es einen AssertionError"
                )
            )],

            ["AttributeError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["EOFError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["FloatingPointError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["GeneratorExit", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["ImportError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["ModuleNotFoundError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["IndexError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["KeyError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["KeyboardInterrupt", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["MemoryError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["NameError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["NotImplementedError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["OSError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["OverflowError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["RecursionError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["ReferenceError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["RuntimeError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["StopIteration", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["StopAsyncIteration", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["SyntaxError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["IndentationError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["TabError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["SystemError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["SystemExit", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["TypeError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["UnboundLocalError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["UnicodeError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["UnicodeEncodeError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["UnicodeDecodeError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["UnicodeTranslateError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["ValueError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["ZeroDivisionError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["BlockingIOError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["ChildProcessError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["ConnectionError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["BrokenPipeError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["ConnectionAbortedError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["ConnectionRefusedError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["ConnectionResetError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["FileExistsError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["FileNotFoundError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["InterruptedError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["IsADirectoryError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["NotADirectoryError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["PermissionError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["ProcessLookupError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )],

            ["TimeoutError", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )]

            //add keywords too? TODO
        ]);

    public getDictionary(): Map<string, Hint> {
        return new Map<string, Hint>(this.dictionary);
    }

}
