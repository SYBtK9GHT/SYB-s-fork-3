function setup() {
  createCanvas(1000, 600);
}

let light_switch = 0;

class car {
  constructor(lane = true, spd = 0, pos = 0, clr = 0) {
    this.lane = lane;
    this.spd = spd;
    this.pos = pos;
    this.clr = clr;
  }
}

let cars = []
let prepos = 0
for (let i = 0; i < 25; i++){
  prepos = Math.floor(Math.random()*150)+prepos+30
  cars.push(new car(!!Math.floor(Math.random()*1.9), 10, -135*i-prepos, Math.floor(Math.random()*5)))
}

function draw_car(colors,pos,y){
    const car_colors = [
    color(255,0,0),
    color(255,255,0),
    color(0,255,0),
    color(125,0,255),
    color(0,0,255)
  ];
  
    fill(car_colors[colors]);
    rect(pos-25, y-10, 125,40);
    rect(pos, y-40, 60,40);
    fill(50);
    circle(pos, y+30, 30)
    circle(pos+75, y+30, 30);

    
}


function draw() {



  background(175, 225, 255);
  noStroke();




  push();
  translate(0, 480);



  fill(100);
  triangle(100, 0, 400, 0, 250, -350);
  triangle(400, 0, 800, 0, 600, -300);

  fill(125);
  triangle(0, 0, 150, 0, 75, -150);
  triangle(300, 0, 500, 0, 400, -250);
  triangle(725, 0, 875, 0, 800, -150);

  pop();

  push();
  translate(925, 300);

  const lights = [
    color(0, 255, 0),
    color(255, 125, 0),
    color(225, 0, 0)
  ];
  let active_lights = [
    color(0),
    color(0),
    color(0)
  ];
  fill(100);
  rect(0, 0, 50, 150);
  rect(12, 0, 26, 180)

  for (let i = 0; i < active_lights.length; i++) {
    active_lights[i] = color(0, 0, 0);
  }

  active_lights[light_switch] = lights[light_switch];

  fill(active_lights[0]);
  circle(25, 125, 40);
  fill(active_lights[1]);
  circle(25, 75, 40);
  fill(active_lights[2]);
  circle(25, 25, 40);

  pop();

  push();
  translate(0, 500);

  fill(100);
  rect(0, 0, 1000, 100);

  fill(25, 125, 50);
  rect(0, -10, 1000, 10);

  fill(25, 255, 50);
  rect(0, -20, 1000, 10);

  fill(255);

  for (i = 0; i < 11; i++) {
    rect(-25 + 100 * i, 45, 50, 10, 5);
  }



  for (let i = 0; i < cars.length; i++) {
    let base_speed = 7.5;
    let my_car = cars[i];
    let acc = 0.05

    if (cars.pos > 500){
      my_car.spd = lerp(my_car.spd, base_speed*12, 0.95);
    } else {
    switch(light_switch){
      case 0: {my_car.spd = lerp(my_car.spd, base_speed, acc)} break;
      case 1: {my_car.spd = lerp(my_car.spd, (base_speed/2), acc)}   break;
      case 2: {my_car.spd = lerp(my_car.spd, 0, acc)} break;  
    }}
    
    let spd = cars[i].spd;
    let y = 50;
    if (my_car.lane) {
      y -= 50
      spd *= 1.5
    }
    my_car.pos += spd
    draw_car(my_car.clr,my_car.pos,y)
    
    textSize(25)
    fill(255,0,255)
    text(i,my_car.pos,0);
    

    for (let j = 0; j > cars.length; j++){
      if (cars[j].pos < prepos){
        prepos = my_car.pos
      }
    }

    if (my_car.pos > 1100){
      my_car.pos = -200-prepos;
      my_car.color = Math.floor(Math.random()*5)
      my_car.lane = !!Math.floor(Math.random()*1.9)
    }
  }

  pop();
}

function keyPressed() {
  if (keyCode === 13 || keyCode === 32) {
    light_switch++;
  }
  if (light_switch > 2) {
    light_switch = 0;
  }
}