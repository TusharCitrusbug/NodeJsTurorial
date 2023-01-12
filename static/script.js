const worker = new Worker('worker.js')
const sumButton = document.querySelector('#sumbutton');
const bgButton = document.querySelector('#bgButton');

sumButton.addEventListener("click", (e) => {
    worker.postMessage("hello")
})
let bodyBg = document.body.style.background;
bgButton.addEventListener("click", (e) => {
    console.log("skdjskdjksdjsdk");
    if (document.body.style.background !== 'green')
        document.body.style.background = 'green';
    else
        document.body.style.background = 'blue';
})