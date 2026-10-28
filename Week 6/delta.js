let test = 0
const speed = 30

function setup(){
     createCanvas(1200,100)
    frameRate(200)
}

function draw(){
    background(220)

    test += speed/100 * deltaTime
    test %= width

    fill(255,0,255)
    circle(test,50,50)
}