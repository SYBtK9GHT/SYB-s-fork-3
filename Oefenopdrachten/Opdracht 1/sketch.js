function setup() {
  createCanvas(1250, 600);
}

function draw() {
  background(220);

  fill(5,65,255);
  textSize(17);
  text(":3\nHello World!\nthis project belong to Sybren Jonkheid", 5, 20);

  fill(255);
  square(20,100,100);

  fill(0);
  square(20,100,33);
  square(20+66,100,33);
  square(20,100+66,33);
  square(20+33,100+33,33);
  square(20+66,100+66,33);
}
