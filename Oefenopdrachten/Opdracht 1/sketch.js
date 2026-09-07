function setup() {
  createCanvas(1250, 600);
}

function draw() {
  background(220);

  //naam
  fill(5,65,255);
  textSize(17);
  text(":3\nHello World!\nthis project belong to Sybren Jonkheid", 5, 20);

  //vlag
  push();
  translate(20,100);

  noStroke();

  fill(255,0,0);
  rect(0,0,150,33);

  fill(255);
  rect(0,33,150,33);

  fill(0,0,255);
  rect(0,66,150,33);

  pop();
  
  //schaakboord
  push();
  translate(20,250);

  stroke(0);

  fill(255);
  square(0,0,100);

  fill(0);
  square(0,0,33);
  square(66,0,33);
  square(0,66,33);
  square(33,33,33);
  square(66,66,33);

  pop();

  //huisje
  push();
  strokeWeight(5);
  translate(20, 400);
  fill(0,0,0,0);
  
  triangle(0,50,50,0,100,50);
  rect(20,50,60,30);

  pop();

  

  //stoplight
  push();
  translate(350, 25);

  noStroke();
  fill(125);
  rect(0,0,80,240);
  rect(20,240,40,100);

  fill(255,0,0);
  circle(40,40,50);
  fill(255,125,0);
  circle(40,120,50);
  fill(0,255,0);
  circle(40,200,50);

  pop();



}
