onmessage = (e) => {
    let sum = 0;
    for (let index = 0; index < 1000000000; index++) {
        sum += index;
    }
    console.log(sum);
}