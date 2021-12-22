import LanguageInterface from "../LanguageInterface";
import Hint from "../Hint.js";

//class for the python language
export default class PythonLang implements LanguageInterface {

    //only sort once when object is created
    constructor() {
        this.keywords = [ ...this.dictionary.keys() ];
        this.keywords.sort(function(a, b){
            // ASC  -> a.length - b.length
            // DESC -> b.length - a.length
            return b.length - a.length;
        });
    }

    public getKeywordsSorted(): string[] {
        return this.keywords;
    }

    public getHint(keyword: string): Hint | undefined{
        return this.dictionary.get(keyword);
    }
    
    public color(input: string): string {

        //testbook output requires special attention
        if (input.substring(0, 9) === "testbook.") {
            input = this.cleanTestbookOutput(input);
        }

        // failed tests require special attention
        if (input.substring(0, "AssertionError: ".length) === "AssertionError: ") {
            return this.highlightPyTestOutput(input);
        }

        let lines = input.split("\n");

        for (let i = 0; i < lines.length; i++) {
            //the ----> marking the imortant line
            if (lines[i].substring(0, 9) === "----&gt; ") {
                lines[i] = "<span class='importantEMP'>" + lines[i] + "</span>";
                // console.log(lines[i] + " EINS");
            }
            //tab and then one number for the line
            else if (/\s{6}\d+/.test(lines[i].substring(0, 7))) {
                lines[i] = "<span class='normalEMP'>" + lines[i] + "</span>";
                // console.log(lines[i] + " ZWEI");
            }
            //the ------ line that seperates python errors
            else if (/-{10}/.test(lines[i].substring(0, 10))) {
                lines[i] = "<span class='normalEMP'>" + lines[i] + "</span>";
                // console.log(lines[i] + " DREI");
            }
            //if a keyword is present, this might need to be changed
            else if (lines[i].includes("<span class='tooltiptextEMP'>")) {
                lines[i] = "<span class='normalEMP'>" + lines[i] + "</span>";
                // console.log(lines[i] + " VIER");
            }
            //for a different style which is marked like this
            else if (lines[i].substring(0, 7) === "  File ") {
                let quoteEnd = lines[i].lastIndexOf("&quot;,");
                let lineNumberEnd = lines[i].indexOf(", in ");
                lines[i] = 
                    "<span class='normalEMP'>" +
                    //the filename is marked, it comes after "  File &quot;"
                    "  File &quot;<span class='importantEMP'>" + lines[i].substring(13, quoteEnd) + "</span>" +
                    //the line number is marked
                    lines[i].substring(quoteEnd, quoteEnd + 13) + "<span class='importantEMP'>" + 
                    lines[i].substring(quoteEnd + 13, lineNumberEnd) + "</span>" + lines[i].substring(lineNumberEnd);
                    "</span>";

                //the next line contains the code if it starts with four spaces
                if (/\s{4}/.test(lines[i + 1].substring(0, 4))) {
                    lines[i + 1] = "<span class='importantEMP'>" + lines[i + 1] + "</span>";
                    i++;
                }
                // console.log(lines[i] + " FUENF");
            }
        }

        //Mark everything else unimportant
        input = "<span class='unimportantEMP'>" + lines.join("\n") + "</span>"

        return input;
    }

    private cleanTestbookOutput(input: string): string {
        
        let weird = "#x1B[";

        //filter only the relevant part, which starts with the weird string
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

        //remove all of the weird strings from input,
        for (let i = 0; i < input.length; i++) {
            if (input.substring(i, i + weird.length) === weird) {

                let weirdUntil = i + weird.length;
                let maxSearchDepth = weirdUntil + 50;

                //weird string always ends with m
                while (input.charAt(weirdUntil) !== "m" || weirdUntil > maxSearchDepth) {
                    weirdUntil++;
                }
                weirdUntil++;

                input = [input.slice(0, i), input.slice(weirdUntil)].join("");
                
                //search again from same position
                i--;
            }
        }
        return input;
    }

    private highlightPyTestOutput(input: string): string {

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

        //Mark everything else unimportant
        input = "<span class='unimportantEMP'>" + lines.join("\n") + "</span>"

        return input;
    }

    private keywords: string[];
    
    private dictionary = new Map<string, Hint>(
        [
            //exceptions https://docs.python.org/3/library/exceptions.html
            ["AssertionError", new Hint(
                //english:
                "".concat(
                    "An error occured when an \"assert\" \n",
                    "statement was run. \n",
                    "This usually happens with \n",
                    "failed automated tests. \n", 
                    "Different types of asserts exist. \n",
                    "Example: \"assert x == 6\". \n", 
                    "It is expected, x has the value 6.",
                    "However if x is not 6 this error\n",
                    "is thrown."
                ),
                //german
                "".concat(
                    "Es gab einen Fehler dabei ein \"assert\" \n",
                    "aus zu führen. \n",
                    "Dies passiert normal bei \n",
                    "automatisierten Tests die nicht klappen.\n",
                    "Es gibt verschiedene Arten von asserts.\n",
                    "Beispiel: \"assert x == 6\"\n",
                    "Hier wird erwartet, dass x den Wert 6 hat.\n",
                    "Wenn dies nicht der Fall ist,\n",
                    "gibt es einen AssertionError.\n",
                    "Assert (En) = Behaupten (De)"
                )
            )],

            ["AttributeError", new Hint(
                //english:
                "".concat(
                    "An Error occured when trying to \n",
                    "use an invalid attribute. \n",
                    "An attribute is something that can \n",
                    "be accessed like so: x.some_attribute\n",
                    "Example: \n",
                    "   x = 5\n",
                    "   x.hello\n",
                    "Will throw this error because the number x\n",
                    "doesn't have a \"hello\" attribute."
                ),
                //german
                "".concat(
                    "Es wurde versucht ein unbekanntes\n",
                    "Attribut zu nutzen. \n",
                    "Ein Attribut ist etwas auf das so\n",
                    "zugegriffen wird: x.ein_attribut\n",
                    "Beispiel:\n",
                    "   x = 5\n",
                    "   x.hallo\n",
                    "Wird diesen Fehler ergeben, da die Zahl x\n",
                    "kein Attribut \"hallo\" hat.\n",
                    "Attribute (En) = Attribut / Eigenschaft (De)"
                )
            )],

            ["EOFError", new Hint(
                //english:
                "".concat(
                    "EOF is short for End Of File.\n",
                    "This error usually occurs when an\n",
                    "input function is interrupted somehow.\n",
                    "Example: input(\"Enter your name: \")\n",
                    "Will raise this error if the user\n",
                    "interrupts the resulting prompt with Ctl + D\n"
                ),
                //german
                "".concat(
                    "Dieser Fehler wird normalerweise geworfen,\n",
                    "wenn ein input unterbrochen wird.\n",
                    "Besipiel: input(\"Gib deinen Namen ein: \")\n",
                    "Ergibt diesen Fehler, wenn die resultierende\n",
                    "Aufforderung mit Strg + D unterbrochen wird.\n",
                    "EOF = End Of File (En) = Ende der Datei (De)"
                )
            )],

            ["FloatingPointError", new Hint(
                //english:
                "".concat(
                    "This exception is currently not in use, how did you end up here?"
                ),
                //german
                "".concat(
                    "Dieser Fehler ist zur Zeit ungenutzt, wie bist du hier gelandet?"
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
            )],

            //add keywords too? TODO

            ["Traceback", new Hint(
                //english:
                "".concat(
                    "TODO"
                ),
                //german
                "".concat(
                    "TODO"
                )
            )]
        ]);

}
