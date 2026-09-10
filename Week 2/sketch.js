function setup() {
  createCanvas(1000, 600);
}

function draw() {
  background(175,225,255);
  noStroke();

  push();
  translate(0,500);

  fill(75);
  rect(0,0,1000,100);

  fill(25, 125, 50);
  rect(0,-10,1000,10);

  fill(25, 255, 50);
  rect(0,-20,1000,10);

  fill(255);

  for (i = 0; i < 11; i++){
    rect(-25+100*i, 45, 50, 10, 5);
  }
  pop();
  

  push();
  translate(0,480);

  fill(125);

  triangle(0,0,150,0,75,-150);



  
  pop();
}
