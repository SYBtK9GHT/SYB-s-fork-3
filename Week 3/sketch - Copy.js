const px = 45;
let win = false;
let turn = false
let start = 0;
let grid = [
  [-1, -1,  0,  0, -1, -1,  0,  0, -1, -1],
  [-1,  0,  0, -1, -1,  0,  0, -1,  0, -1],
  [ 0,  0, -1, -1,  0,  0, -1,  0,  0,  0],
  [ 0, -1, -1,  0,  0,  0,  0, -1, -1,  0],
  [-1,  0,  0,  0, -1,  0,  0,  0,  0, -1],
  [ 0,  0, -1,  0,  0,  0, -1,  0, -1,  0],
  [ 0, -1,  0,  0, -1, -1,  0,  0,  0,  0],
  [ 0,  0,  0, -1,  0,  0, -1, -1,  0, -1],
  [-1,  0, -1,  0,  0,  0,  0,  0,  0,  0],
  [-1,  0,  0, -1, -1,  0,  0, -1, -1, -1]
];


function setup() {
  createCanvas(1265, 650);

}

function draw() {
    
  strokeWeight(5);

  const colors = [
    color(75),
    color(255, 0, 0),
    color(0, 0, 255)
  ];
background(colors[turn+1]);
  //prints the grid
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] >= 0) {
        fill(colors[grid[y][x]]);
        const pos_x = x * px + 20 * x + 10;
        const pos_y = y * px + 20 * y + 10;
        square(pos_x, pos_y, px, 10);
      }
    }
  }
}




function mouseClicked() {
  if (!win) {
    for (let double_check = 0; double_check < 2; double_check++) {
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          const pos_x = x * px + 20 * x + 10;
          const pos_y = y * px + 20 * y + 10;
          //checks if i clicked a square
          if (mouseX > pos_x
            && mouseY > pos_y
            && mouseX < pos_x + px
            && mouseY < pos_y + px) {

            //check if square is empty and then fills it
            if (grid[y][x] == 0) {
              if (turn) {
                grid[y][x] = 2;
              } else {
                grid[y][x] = 1;
              }
              turn = !turn;
            }
          }




          //check rows
          if ((x - 1) > -1 && (x + 1) < grid[y].length) {
            if (grid[y][x - 1] == grid[y][x] && grid[y][x + 1] == grid[y][x] && grid[y][x + 1] > 0) {
              //triggers winning screen
              win = true;
              turn = grid[y][x] - 1;
            }
          }


          //check cols
          if ((y - 1) > -1 && (y + 1) < grid.length) {
            if (grid[y - 1][x] == grid[y][x] && grid[y + 1][x] == grid[y][x] && grid[y + 1][x] > 0) {
              //triggers winning screen
              win = true;
              turn = grid[y][x] - 1;
            }
          }

          if ((y - 1) > -1 && (y + 1) < grid.length && (x - 1) > -1 && (x + 1) < grid[y].length) {
            //check diagnal
            if ((grid[y - 1][x - 1] == grid[y][x] && grid[y][x] == grid[y + 1][x + 1] && grid[y][x] > 0)

              //check second diagnal
              || (grid[y - 1][x + 1] == grid[y][x] && grid[y][x] == grid[y + 1][x - 1] && grid[y - 1][x + 1] > 0)) {

              //triggers winning screen
              win = true;
              turn = grid[y][x] - 1;
            }
          }

        }
      }

      //shows the winning screen
      if (win) {
        for (let i = 0; i < grid.length; i++) {
          for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] >= 0) {
              grid[i][j] = turn + 1
            }
          }
        }
      }

      //checks if there are no more spaces left
      let restart = true;
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          if (grid[i][j] == 0 || win) {
            restart = false;
          }
        }
      }

      //restarts the game
      if (restart || win) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  }
}