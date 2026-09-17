let light_switch = 0;
let day_night_cycle = 0;
let day = true;
let moon_star_pos = -200;
const moon_star_size = 75;
let last_time = 0;
let cars_colors = 11;
let car_models = 4;
let automatic = false;
let cars = [];
let honk = [];

class car {
  constructor(lane = true, spd = 0, pos = 0, clr = 0, model = 0) {
    this.lane = lane;
    this.spd = spd;
    this.pos = pos;
    this.clr = clr;
    this.model = model;
  }
}


for (let i = 0; i < 9; i++) {
  cars.push(new car(!!Math.floor(Math.random() * 1.9), 10, -135 * i, Math.floor(Math.random() * cars_colors), Math.floor(Math.random() * car_models)))
}



function setup() {
  createCanvas(1000, 600);
  background(175, 200, 255);
}



function draw_car(colors, pos, model) {
  const car_colors = [
    color(255, 0, 0),
    color(255, 255, 0),
    color(0, 255, 0),
    color(125, 0, 255),
    color(0, 0, 255),
    color(255),
    color(25),
    color(155),
    color(155),
    color(255, 155, 0),
    color(0, 255, 155)
  ];

  fill(65)
  rect(pos - 135, 15, 50, 10)
  circle(pos - 140, 20, 15)
  fill(car_colors[colors]);
  stroke(car_colors[colors]);
  strokeWeight(1);
  rect(pos - 125, -10, 125, 40);
  rect(pos - 100, -40, 60, 40);

  if (model == 1 || model == 3) {
    triangle(
      pos - 125, 30,
      pos - 140, -10,
      pos - 125, -10);

  }
  fill(car_colors[colors]);
  if (model == 2 || model == 3) {
    triangle(
      pos - 40, -40,
      pos - 40, -10,
      pos, -10);
    fill(100, 155, 255)
    rect(pos - 50, -28, 25, 18, 5)
  }

  fill(100, 155, 255)
  rect(pos - 90, -30, 40, 20, 5)

  noStroke();
  fill(50);
  circle(pos - 100, 30, 30);
  circle(pos - 25, 30, 30);
}

function draw_tree(x, y) {

  let wave = Math.sin(millis() / 100) * 1.5

  fill(125, 75, 0);
  rect(x, y - 100, 30, 100);

  fill(0, 200, 0);
  circle(x + 30 + wave, y - 100, 50);
  fill(0, 150, 0);
  circle(x + 15 + wave, y - 110, 50);
  fill(0, 100, 0);
  circle(x - wave, y - 100, 50);


}


function draw_cloud(x,y,s){
  x -= millis()/10/s
  while (x <= -100){
    x += 1200
  }


  fill(175);
  circle(x,y-10*s,60*s);
  circle(x-35*s,y-5*s,50*s);
  circle(x+35*s,y-5*s,50*s);
  fill(255);
  circle(x,y-5*s,60*s);
  circle(x-35*s,y,50*s);
  circle(x+35*s,y,50*s);
  
}


function draw() {


  //moon n star
  let backround_colors = get(0, 0);
  let backround_color = color(backround_colors[0], backround_colors[1], backround_colors[2]);

  let day_light = color(175, 200, 255);
  let night_light = color(25, 0, 155);

  let day_cycle = lerpColor(backround_color, day_light, 0.01);
  let nigth_cycle = lerpColor(backround_color, night_light, 0.01)

  let x = moon_star_pos * 2.5 + 500;
  let y = Math.pow(moon_star_pos * 2.5 / 35, 2) + 40;

  if (millis() - day_night_cycle >= 13) {
    moon_star_pos++;
    day_night_cycle = millis();
  }



  noStroke();
  if (day) {
    background(day_cycle);

    stroke(255, 0, 0);
    fill(255, 0, 0, 125);
    circle(x, y, moon_star_size * Math.sin(millis() / 1000) * 2);

    noStroke();

    fill(255, 255, 0);
    circle(x, y, moon_star_size);
  }

  else {
    background(nigth_cycle);

    fill(125, 0, 255);
    circle(x, y, moon_star_size * Math.sin(millis() / 1000) * 2);

    fill(255);
    circle(x, y, moon_star_size);

    fill(175);
    circle(x - 10, y - 20, moon_star_size / 7)
    circle(x - 10, y + 15, moon_star_size / 5)
    circle(x + 15, y - 15, moon_star_size / 10)
    circle(x + 15, y + 10, moon_star_size / 3)
    circle(x - 25, y - 5, moon_star_size / 10)

  }

  if (moon_star_pos >= 200 + moon_star_size) {
    moon_star_pos = -200 - moon_star_size
    day = !day
  }



  //stoplight switch
  if (automatic) {
    if (millis() - last_time > 3000) {
      light_switch++;
      last_time = millis();
    }
    fill(255, 150, 75)
    square(10, 10, 100, 5);
    fill(255)
    circle(60, 60, 90)
    fill(0)
    circle(60, 60, 20)
    rect(55, 20, 10, 40, 3)
    rect(55, 55, 25, 10, 3)
  }

  if (light_switch > 2) {
    light_switch = 0;
  }



  //big clauds
  draw_cloud(1100,200, 2);
  draw_cloud(1100,100, 1.5);


  //mauzymice

  push();
  translate(375, 100);

  noStroke();

  const px_sixe = 3;


  const mauzymice = [
    [0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0],
    [0, 0, 0, 3, 3, 1, 1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1, 1, 3, 0, 0],
    [0, 0, 0, 3, 1, 1, 1, 1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1, 1, 1, 3, 3, 0],
    [0, 0, 3, 3, 1, 1, 1, 1, 1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1, 1, 1, 1, 1, 3, 0],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 3, 0],
    [0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3],
    [0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 0, 0, 0, 3, 1, 1, 1, 1, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3],
    [0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 0, 0, 3, 3, 1, 1, 1, 1, 1, 3, 3, 3, 0, 0, 0, 0, 0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 0, 0, 0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3],
    [0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3],
    [0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0],
    [0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 0],
    [0, 0, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 0, 3, 3, 1, 1, 1, 1, 1, 3, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 0, 0],
    [0, 0, 0, 3, 1, 1, 1, 1, 3, 3, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 0, 0, 0],
    [0, 0, 0, 3, 3, 1, 1, 1, 3, 3, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 3, 3, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 0],
    [0, 0, 0, 0, 3, 1, 1, 1, 3, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0],
    [3, 3, 3, 3, 3, 1, 1, 1, 3, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [3, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 3, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0],
    [0, 0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 3, 1, 1, 2, 4, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 2, 4, 2, 1, 2, 1, 1, 1, 1, 3, 0, 0, 0],
    [0, 0, 0, 0, 3, 1, 1, 4, 1, 4, 2, 4, 1, 1, 1, 3, 1, 1, 3, 3, 3, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 4, 1, 4, 2, 4, 1, 1, 1, 1, 3, 3, 0, 0],
    [0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 0, 0],
    [0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]


  const mauzymice_colors = [
    color(0, 0, 0, 0),
    color(255),
    color(255, 0, 0),
    color(0, 0, 0),
    color(255, 125, 125)
  ]

  for (let y = 0; y < mauzymice.length; y++) {
    for (let x = 0; x < mauzymice[y].length; x++) {
      fill(mauzymice_colors[mauzymice[y][x]]);
      square(x * px_sixe, y * px_sixe, px_sixe);
    }
  }
  pop();




  //big mountens 
  push();
  translate(0, 480);

  fill(100);
  triangle(100, 0, 400, 0, 250, -350);
  triangle(400, 0, 800, 0, 600, -300);
  triangle(300, 0, 700, 0, 500, -250);
  triangle(200, 0, 600, 0, 400, -250);
  rect(400, -250, 100, 200)

  //clouds
   
  draw_cloud(1100,-200, 1);

  draw_cloud(1100,-150, 0.5);



  //mountens
  fill(125);
  triangle(0, 0, 150, 0, 75, -150);
  triangle(250, 0, 450, 0, 350, -250);
  triangle(725, 0, 875, 0, 800, -150);

  for (let i = 0; i < 5; i++) {
    draw_tree(50 + 125 * i, 0);
  }
  pop();



  //stoplicht
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
  rect(0, 0, 40, 120);
  rect(13, 0, 14, 180)


  

  active_lights[light_switch] = lights[light_switch];

  fill(active_lights[0]);
  circle(20, 100, 30);
  fill(active_lights[1]);
  circle(20, 60, 30);
  fill(active_lights[2]);
  circle(20, 20, 30);

  //trees

  for (let i = 0; i < active_lights.length; i++) {
    active_lights[i] = color(0, 0, 0);
  }

  pop();



  //road
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



  //cars
  for (let i = 0; i < cars.length; i++) {
    let base_speed = 7.5;
    let my_car = cars[i];
    let acc = 0.05
    const after_stop = 950;
    const stop = 850

    if (cars[i].pos > after_stop) {
      my_car.spd = lerp(my_car.spd, base_speed, 0.2);
    } else {
      switch (light_switch) {
        case 0: { my_car.spd = lerp(my_car.spd, base_speed, acc) } break;

        case 1: {
          if (cars[i].pos > stop) { my_car.spd = lerp(my_car.spd, (base_speed / 2), acc) }
          else { my_car.spd = lerp(my_car.spd, (base_speed / 3), acc) }
        } break;

        case 2: { if (cars[i].pos > stop - 20) { my_car.spd = lerp(my_car.spd, 0, acc * 1.5) } } break;

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
    if (my_car.pos > 1200) {
      my_car.pos = -550 * 1.2;
      my_car.clr = Math.floor(Math.random() * cars_colors)
      my_car.model = Math.floor(Math.random() * car_models)
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
    draw_car(my_car.clr, my_car.pos, my_car.model);
  }
  push();
  translate(0, 50);
  for (let i = 0; i < cars_r.length; i++) {
    my_car = cars_r[i]
    draw_car(my_car.clr, my_car.pos, my_car.model);
  }

  pop();
  pop();
  
}

function preload() {
  honk[0] = loadSound("smth-8.mp3");
  honk[1] = loadSound("clown-horn.mp3");
  honk[2] = loadSound("fnaf-toot.mp3");
  honk[3] = loadSound("honk-sound.mp3");
  honk[4] = loadSound("music-honk.mp3");
}

function keyPressed() {
  if (keyCode === 13 && millis() - last_time > 1000) {
    automatic = false;
    light_switch++;
    last_time = millis();
  }
  if (keyCode === 32) {
    automatic = !automatic;
  }
}

function mouseClicked(){
  for (let i = 0; i < cars.length; i++){
    let height = 460;
    if (!cars[i].lane){height += 50}
    // push()
    // translate(0,0)
    // fill(255,0,255);
    // rect(cars[i].pos, height, -125, 70, 2)
    // pop()


    if (mouseX > cars[i].pos-125
      &&mouseY > height
      &&mouseX < cars[i].pos
      &&mouseY < height+70
    ){
      console.log(cars[i].pos);
      honk[Math.floor(Math.random()*4.05)].play()
    }
  }
}