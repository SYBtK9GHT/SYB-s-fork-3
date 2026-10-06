function setup() {
    let size = 50
    let buttonTest = createButton("klik mij", "myInfo");
    buttonTest.mousePressed(() => { klikFunc(buttonTest.html(), buttonTest.value()) });
    buttonTest.style("background-color", color(10, 20, 200));
    buttonTest.style("color", color(255, 200, 0));
    buttonTest.style("font-size", size + "px")
    buttonTest.style("width", size * 12 + "px")
    buttonTest.style("padding", size / 6 + "px " + size / 6 + "px")

    let shave = "polygon(" +
        size + "px 0%, " +
        "calc(100% - " + size + "px) 0%, " +
        "100% 50%, " +
        "calc(100% - " + size + "px) 100%, " +
        size + "px 100%, " +
        "0% 50%)";

    buttonTest.style("clip-path", shave)
    buttonTest.style("border-color", color(0, 0, 0, 0))
}

function klikFunc(data1, data2) {
    console.log("geklikt", "\n" + data1, "\n" + data2)
    for (let i = 0; i < 4; i++) {
        console.log(String.fromCharCode(i+65));
    }
}