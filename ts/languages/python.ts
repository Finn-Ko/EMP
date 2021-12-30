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
            //the ----> marking the important line
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
            //for a different style which is marked like this
            else if (lines[i].substring(0, 7) === "  File ") {
                let quoteEnd = lines[i].lastIndexOf("&quot;,");
                let lineNumberEnd = lines[i].indexOf(", in");
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
                    "Example: assert x == 6. \n", 
                    "It is expected, that x has the value 6.\n",
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
                    "Beispiel: assert x == 6\n",
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
                    "This exception should not be thrown.\n",
                    "Do you perhaps catch it\n",
                    "or throw it yourself somewhere?"
                ),
                //german
                "".concat(
                    "Dieser Fehler sollte nicht geworfen werden.\n",
                    "Catcht oder throwst du ihn selbst irgendwo?"
                )
            )],

            ["ImportError", new Hint(
                //english:
                "".concat(
                    "Something that you are trying to import\n",
                    "doesn't load properly.\n",
                    "Did you change something about the files of\n",
                    "the module you are trying to import?"
                ),
                //german
                "".concat(
                    "Etwas, dass du importieren möchtest\n",
                    "kann nicht richtig geladen werden.\n",
                    "Hast du an den zugehörigen Dateien\n",
                    "etwas verändert?"
                )
            )],

            ["ModuleNotFoundError", new Hint(
                //english:
                "".concat(
                    "A module that your are trying to import\n",
                    "can't be found.\n",
                    "Did you make a typo, or have you\n",
                    "possibly not installed it?",
                    "Example: import some_module\n",
                    "Will throw this error when\n",
                    "some_module can't be found"
                ),
                //german
                "".concat(
                    "Ein Modul, dass du importieren möchtest,\n",
                    "kann nicht gefunden werden.\n",
                    "Hast du vielleicht einen Tippfehler gemacht,\n",
                    "oder das Modul nicht installiert?\n",
                    "Beispiel: import ein_modul\n",
                    "Wird diesen Fehler ergeben,\n",
                    "wenn ein_modul nicht gefunden wird.\n",
                    "Module (En) = Modul / Bauelement (De)"
                )
            )],

            ["IndexError", new Hint(
                //english:
                "".concat(
                    "You are trying to access an index\n",
                    "that can't be accessed.\n",
                    "Remember that in programming\n",
                    "we start counting from zero!\n",
                    "So the last element of a list is at\n",
                    "it's length - 1 and the first one at 0\n",
                    "Example:\n",
                    "   x = [\"A\", \"B\"]\n",
                    "   print(x[2])\n",
                    "Will throw this error, as the list x\n",
                    "only has the indices 0 and 1 for A and B."

                ),
                //german
                "".concat(
                    "Du versuchst eine Stelle zu nutzen,\n",
                    "die nicht existiert.\n",
                    "Vergiss nicht, dass beim Programmieren\n",
                    "bei Null angefangen wird zu zählen!\n",
                    "Das letzte Element einer Liste ist also\n",
                    "bei ihrer Länge - 1 und das erste bei 0.\n",
                    "Beispiel:\n",
                    "   x = [\"A\", \"B\"]\n",
                    "   print(x[2])\n",
                    "Wird diesen Fehler ergeben, weil die Liste x\n",
                    "nur die Stellen 0 und 1 für A und B hat.\n",
                    "index (En) = Index / Verzeichnis (De)"
                )
            )],

            ["KeyError", new Hint(
                //english:
                "".concat(
                    "You are trying to access a key in a dictionary,\n",
                    "that doesn't contain the key.\n",
                    "Did you possibly make a typo?\n",
                    "Example:\n",
                    "   x = {\"my_key\": \"Hello\"}\n",
                    "   x[\"wrong_key\"]\n",
                    "Will throw this error, as the dictionary x\n",
                    "doesn't contain the wrong_key.\n",
                    "It only contains my_key."
                ),
                //german
                "".concat(
                    "Du versuchts einen Wert in einem Dictionary\n",
                    "zu nutzen, der darin nicht existiert.\n",
                    "Beispiel:\n",
                    "   x = {\"mein_key\": \"Hello\"}\n",
                    "   x[\"falscher_key\"]\n",
                    "Wird diesen Fehler produzieren, da das Dictionary\n",
                    "nicht falscher_key enthält.\n",
                    "Es enthält nur mein_key.\n",
                    "key (En) = Schlüssel (De)\n",
                    "dictionary (En) = Wörterbuch (De)"
                )
            )],

            ["KeyboardInterrupt", new Hint(
                //english:
                "".concat(
                    "The execution was interrupted by keyboard input.\n",
                    "Did you accidentally press Ctrl + C or delete?"
                ),
                //german
                "".concat(
                    "Die Ausführung wurde durch eine\n",
                    "Tastatur eingabe Unterbrochen.\n",
                    "Hast du ausversehen Str + C\n",
                    "oder Entfernen gedrückt?\n",
                    "keyboard (En) = Tastatur (De)\n",
                    "interrupt (En) = Unterbrechung (De)"
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
                    "This error is thrown, when you\n",
                    "try to use something, that is not\n",
                    "yet defined.\n",
                    "Did you make a typo, or have you\n",
                    "declared a variable after using it?\n",
                    "Example: print(a)\n",
                    "will throw this error, if a is not defined."
                ),
                //german
                "".concat(
                    "Dieser Fehler ergibt sich, wenn\n",
                    "man versucht etwas zu nutzen,\n",
                    "das noch nicht definiert ist.\n",
                    "Hast du einen Schreibfehler gemacht,\n",
                    "oder nutzt du evtl. eine Variable bevor\n",
                    "sie definiert wurde?\n",
                    "Beispiel: print(a)\n",
                    "Wird diesen Fehler ergeben,\n",
                    "wenn a nicht definiert ist."
                )
            )],

            ["NotImplementedError", new Hint(
                //english:
                "".concat(
                    "You are trying to use a function,\n",
                    "that is not yet implemented,\n",
                    "but that is supposed to be."
                ),
                //german
                "".concat(
                    "Du versucht eine Funktion zu nutzen,\n",
                    "die noch nicht implementiert ist\n",
                    "es aber sein sollte."
                )
            )],

            ["OSError", new Hint(
                //english:
                "".concat(
                    "Something connected to the operating system\n",
                    "went wrong. You need to figure this out\n",
                    "on your own with the error message, sorry!"
                ),
                //german
                "".concat(
                    "Etwas im Zusammehang mit dem Betriebssystem\n",
                    "ist schiefgelaufen. Du musst selber mit dieser\n",
                    "Fehlermeldung herausfinden was, sorry!"
                )
            )],

            ["OverflowError", new Hint(
                //english:
                "".concat(
                    "Something is overflowing,\n",
                    "this means it's becoming too large.\n",
                    "Example:\n",
                    "   import math\n",
                    "   print(math.exp(1000))\n",
                    "Causes this error,\n",
                    "as the value of math.exp(1000) is too large."
                ),
                //german
                "".concat(
                    "Etwas wird zu groß.\n",
                    "Beispiel:\n",
                    "   import math\n",
                    "   print(math.exp(1000))\n",
                    "Ergibt diesen Fehler,\n",
                    "da der Wert von math.exp(1000) zu groß ist.\n",
                    "overflow (En) = Überlauf (De)"
                )
            )],

            ["RecursionError", new Hint(
                //english:
                "".concat(
                    "This error occurs, when a function calls itself\n",
                    "too many times in a row.\n",
                    "The usual maximum amount is 1000 times.\n",
                    "Is it possible that your function never stops\n",
                    "calling itself?",
                    "Example:\n",
                    "   def function():\n",
                    "       return function():\n",
                    "   funciton()\n",
                    "will throw this exception, as it will\n",
                    "infinitely call itself."
                ),
                //german
                "".concat(
                    "Dieser Fehler ensteht, wenn sich eine Funktion\n",
                    "selbst zu oft hintereinander aufruft\n",
                    "Das normale Maximum ist 1000 mal.\n",
                    "Ist es möglich, dass deine Funktion nie\n",
                    "aufhört sich selbst aufzurufen?\n",
                    "Beispiel:\n",
                    "   def funktion():\n",
                    "       return funktion():\n",
                    "   funktion()\n",
                    "wird diesen Fehler ergeben, da sich\n",
                    "die Funktion unendlich oft selbst aufruft.\n",
                    "recurisive (En) = rekursiv / selbstaufrufend (De)"
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
                    "Something went wrong when your code was run,\n",
                    "and no other exception fits it.\n",
                    "Read what it says after this in your traceback."
                ),
                //german
                "".concat(
                    "Etwas ist schiefgelaufen, während dein Programm\n",
                    "ausfegührt wurde und kein anderer Fehler passt.\n",
                    "Lies dir durch was hier nach in deinem traceback steht.\n",
                    "runtime (En) = Laufzeit (De)"
                )
            )],

            ["StopIteration", new Hint(
                //english:
                "".concat(
                    "TODO https://www.w3schools.com/python/gloss_python_iterator_stop.asp"
                ),
                //german
                "".concat(
                    "TODO https://www.w3schools.com/python/gloss_python_iterator_stop.asp"
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
                    "You wrote invalid python code somewhere.\n",
                    "Example: a = 1 +% 2\n",
                    "will throw this exception,\n",
                    "as +% is not valid python."
                ),
                //german
                "".concat(
                    "Du hast falschen Python code geschrieben.\n",
                    "Beispiel: a = 1 +% 2\n",
                    "wird diesen Fehler ergeben,\n",
                    "da +% kein richtiges Python ist."
                )
            )],

            ["IndentationError", new Hint(
                //english:
                "".concat(
                    "You indentation is wrong somewhere.\n"
                ),
                //german
                "".concat(
                    "Deine Einrückung ist falsch.\n",
                    "indentation (En) = Einrückung (De)"
                )
            )],

            ["TabError", new Hint(
                //english:
                "".concat(
                    "Looks like you mixed tab and space Characters\n",
                    "in you indentations."
                ),
                //german
                "".concat(
                    "Du hast Tab und Leerzeichen bei der\n",
                    "Einrückung vermischt."
                )
            )],

            ["SystemError", new Hint(
                //english:
                "".concat(
                    "Something internally went wrong with the python interpreter.\n",
                    "How did you do this?!"
                ),
                //german
                "".concat(
                    "Ein python interner Fehler ist aufgetreten.\n",
                    "Wie hast du das geschafft?"
                )
            )],

            ["SystemExit", new Hint(
                //english:
                "".concat(
                    "This exception should not be thrown or caught.\n",
                    "Are you doing this?"
                ),
                //german
                "".concat(
                    "Dieser Fehler sollte nicht geworden oder gefangen werden.\n",
                    "Machst du das?"
                )
            )],

            ["TypeError", new Hint(
                //english:
                "".concat(
                    "You are trying to use wrong types somewhere.\n",
                    "Types are automatically detected by python.\n",
                    "Example: a = \"number: \" + 10\n",
                    "will throw this error, as the type of\n",
                    "\"number: \" (str) can't be added to\n",
                    "the type fo 10 (int)."
                ),
                //german
                "".concat(
                    "Du versucht falsche Typen zu verwenden.\n",
                    "Typen werden automatisch von Python erkannt.\n",
                    "Beispiel: a = \"numer: \" + 10\n",
                    "wird diesen Fehler produzieren, da der Typ von\n",
                    "\"nummer: \" (str) nicht mit dem Typ von\n",
                    "10 (int) addiert werden kann.\n",
                    "type (En) = Typ / Art (De)"
                )
            )],

            ["UnboundLocalError", new Hint(
                //english:
                "".concat(
                    "You are trying assign a value to\n",
                    "a varialbe outside of its scope.\n",
                    "To use variables from outside of functions\n",
                    "inside of them you need to use \"global my_variable\"\n",
                    "inside of the function.\n",
                    "Example:\n",
                    "   x = 10\n",
                    "   def function():\n",
                    "       # global x <- this would fix it",
                    "       x += 1\n",
                    "   function()\n",
                    "will result in this error, as the variable x\n",
                    "is not defined inside of the function."
                ),
                //german
                "".concat(
                    "Du versuchst eine Variable außerhalb des Bereichs\n",
                    "in dem sie definiert ist zu nutzen.\n",
                    "Um eine Variable von außerhalb einer Funktion\n",
                    "in ihr zu verwenden, musst du\n",
                    "\"global meine_variable\" nutzen.\n",
                    "Beispiel:\n",
                    "   x = 10\n",
                    "   def funktion():\n",
                    "       # global x <- das würde es beheben.",
                    "       x += 1\n",
                    "   function()\n",
                    "wird diesen Fehler ergeben, da die Variable x\n",
                    "nicht in der Funktion definiert wurde."
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
                    "You called a function with a paramter that\n",
                    "is the right type, but still doesn't work.\n",
                    "Example:\n",
                    "   list = []\n",
                    "   list.remove(\"x\")\n",
                    "will cause this error, as the list does not\n",
                    "contain the value \"x\"."
                ),
                //german
                "".concat(
                    "Du hast eine Funktion mit einem Parameter\n",
                    "aufgerufen der zwar den richtigen Typ hat,\n",
                    "aber trotzdem nicht funktioniert.\n",
                    "Beispiel:\n",
                    "   liste = []\n",
                    "   liste.remove(\"x\")\n",
                    "wird diesen Fehler ergeben, da die Liste\n",
                    "nicht den Wert \"x\" enthält.\n",
                    "value (En) = Wert (De)"
                )
            )],

            ["ZeroDivisionError", new Hint(
                //english:
                "".concat(
                    "Your code is trying to divide by zero.\n",
                    "This is not mathematically possible.\n",
                    "Make sure to handle the case in which\n",
                    "the denominator is zero.\n",
                    "Example:\n",
                    "   x = 0\n",
                    "   print(100 / x)\n",
                    "Will cause this error, as python can't\n",
                    "calculate 100 divided by 0."
                ),
                //german
                "".concat(
                    "Dein Programm versucht durch null zu teilen.\n",
                    "Das ist mathematisch nicht möglich.\n",
                    "Kümmere dich darum, dass dieser sonderfall\n",
                    "nicht auftreten kann.\n",
                    "Beispiel:\n",
                    "   x = 0\n",
                    "   print(100 / x)\n",
                    "Ergibt diesen Fehler, da python\n",
                    "nicht 100 geteilt durch 0 berechnen kann.\n",
                    "zero division (En) = Teilund durch null (De)"
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
                    "You are trying to create a file that already exists.\n",
                    "Don't do this."
                ),
                //german
                "".concat(
                    "Du versucht eine Datei zu erstellen die schon existiert.\n",
                    "Mach das nicht.",
                    "file (En) = Datei (De)"
                )
            )],

            ["FileNotFoundError", new Hint(
                //english:
                "".concat(
                    "You are trying to access a file or directory that\n",
                    "does not exist. Did you make a typo?"
                ),
                //german
                "".concat(
                    "Du versucht eine Datei oder einen Ordner zu nutzen,\n",
                    "die oder der nicht existiert.\n",
                    "Hast du einen Tippfehler gemacht.",
                    "file (En) = Datei (De)"
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
                    "You are trying to do something with a directory\n",
                    "that only works with files.\n",
                    "Example: you can't delete a directory with the\n",
                    "os.remove() function."
                ),
                //german
                "".concat(
                    "Du versuchst etwas mit einem Ordner zu tun,\n",
                    "dass nur mit Dateien funktioniert.\n",
                    "Beispiel: du kannst einen Ordner nicht mit\n",
                    "der os.remove() Funktion löschen.",
                    "directory (En) = Ordner (De)"
                )
            )],

            ["NotADirectoryError", new Hint(
                //english:
                "".concat(
                    "You are trying to do something on a non-directory\n",
                    "that only works with directories.\n",
                    "Example: you can't use os.listdir() on\n",
                    "a file."
                ),
                //german
                "".concat(
                    "Du versuchst etwas mit einem nicht-Ordner zu tun,\n",
                    "dass nur mit Ordnern funktioniert.\n",
                    "Beispiel: du kannst os.lisdirt() nicht\n",
                    "auf einer Datei nutzen.\n",
                    "directory (En) = Ordner (De)"
                )
            )],

            ["PermissionError", new Hint(
                //english:
                "".concat(
                    "You are trying to run some operation on\n",
                    "your operating system that python doesn't\n",
                    "have the permission for.\n",
                    "Example: writing a file that requires\n",
                    "admin privileges."
                ),
                //german
                "".concat(
                    "Du versucht eine Operation auf deinem\n",
                    "Betriebssystem auszuführen, für die\n",
                    "Python nicht die Berechtigungen hat.\n",
                    "Beispiel: eine Datei schreiben, die Admin-\n",
                    "Rechte benötigt.\n",
                    "permission (En) = Berechtigung (De)"
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

            ["Traceback (most recent call last)", new Hint(
                //english:
                "".concat(
                    "A traceback is a report containing\n",
                    "the function calls made in your code\n",
                    "that were involved in producing this error.\n",
                    "In other languages this is called a stack trace,\n",
                    "or backtrace.\n",
                    "\"most recent call last\" means,\n",
                    "that the very bottom part of the traceback\n",
                    "was the one that occured closest to\n",
                    "this error."
                ),
                //german
                "".concat(
                    "Ein traceback ist ein Bericht,\n",
                    "der Funktionsaufrufe in deinem Code enthält,\n",
                    "die zu diesem Fehler geführt haben.\n",
                    "In anderen Sprachen nennt man dies auch\n",
                    "einen stack trace, oder backtrace.\n",
                    "\"most recent call last\" heißt,\n",
                    "dass der unterste Teil des traceback\n",
                    "am nächsten zu diesem Fehler aufgerufen wurde.\n",
                    "traceback (En) = zurück Verfolgung (De)\n",
                    "most recent call last (En) = jüngste Aufforderung zuletzt (De)"
                )
            )]
        ]);

}
