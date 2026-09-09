function setup() {
  createCanvas(600, 600);
  background(175);
}

const px = 180

function draw() {

  grid = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ]
  for (let y = 0; y < grid.length; y++){
    for (let x = 0; x < grid[y].length; x++){
      fill(75,75,75);
      const pos_x = x*px+20*x+10;
      const pos_y = y*px+20*y+10;
      square(pos_x, pos_y, px, 10);
      
    }
  }
}
