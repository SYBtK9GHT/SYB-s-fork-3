const px = 180;
let win = false;
let turn = false
let grid = [
  [0,0,0],
  [0,0,0],
  [0,0,0]
];


function setup() {
  createCanvas(600, 600);
  background(175);
}

function draw() {

  strokeWeight(5);

  const colors = [
    color(75),
    color(255,0,0),
    color(0,0,255)
  ];

  for (let y = 0; y < grid.length; y++){
    for (let x = 0; x < grid[y].length; x++){
      fill(colors[grid[y][x]]);
      const pos_x = x*px+20*x+10;
      const pos_y = y*px+20*y+10;
      square(pos_x, pos_y, px, 10);
    }
  }
}

function mouseClicked(){

  for (let y = 0; y < grid.length; y++){
    for (let x = 0; x < grid[y].length; x++){
      const pos_x = x*px+20*x+10;
      const pos_y = y*px+20*y+10;      

      if (mouseX > pos_x && mouseY > pos_y && mouseX < pos_x+px && mouseY < pos_y+px){
        if (grid[y][x] == 0){
          if (turn){
            grid[y][x] = 2;
          } else {
            grid[y][x] = 1;
          }
          turn = !turn;
        }

        if ((grid[y][0]== grid[y][1] && grid[y][2] == grid[y][1] && grid[y][2]!=0)||(grid[0][x]== grid[1][x] && grid[2][x] == grid[1][x] && grid[2][x]!=0)||(grid[0][0]==grid[1][1]&&grid[1][1]==grid[2][2]&&grid[0][0]!=0)||(grid[0][2]==grid[1][1]&&grid[1][1]==grid[2][0]&&grid[0][2]!=0)){
          win = true;
          turn = !turn;
        }
      }
    }
  }
  
      if (win){
        for (let i = 0; i < grid.length; i++){
          for(let j = 0; j < grid[i].length; j++){
          if (turn){
            console.log(turn)
            grid[i][j] = 2;
          } else {
            console.log(turn)
            grid[i][j] = 1;
          }
        }
      }
    }
}
