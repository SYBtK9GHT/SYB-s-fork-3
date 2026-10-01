const art_styles = 4;
let art_style = Math.floor(Math.random() * art_styles);



let flying_planes = [];
let angle = 0;
const plane_colors_lengnth = 10;
const plane_speed = 5;
const plane_shadows = 6;
const plane_size = 30;
const max_travel = 2000;
class flying_plane {
  constructor(plane_color, dir, x, y, travel) {
    this.plane_color = plane_color
    this.dir = dir
    this.x = x
    this.y = y
    this.travel = travel
  };
}
function make_flying_planes() {
  flying_planes = [];
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
  };
}
function draw_flying_plane(plane_color, dir, x, y, travel) {
  //picks a color from the paller
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
  ];
  let shadow = colors[plane_color];

  //draws the plane with a few addes shadows
  noStroke();
  for (let j = 0; j < plane_shadows; j++) {
    fill(shadow);
    push();
    if (dir) { rotate(90, [0, 1, 0]); }
    translate(x * plane_size * 1.1, -(y * plane_size * 2 * 1.05 + dir * plane_size * 1.1), travel - 20 * j);
    plane(plane_size);
    pop();
    shadow = lerpColor(shadow, color(0, 0, 0), (1.85 / plane_shadows))
  }
}



const MAX_ITER = 100;
let l, a, b;
let maxx, maxy;
let yy = 0;
function julia(x, y) {
  //calculats the fractal of julia
  for (let iter = 0; iter < MAX_ITER; iter++) {
    const u = Math.sin(x) * Math.cosh(y);
    const v = Math.cos(x) * Math.sinh(y);

    x = a * u - b * v;
    y = b * u + a * v;

    if (Math.abs(y) > 50 || Math.abs(x) > 50) {
      return iter;
    }
  }

  return MAX_ITER;
}
function julia_rng() {
  //add randomness to the julia fractal
  l = (Math.random() - 0.5) / 10
  a = 1 + l;
  b = 0.2 + l;
}



let bubbles = [];
class bubble {
  constructor(x, y, z, size) {
    this.x = x
    this.y = y
    this.z = z
    this.size = size
  };
}
function make_bubbles() {
  bubbles = [] //clears array
  //fill array
  for (let _ = 0; _ < 50; _++) {
    bubbles.push(new bubble(
      Math.floor(Math.random() * 100 - 50),
      Math.floor(Math.random() * 175 - 150),
      Math.floor(Math.random() * 100 - 50),
      Math.floor(1.2 * Math.random() * 2.5 + 2),
    ))
  };
}



let planets = [];
let sun_size = 50;
class planet {
  constructor(x, y, r, spd, size, color, travel) {
    this.x = x
    this.y = y
    this.r = r
    this.spd = spd
    this.size = size
    this.color = color
    this.travel = travel
  };
}
function make_planets() {
  planets = []
  for (let i = 0; i < 15; i++) {
    planets.push(new planet(
      0, 0,
      Math.floor(Math.random() * 7 + 1) * 3 + 55 * i + 15 + sun_size * 2,
      Math.random() / 75 + 0.05,
      Math.floor(Math.random() * 10 + 7),
      Math.floor(Math.random() * 6),
      Math.random() * 6.28
    ))
  };
}



function resetCamera() {
  //put cam in my custom default position and oriantation
  camera(
    0, 0, 800,  
    0, 0, 0,    
    0, 1, 0     
  );
}



function setup() {
  createCanvas(windowWidth - 15, windowHeight - 15, WEBGL);
  background(0);

  //make first rng to make them something other than NULL
  make_bubbles();
  make_flying_planes();
  make_planets();
  julia_rng();
}

function draw() {
  angleMode(DEGREES);
  if (art_style == 0) {

    //setup the cam and color
    background(0);
    rotate(-20, [1, 0, 0]);

    //rotates cam
    angle += 0.20;
    rotate(angle, [0, 1, 0]);


    //makes the planes vissible
    for (let i = 0; i < flying_planes.length; i++) {
      draw_flying_plane(
        flying_planes[i].plane_color,
        flying_planes[i].dir,
        flying_planes[i].x,
        flying_planes[i].y,
        flying_planes[i].travel
      );

      //makes sure the planes don't clip
      for (let k = 0; k < flying_planes.length; k++) {
        if (flying_planes[i] != flying_planes[k]
          && flying_planes[i].travel < flying_planes[k].travel
          && flying_planes[i].travel > flying_planes[k].travel - plane_speed * plane_shadows * 5
          && flying_planes[i].dir == flying_planes[k].dir
          && flying_planes[i].x == flying_planes[k].x
          && flying_planes[i].y == flying_planes[k].y
        ) {
          flying_planes[i].travel -= plane_speed * 3;
        }

      }

      //keeps em moving
      flying_planes[i].travel += plane_speed;

      //resets the planes at the end
      if (flying_planes[i].travel >= max_travel) {
        flying_planes[i].plane_color = Math.floor(Math.random() * plane_colors_lengnth),
          flying_planes[i].dir = !!Math.floor(Math.random() * 2),
          flying_planes[i].x = Math.floor(Math.random() * 21 - 11),
          flying_planes[i].y = Math.floor(Math.random() * 10 - 6),
          flying_planes[i].travel = -max_travel
      }
    }
  } else if (art_style == 1) {
    //makes sure it doesn't go on for infinity
    if (yy < height) {

      //makes sure the art doesn't look sstretched
      const aspect = width / height;

      const y = map(yy, 0, height, -Math.PI, Math.PI);

      for (let xx = 0; xx < width; xx++) {
        //calculates position with some complex math
        const x = map(
          xx,
          0,
          width,
          -Math.PI * aspect,
          Math.PI * aspect
        );

        const iter = julia(x, y);

        let r, g, b;
        //calculates the color with some complex math
        if (iter >= MAX_ITER) {
          r = 0;
          g = 0;
          b = 0;
        } else {
          r = Math.sin(iter / 12) ** 2 * 255;
          g = (15000 / Math.max(iter, 1)) % 256;
          b = (25000 / Math.max(Math.log(iter + 1), 1)) % 256;
        }

        stroke(r, g, b);
        //draws the art
        line(
          xx - width / 2,
          yy - height / 2,
          xx - width / 2,
          yy - height / 2 + iter
        );
      }
      yy ++;
    };
  } else if (art_style == 2) {

    //sets up the cam
    orbitControl()
    background(0)
    noStroke()



    //draws the bubbles
    for (let i = 0; i < bubbles.length; i++) {
      push()
      translate(bubbles[i].x + Math.sin(bubbles[i].y / 10) * 3, bubbles[i].y + 100, bubbles[i].z - Math.cos(bubbles[i].y / 10) * 3)
      fill(255)
      sphere(bubbles[i].size)
      pop()
      bubbles[i].y -= (5 / bubbles[i].size)
      bubbles[i].y %= 200
    }


    //draws the container or bottle or whatever
    fill(150)
    push()
    translate(0, -100, 0)
    cylinder(100, 50)
    pop()
    push()
    translate(0, 100, 0)
    cylinder(100, 50)
    pop()
    fill(50, 150, 255, 125)
    cylinder(90, 149)


  } else if (art_style == 3) {
    //sets up the cam
    background(0)
    noStroke()
    orbitControl()

    //draws the sun
    fill(255, 125, 0)
    sphere(sun_size)

    //a color plalet for the plannets
    let planet_colors = [
      color(255, 0, 0),
      color(0, 255, 0),
      color(0, 0, 255),
      color(255, 255),
      color(155, 155, 0),
      color(155, 0, 255)
    ]


    //draws the plannets
    for (let i = 0; i < planets.length; i++) {
      let orbit_line_xy = planets[i].travel - planets[i].r / 15000 - planets[i].spd / 10
      let orbit_line_shaddow = color(255)

      push()
      fill(planet_colors[planets[i].color])
      translate(planets[i].x, 0, planets[i].y)
      sphere(planets[i].size)


      planets[i].y = Math.sin(planets[i].travel) * planets[i].r
      planets[i].x = Math.cos(planets[i].travel) * planets[i].r

      planets[i].travel += planets[i].r / 50000 + planets[i].spd/2
      planets[i].travel %= Math.PI * 2
      pop()

      //draws a line after the pannets
      for (let j = orbit_line_xy; j > (orbit_line_xy - Math.PI / 3.5); j -= 1 / (planets[i].r)) {
        push()
        translate(Math.cos(j) * planets[i].r, 0, Math.sin(j) * planets[i].r)
        fill(orbit_line_shaddow)
        sphere(1)
        pop()
        orbit_line_shaddow = lerpColor(orbit_line_shaddow, color(0), 0.02)
      }
    }
  }
}

function keyPressed() {
  if (keyCode === 8) {
    //resets positions and renders
    yy = 0;
    clear();
    background(0);

    //rng everything
    julia_rng();
    make_bubbles();
    make_flying_planes();
    make_planets();


  } else if (keyCode === 13) {
    //switches art style or window or whatever you like to call it
    art_style++;
    art_style %= art_styles;
  
    resetCamera();
    
    //resets positions and renders
    yy = 0;
    clear();
    background(0);
  }
}