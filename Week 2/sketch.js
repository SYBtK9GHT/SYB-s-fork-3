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
for (let i = 0; i < 10; i++) {
  prepos = Math.floor(Math.random() * 150) + prepos + 30
  cars.push(new car(!!Math.floor(Math.random() * 1.9), 10, -135 * i - prepos, Math.floor(Math.random() * 5)))
}

function draw_car(colors, pos) {
  const car_colors = [
    color(255, 0, 0),
    color(255, 255, 0),
    color(0, 255, 0),
    color(125, 0, 255),
    color(0, 0, 255)
  ];

  fill(car_colors[colors]);
  rect(pos -125, -10, 125, 40);
  rect(pos -100, -40, 60, 40);
  fill(50);
  circle(pos -100, 30, 30)
  circle(pos -25, 30, 30);

  fill(255,0,255)
  rect(pos,-70,2,100)

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
    const after_stop = 935;
    const stop = 750

    fill(255,0,255);
    rect(stop,0,2,100);
    rect(after_stop,0,2,100);

    //change spped with light
    if (cars[i].pos > after_stop) {
      my_car.spd = lerp(my_car.spd, base_speed, 0.2);
    } else {
      switch (light_switch) {
        case 0: { my_car.spd = lerp(my_car.spd, base_speed, acc) } break;
        case 1: { my_car.spd = lerp(my_car.spd, (base_speed / 2), acc) } break;
        case 2: { if (cars[i].pos > stop) { my_car.spd = lerp(my_car.spd, 0, acc * 1.5) } } break;
      }
    }

    //left lane boost
    let spd = cars[i].spd;
    if (my_car.lane) {
      spd *= 1.5
    }

    // brakes
  
    for (let j = 0; j < cars.length; j++) {
      if (my_car != cars[j] && my_car.lane == cars[j].lane && my_car.pos > cars[j].pos - 185 && my_car.pos < cars[j].pos) {
        my_car.spd = lerp(my_car.spd, 0, acc * 3.5);
      }
    }

    my_car.pos += spd;


    //respawn
    if (my_car.pos > 1100) {
      my_car.pos = -550 * 1.2;
      my_car.clr = Math.floor(Math.random() * 15 / 3)
      my_car.lane = !!Math.floor(Math.random() * 1.9)
    }
  }

  //render right lane infront off left lane
  let cars_l = [];
  let cars_r = [];
  for (let i = 0; i < cars.length; i++) {
    if (cars[i].lane) {
      cars_l.push(cars[i])
    } else {
      cars_r.push(cars[i])
    }
  }
  for (let i = 0; i < cars_l.length; i++) {
    my_car = cars_l[i]
    draw_car(my_car.clr, my_car.pos);
  }
  push();
  translate(0, 50);
  for (let i = 0; i < cars_r.length; i++) {
    my_car = cars_r[i]
    draw_car(my_car.clr, my_car.pos);
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