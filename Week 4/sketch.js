const width = 800;
const height = 600;
const art_styles = 4;
let art_style = 3//Math.floor(Math.random()*art_styles);
let angle = 0;
const plane_colors_lengnth = 10;
const speed = 5;
const shadows = 6;
const size = 30;
const max_travel = 2000
let x_render = 0
let y_render = 0
let planets = []
let sun_size = 20
const render_speed = 200
let bubbles = []
let flying_planes = []
let l = Math.floor(Math.random() * 80 + 20)


class bubble {
  constructor(x, y, z, size) {
    this.x = x
    this.y = y
    this.z = z
    this.size = size
  }
}

class flying_plane {
  constructor(plane_color, dir, x, y, travel) {
    this.plane_color = plane_color
    this.dir = dir
    this.x = x
    this.y = y
    this.travel = travel
  }
}

function make_flying_planes() {
  flying_planes = []
  for (let _ = 0; _ < 300; _++) {
    flying_planes.push(
      new flying_plane(
        Math.floor(Math.random() * plane_colors_lengnth),
        !!Math.floor(Math.random() * 2),
        Math.floor(Math.random() * 41 - 21),
        Math.floor(Math.random() * 10 - 6),
        Math.floor(Math.random() * max_travel * 2 - max_travel)
      )
    )
  }
}

class planet{
  constructor(x,y,r,spd,size,color,travel){
    this.x = x
    this.y = y
    this.r = r
    this.spd = spd
    this.size = size
    this.color = color 
    this.travel = travel 
  }
}


function make_planets() {
  planets = []
  for (let i = 0; i < 15; i++) {
    planets.push(new planet(
      0,0,
      Math.floor(Math.random() * 7 + 1)*3 + 55*i + 15+sun_size*2,
      Math.random()/75+0.05,
      Math.floor(Math.random() * 10 + 7),
      Math.floor(Math.random() * 6),
      Math.random() * 6.28
    ))
  }
}

make_bubbles()
make_flying_planes()
make_planets()



function draw_flying_plane(plane_color, dir, x, y, travel) {
  let colors = [
    color(255, 0, 0),
    color(0, 0, 255),
    color(0, 255, 0),
    color(255, 255, 0),
    color(0, 255, 255),
    color(155, 0, 255),
    color(0, 255, 100),
    color(255),
    color(255, 0, 255),
    color(255, 0, 255),
  ]


  let shadow = colors[plane_color]

  noStroke();
  for (let j = 0; j < shadows; j++) {
    fill(shadow);
    push();
    if (dir) { rotate(90, [0, 1, 0]); }
    translate(x * size * 1.1, -(y * size * 2 * 1.05 + dir * size * 1.1), travel - 20 * j);
    plane(size);
    pop();
    shadow = lerpColor(shadow, color(0, 0, 0), (1.85 / shadows))
  }
}

function make_bubbles() {
  bubbles = []
  for (let _ = 0; _ < 50; _++) {
    bubbles.push(new bubble(
      Math.floor(Math.random() * 100 - 50),
      Math.floor(Math.random() * 175 - 150),
      Math.floor(Math.random() * 100 - 50),
      Math.floor(1.2 * Math.random() * 2.5 + 2),
    ))
  }
}


function resetCamera() {
  camera(
    0, 0, 800,  // camera position: x, y, z
    0, 0, 0,    // point to look at
    0, 1, 0     // up direction
  );
  x_render = 0;
  y_render = 0;
}

function setup() {
  createCanvas(800, 600, WEBGL);
  background(0);
}



function draw() {
  angleMode(DEGREES);
  if (art_style == 0) {


    background(0);
    rotate(-20, [1, 0, 0]);


    angle += 0.20;
    rotate(angle, [0, 1, 0]);

    for (let i = 0; i < flying_planes.length; i++) {
      draw_flying_plane(
        flying_planes[i].plane_color,
        flying_planes[i].dir,
        flying_planes[i].x,
        flying_planes[i].y,
        flying_planes[i].travel
      );

      for (let k = 0; k < flying_planes.length; k++) {
        if (flying_planes[i] != flying_planes[k]
          && flying_planes[i].travel < flying_planes[k].travel
          && flying_planes[i].travel > flying_planes[k].travel - speed * shadows * 5
          && flying_planes[i].dir == flying_planes[k].dir
          && flying_planes[i].x == flying_planes[k].x
          && flying_planes[i].y == flying_planes[k].y
        ) {
          flying_planes[i].travel -= speed * 3;
        }

      }

      flying_planes[i].travel += speed;

      if (flying_planes[i].travel >= max_travel) {
        flying_planes[i].plane_color = Math.floor(Math.random() * plane_colors_lengnth),
          flying_planes[i].dir = !!Math.floor(Math.random() * 2),
          flying_planes[i].x = Math.floor(Math.random() * 21 - 11),
          flying_planes[i].y = Math.floor(Math.random() * 10 - 6),
          flying_planes[i].travel = -max_travel
      }
    }
  } else if (art_style == 1) {

    let sin_art = [
      color(255, 0, 0),
      color(255, 0, 0),
      color(255, 255, 0),
      color(0, 0, 255),
      color(0, 0, 255),
      color(0, 255, 0),
      color(0, 255, 0)
    ]


    let px_size = 1;
    for (let y = 0; y < y_render; y++) {
      {
        for (let x = 0; x < x_render; x++) {
          {
            let value = Math.floor(Math.sin((x * x + y * y) / l) * sin_art.length * 1.5) % (sin_art.length)

            if (value < 0) {
              value -= value * 2
            }
            push()
            translate(-width / 2, -height / 2)
            noStroke()
            fill(sin_art[value])
            square(x * px_size, y * px_size, px_size)
            pop()
          }
        }
      }
    }
    x_render += render_speed;
    if (x_render > width / px_size) {
      x_render = 0;
      y_render += render_speed;
    }
    y_render %= (height / px_size + render_speed);
  } else if (art_style == 2) {
    orbitControl()


    background(0)
    noStroke()



    fill(150)
    push()
    translate(0, -100, 0)
    cylinder(100, 50)
    pop()
    push()
    translate(0, 100, 0)
    cylinder(100, 50)
    pop()

    for (let i = 0; i < bubbles.length; i++) {
      push()
      translate(bubbles[i].x + Math.sin(bubbles[i].y / 10) * 3, bubbles[i].y + 100, bubbles[i].z - Math.cos(bubbles[i].y / 10) * 3)
      fill(255)
      sphere(bubbles[i].size)
      pop()
      bubbles[i].y -= (5 / bubbles[i].size)
      bubbles[i].y %= 200
    }



    fill(50, 150, 255, 125)
    cylinder(90, 149)


  } else if (art_style == 3) {
    background(0)
    noStroke()
    orbitControl()

    fill(255, 125, 0)
    sphere(sun_size)

    let planet_colors = [
      color(255,0,0),
      color(0,255,0),
      color(0,0,255),
      color(255,255),
      color(155,155,0),
      color(155,0,255)
    ]

    for (let i = 0; i < planets.length; i++){
      let orbit_line_xy = planets[i].travel - planets[i].r/15000 - planets[i].spd/10
      let orbit_line_shaddow = color(255)
      push()
      fill(planet_colors[planets[i].color])
      translate(planets[i].x, 0, planets[i].y)
      sphere(planets[i].size)
      

      planets[i].y = Math.sin(planets[i].travel) * planets[i].r
      planets[i].x = Math.cos(planets[i].travel) * planets[i].r

      planets[i].travel += planets[i].r/50000+planets[i].spd
      planets[i].travel %= Math.PI*2
      pop()

      for (let j = orbit_line_xy; j > (orbit_line_xy - Math.PI/3.5); j -= 1/(planets[i].r)){
        push()
        translate(Math.cos(j-0.01) * planets[i].r, 0, Math.sin(j-0.01) * planets[i].r)
        fill(orbit_line_shaddow)
        sphere(1)
        pop()
        orbit_line_shaddow = lerpColor(orbit_line_shaddow,color(0),0.02)
      }
    }
  }
}

function keyPressed() {
  if (keyCode === 8) {
    l = Math.floor(Math.random() * 80 + 20);
    make_bubbles()
    make_flying_planes()
    make_planets()

  } else if (keyCode === 13) {

    art_style++
    art_style %= art_styles
    resetCamera()
    background(0);
  }
}