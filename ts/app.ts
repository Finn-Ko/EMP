import hljs from 'highlight.js';

const codeInputHTML = document.getElementById("codeInput");

//initialize when page is loaded
window.addEventListener("load", function(event) {
    init();
});

//initial actions
function init(): void {
    codeInputHTML!.focus();
}

// Callback function to execute when code input was mutated by user
// TODO
const reparseInput = function(mutationsList: any, observer: any): void {
    // Use traditional 'for loops' for IE 11
    //console.log(mutationsList.type, observer.type);
    let highlighted = hljs.highlightAuto(codeInputHTML!.innerHTML);
    console.log("Hallo");
    // for(const mutation of mutationsList) {
    //     if (mutation.type === 'childList') {
    //         console.log('A child node has been added or removed.');
    //     }
    //     else if (mutation.type === 'attributes') {
    //         console.log('The ' + mutation.attributeName + ' attribute was modified.');
    //     }
    // }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(reparseInput);

// Start observing the target node for configured mutations
observer.observe(codeInputHTML!, { childList: true, subtree: true });