const px = 45;
const button_px = 180;
const max_supported_players = 10
let win = false;
let max_players = 10;
let turn = 1;
let start = 0;
let grid = [];
let paused = true
let options = [
  [2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11],
]
const options_x = 132;
const options_y = 100;


function rng_grid() {
  grid = []
  for (let y = 0; y < 10; y++) {
    grid.push([]);
    for (let x = 0; x < 19; x++) {
      grid[y].push(Math.random() < (0.20 + 0.06 * max_players - Math.pow(max_players, 2)/500) ? 0 : -1);
    }
  }
}

function setup() {
  createCanvas(1265, 650);
  rng_grid();
}

function draw() {
  background(175)
  if (!paused) {
    const colors = [
      color(75),
      color(255, 0, 0),
      color(0, 0, 255),
      color(255, 255, 0),
      color(0, 255, 0),
      color(255, 145, 0),
      color(145, 0, 255),
      color(0, 255, 255),
      color(255),
      color(145, 75, 0),
      color(255, 105, 145)
    ];

    //prints the grid
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] >= 0) {

          const pos_x = x * px + 20 * x + 10;
          const pos_y = y * px + 20 * y + 10;
          fill(0, 0, 0, 0)
          strokeWeight(7);
          stroke(colors[turn])
          square(pos_x, pos_y, px, 10);
          fill(colors[grid[y][x]]);
          stroke(0)
          strokeWeight(5);
          square(pos_x, pos_y, px, 10);
        }
      }
    }
  } else {
    push()
    translate(options_x, options_y)
    noStroke();
    fill(125);
    rect(0, 0, 1000, 400);


    for (let i = 0; i < options.length; i++) {
      for (let j = 0; j < options[i].length; j++) {
        fill(75)
        stroke(0)
        strokeWeight(5)
        square(j * button_px + 20 * j + 10, i * button_px + 20 * i + 10, button_px, 10)
        fill(255)
        textSize(50)
        strokeWeight(1)
        if (options[i][j] != 11) {
          text(options[i][j].toString(),
            j * button_px + 20 * j + 85,
            i * button_px + 20 * i + 120);
        } else {
          text("reset\nboard",
            j * button_px + 20 * j + 45,
            i * button_px + 20 * i + 90);
        }
      }
    }
    pop()
  }
}

function keyPressed() {
  if (keyCode === 32) {
    paused = !paused;
  }
}

function reset_game(time) {
  setTimeout(() => {
    //window.location.reload();

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] >= 0) {
          grid[i][j] = 0;
        }
      }
    }
    win = false
    turn = 1

  }, time);
}

function won() {
  win = true;
  turn--;
  if (turn <= 0) {
    turn = max_players
  }
}

function mouseClicked() {
  if (!win && !paused) {
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
              grid[y][x] = turn
              turn++;
              if (turn > max_players) { turn = 1 }
            }
          }

          //check rows
          if ((x - 1) > -1 && (x + 1) < grid[y].length) {
            if (grid[y][x - 1] == grid[y][x] && grid[y][x + 1] == grid[y][x] && grid[y][x + 1] > 0) {
              //triggers winning screen
              won()
            }
          }


          //check cols
          if ((y - 1) > -1 && (y + 1) < grid.length) {
            if (grid[y - 1][x] == grid[y][x] && grid[y + 1][x] == grid[y][x] && grid[y + 1][x] > 0) {
              //triggers winning screen
              won()
            }
          }

          if ((y - 1) > -1 && (y + 1) < grid.length && (x - 1) > -1 && (x + 1) < grid[y].length) {
            //check diagnal
            if ((grid[y - 1][x - 1] == grid[y][x] && grid[y][x] == grid[y + 1][x + 1] && grid[y][x] > 0)

              //check second diagnal
              || (grid[y - 1][x + 1] == grid[y][x] && grid[y][x] == grid[y + 1][x - 1] && grid[y - 1][x + 1] > 0)) {

              //triggers winning screen
              won()
            }
          }
        }
      }

      //shows the winning screen
      if (win) {
        for (let i = 0; i < grid.length; i++) {
          for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] >= 0) {
              grid[i][j] = turn
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
        reset_game(1000);

      }
    }
  } else {
    for (let i = 0; i < options.length; i++) {
      for (let j = 0; j < options[i].length; j++) {
        let pos_y = i * button_px + 20 * i + options_y + 10;
        let pos_x = j * button_px + 20 * j + options_x + 10;
        if (mouseX > pos_x
          && mouseY > pos_y
          && mouseX < pos_x + button_px
          && mouseY < pos_y + button_px) {
          let selected_option = options[i][j];
          if (selected_option != 11){
            max_players = selected_option;
          }
          paused = false
          reset_game()
          rng_grid()
          
        }
      }
    }
  }
}