const { parentPort } = require('worker_threads')
const getFactorial = (number) => {
    if (number === 1) {
        return 1;
    }
    return number * getFactorial(number - 1)
}

parentPort.on("message", (number) => {
    const factorial_number = getFactorial(number);
    parentPort.postMessage(factorial_number)
})