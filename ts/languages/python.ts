import { workerData } from "worker_threads";
import LanguageInterface from "../LanguageInterface";

//class for the python language
export default class PythonHints implements LanguageInterface {
    
    private keywords = new Map<string, string>(
        [
            //exceptions https://docs.python.org/3/library/exceptions.html
            ["Test", "".concat(
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

    insertHints(input: string): string {
        //iterate over input and check if it contains keyword from specified index
        for (let i = 0; i < input.length; i++) {
            for (let [key, value] of this.keywords) {
                //console.log(input.substring(i, i + key.length));
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
