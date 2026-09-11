let light_switch = 0;

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

  

  fill(100);
  triangle(100,0,400,0,250,-350);
  triangle(400,0,800,0,600,-300);

  fill(125);
  triangle(0,0,150,0,75,-150);
  triangle(300,0,500,0,400,-250);
  triangle(725,0,875,0,800,-150);

  pop();

  push();
  translate(925,300);

   const lights = [
     color(0,255,0),
     color(255,125,0),
     color(225,0,0)
   ];
  let active_lights = [
    color(0),
    color(0),
    color(0)
  ];
  fill(100);
  rect(0,0,50,150);
  rect(12,0,26,180)

  for (let i = 0; i < active_lights.length; i++){
    active_lights[i] = color(0,0,0,0);
  }

  active_lights[light_switch] = lights[light_switch];

  fill(active_lights[0]);
  circle(25,125,40);
  fill(active_lights[1]);
  circle(25,75,40);
  fill(active_lights[2]);
  circle(25,25,40);

  pop();



}

  function keyPressed (){
    if (key === 13 || key === 32){
      light_switch++;
    }
    if (light_switch >= 3){
      light_switch = 0;
    }
    console.log(light_switch);
  }