


function testMax() {
    return fetch("http://localhost:3000/users")
        .then(data => data.text())

}

setInterval(async () => {
    const init = performance.now()
    const data = await Promise.all([
        testMax(),
        testMax(),
        testMax(),
        testMax(),
        testMax(),
        testMax(),
        testMax(),
        testMax(),
        testMax(),
        testMax(),
        testMax(),
        testMax(),
        testMax(),
    ])
    const fim = performance.now();
    console.log(fim - init);
    console.log(data);
}, 100);