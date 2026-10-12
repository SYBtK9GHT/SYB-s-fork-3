let data = 0

function setup() {
    if (getItem("data") != null){
        data = getItem("data")
    }
    createCanvas(800, 600);
    background(220);
    storeItem("data", data)
}

function draw() {
    background(220);
    fill(0)
    textSize(25)
    text(getItem("data"), 50, 100)
}


function keyPressed() {
    if (keyCode === 13) {
        data++

    } else if (keyCode === 8) {
        data--
    }
    storeItem("data", data)
}