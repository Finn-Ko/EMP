import LanguageInterface from "../LanguageInterface";
import Hint from "../Hint";

//class for the python language
export default class PythonHints implements LanguageInterface {
    
    private dictionary = new Map<string, Hint>(
        [
            //exceptions https://docs.python.org/3/library/exceptions.html
            ["Test", new Hint(
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
                    "Hallo, ich bin Deutsch"
                )
            )]
            // "AssertionError",
            // "AttributeError",
            // "EOFError",
            // "FloatingPointError",
            // "GeneratorExit",
            // "ImportError",
            // "ModuleNotFoundError",
            // "IndexError",
            // "KeyError",
            // "KeyboardInterrupt",
            // "MemoryError",
            // "NameError",
            // "NotImplementedError",
        ]);

    getDictionary(): Map<string, Hint> {
        return this.dictionary;
    }

}
