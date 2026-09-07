


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


  //dobbelsteen
  push();
  translate(350,375);

  stroke(0);
  strokeWeight(3);
  fill(255)

  rect(0,0,200,200,20);

  fill(0);
  strokeWeight();

  circle(50,50,40);
  circle(100,100,40);
  circle(150,150,40);

  pop();


  //mario
  push();
  translate(800,50);

  let px_sixe = 10;

  const mario = [
    [0,0,0,1,1,1,1,1,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,0],
    [0,2,2,2,3,3,3,4,0,0,0,0],
    [2,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0]
  ];
  let mario_colors = [
    color(255,0,255),
    color(255,0,0),
    color(125,125,0),
    color(255,125,50),
    color(0,0,0)
  ];

  for (let y = 0; y < mario.length; y++){
    for (let x = 0; x < mario[x].length; x++){
      fill(mario_colors[mario[y][x]]);
      square(x*px_sixe,y*px_sixe,px_sixe);
    }
  }
  pop();
}
