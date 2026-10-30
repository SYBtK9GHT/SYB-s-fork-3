class item {
  constructor(health, energy, happynes, satiety, price, messy, crafts) {
    this.health = health;
    this.energy = energy;
    this.happynes = happynes;
    this.satiety = satiety;
    this.price = price;
    this.messy = messy;
    this.crafts = crafts;
  }
}

const items = {
  granko: new item(0, 0, 20, 0, 1, 0.5, ["kofola", "studentská", "monster"]),
  kaiserbrötchen: new item(10, 30, 0, 0, 1, 0, [
    "suikerbrood",
    "instant noodles",
  ]),
  salko: new item(0, 40, 0, 0, 10, 0, [
    "parecetamol",
    "studentská",
    "suikerbrood",
  ]),

  "instant noodles": new item(0, 20, 0, 0, 0, 0, ["blahaj", "goulash"]),
  monster: new item(-5, 0, 10, 50, 0, 0, ["kofola", "goulash"]),
  studentská: new item(0, 50, 20, 0, 0, 0, ["kofola"]),
  suikerbrood: new item(-10, 90, 0, 0, 0, 0, []),
  blahaj: new item(20, -10, 80, 40, 0, 0, []),
  parecetamol: new item(80, 0, -40, 0, 0, 0, []),
  goulash: new item(30, 70, 50, 0, 0, 0, []),
  kofola: new item(10, 0, 30, 20, 0, 0, ["goulash", "instant noodles"]),

  vodka: new item(-30, 0, 50, 0, 1, 0, ["parecetamol", "monster"]),
};

const inventory_size = 21;

/*
salko + kaiserbrötchen = suikerbrood
salko + granko = studentská
salko + vodka = parecetamol
vodka + granko = monster
studentská + monster = kofola
kaiserbrötchen + kofola = instant noodles
instant noodles + monster = blahaj
instant noodle + kofola = gulash
*/

let inventory = [];

let yummy = undefined;
let blyat = undefined;
let blyat_playing = false;
let dissapointment = undefined

let item_icons = {
  granko: undefined,
  "instant noodles": undefined,
  kaiserbrötchen: undefined,
  kofola: undefined,
  monster: undefined,
  salko: undefined,
  studentská: undefined,
  suikerbrood: undefined,
  vodka: undefined,
  parecetamol: undefined,
  blahaj: undefined,
  goulash: undefined,
};

let selected_item = 0;
let selected_item_icon = undefined;

let selected_buying_item = 0;
let selected_buying_item_icon = undefined;

let selected_ingridiant_1 = 0;
let selected_ingridiant_1_icon = undefined;
let selected_ingridiant_2 = 1;
let selected_ingridiant_2_icon = undefined;
let outcome = "blahaj";
let outcome_icon = undefined;
let ingridiant_is_1_selected = true;

const max_rooms = 5;
let room = 1;
const button_width = 35;

let death_screen = undefined;
let game_over = false;
let death_SFX = undefined;
let last_scream = 0;
let restart_cooldown = 0;

let day_night_cycle_time = 360000;
let day_night_cycle = false;
let day_night_time_passed = 0;

let pixe_font = undefined;

let autosave_time = 0;

let rooms = [];
let rooms_button = [];
let outside_sky = [];

let in_shop = false;
let in_inventory = false;
let in_crafting = false;

let shybu = {
  aperance: {
    frown: undefined,
    dirty: undefined,
    angry: undefined,
    sleepy: undefined,
    hungry: undefined,
  },
  texture: undefined,
  stats: {
    health: 10,
    energy: 50,
    happynes: 50,
    satiety: 50,
  },
  coins: 5,
  size: 260,
  angry: false,
  clean: true,
};
const symbols = ["K", "M", "B", "T"];

let ui_coins = undefined;

let blanko = undefined;
let selected = undefined;

let in_game = false;
let ui_buttons = undefined;
let ui_inventory = undefined;
let ui_shop = undefined;
let ui_crafting = undefined;
let ui_cancel = undefined;

class bowl {
  constructor(x, y, broken, boosted) {
    this.x = x;
    this.y = y;
    this.broken = broken;
    this.boosted = boosted;
  }
}
let bowls = [];
let bowl_icons = [undefined, undefined, undefined];
const sprite_size = 64;
const game_border = 40;
let game_background = undefined;
let noodle_game_y = 0;
let noodle_Y = 0;
let noodle_jumping = false;
let removed_bowls = 0;
let boosted = false;
let jump = undefined;
let die = undefined;
let lego_break = undefined;
let die_playing = false;

let petting = undefined;

function preload() {
  bowl_icons[0] = loadImage("./assets/minigame/bowl.png");
  bowl_icons[1] = loadImage("./assets/minigame/super-bowl.png");
  bowl_icons[2] = loadImage("./assets/minigame/broken-bowl.png");

  blanko = loadImage("./assets/UI/blanko.png");
  selected = loadImage("./assets/UI/select.png");
  selected_item_icon = loadImage("./assets/UI/blanko.png");
  selected_buying_item_icon = loadImage("./assets/UI/blanko.png");
  game_background = loadImage("./assets/minigame/background.png");
  selected_ingridiant_1_icon = loadImage("./assets/UI/blanko.png");
  selected_ingridiant_2_icon = loadImage("./assets/UI/blanko.png");
  outcome_icon = loadImage("./assets/UI/blanko.png");

  ui_shop = loadImage("./assets/UI/shop.png");
  ui_coins = loadImage("./assets/UI/money.png");
  ui_cancel = loadImage("./assets/UI/cancel.png");
  ui_buttons = loadImage("./assets/UI/buttons.png");
  ui_crafting = loadImage("./assets/UI/crafting.png");
  ui_inventory = loadImage("./assets/UI/inventory.png");

  item_icons["salko"] = loadImage("./assets/items/salko.png");
  item_icons["vodka"] = loadImage("./assets/items/vodka.png");
  item_icons["granko"] = loadImage("./assets/items/granko.png");
  item_icons["kofola"] = loadImage("./assets/items/kofola.png");
  item_icons["blahaj"] = loadImage("./assets/items/blahaj.png");
  item_icons["monster"] = loadImage("./assets/items/monster.png");
  item_icons["goulash"] = loadImage("./assets/items/goulash.png");
  item_icons["studentská"] = loadImage("./assets/items/studentská.png");
  item_icons["parecetamol"] = loadImage("./assets/items/parecetamol.png");
  item_icons["suikerbrood"] = loadImage("./assets/items/suikerbrood.png");
  item_icons["kaiserbrötchen"] = loadImage("./assets/items/kaiserbrötchen.png");
  item_icons["instant noodles"] = loadImage(
    "./assets/items/instant-noodles.png",
  );

  yummy = loadSound("./assets/SFX/roblox-yummy.mp3");
  blyat = loadSound("./assets/SFX/blyat.mp3");
  dissapointment  = loadSound("./assets/SFX/dissapointment.mp3");
  jump = loadSound("./assets/SFX/jump.mp3");
  die = loadSound("./assets/SFX/pacman-die.mp3");
  lego_break = loadSound("./assets/SFX/lego-breaking.mp3");
  petting = loadSound("./assets/SFX/meow.mp3");

  shybu.texture = loadImage("./assets/shybu-looks/shybu.png");
  shybu.aperance.frown = loadImage("./assets/shybu-looks/shybu-frown.png");
  shybu.aperance.dirty = loadImage("./assets/shybu-looks/shybu-dirty.png");
  shybu.aperance.angry = loadImage("./assets/shybu-looks/shybu-angry.png");
  shybu.aperance.sleepy = loadImage("./assets/shybu-looks/shybu-sleepy.png");
  shybu.aperance.hungry = loadImage("./assets/shybu-looks/shybu-hungry.png");

  death_screen = loadImage("./assets/shybu-looks/death-screen.png");
  death_SFX = loadSound("./assets/SFX/Mare_Scream1.mp3");
  pixe_font = loadFont("./assets/font/PressStart2P-Regular.ttf");

  rooms[0] = loadImage("./assets/rooms/bath room.png");
  rooms[1] = loadImage("./assets/rooms/bedroom.png");
  rooms[2] = loadImage("./assets/rooms/playing room.png");
  rooms[3] = loadImage("./assets/rooms/living room.png");
  rooms[4] = loadImage("./assets/rooms/outside.png");

  rooms_button[0] = loadImage("./assets/rooms/bath room-button.png");
  rooms_button[1] = loadImage("./assets/rooms/bedroom-button.png");
  rooms_button[2] = loadImage("./assets/rooms/playing room-button.png");
  rooms_button[3] = loadImage("./assets/rooms/living room-button.png");
  rooms_button[4] = loadImage("./assets/rooms/outside-button.png");

  outside_sky[0] = loadImage("./assets/rooms/outside-night.png");
  outside_sky[1] = loadImage("./assets/rooms/outside-day.png");
}

function setup() {
  createCanvas(1200, 600);

  for (const i in shybu.stats) {
    if (getItem(i) != null) {
      shybu.stats[i] = getItem(i);
    }
  }
  if (getItem("clean") != null) {
    shybu.clean = getItem("clean");
  }
  if (getItem("coins") != null) {
    shybu.coins = getItem("coins");
  }
  if (getItem("inventory") != null) {
    inventory = getItem("inventory");
  }
  if (getItem("time") != null) {
    day_night_time_passed -= getItem("time");
  }
}

function draw() {
  textFont(pixe_font);
  strokeWeight(5);
  const night_shade = color(0, 20, 55);
  if (millis() - day_night_time_passed > day_night_cycle_time) {
    day_night_cycle = !day_night_cycle;
    day_night_time_passed += day_night_cycle_time;
  }
  if (day_night_cycle) {
    background(100, 200, 255);
    noTint();
  } else {
    background(night_shade);
    tint(lerpColor(color(0, 50, 75), color(255, 255, 255), 0.5));
  }

  if (!in_game) {
    if (selected_item < 0) {
      selected_item = 0;
    }

    if (!shybu.clean) {
      shybu.stats.health -= 0.0008 * deltaTime;
    }
    shybu.stats.energy -= 0.00005 * deltaTime;
    shybu.stats.satiety -= 0.00003 * deltaTime;
    shybu.stats.happynes -= 0.00001 * deltaTime;

    if (!game_over) {
      const clrs = [
        lerpColor(
          color(255, 0, 0),
          night_shade,
          Number(!day_night_cycle) * 0.5,
        ),
        lerpColor(
          color(0, 255, 0),
          night_shade,
          Number(!day_night_cycle) * 0.5,
        ),
        lerpColor(
          color(0, 0, 255),
          night_shade,
          Number(!day_night_cycle) * 0.5,
        ),
        lerpColor(
          color(200, 0, 255),
          night_shade,
          Number(!day_night_cycle) * 0.5,
        ),
        lerpColor(
          color(255, 225, 0),
          night_shade,
          Number(!day_night_cycle) * 0.5,
        ),
        lerpColor(color(255), night_shade, Number(!day_night_cycle) * 0.5),
      ];

      image(outside_sky[Number(day_night_cycle)], 0, 0);
      image(rooms[room], 0, 0);
      image(ui_coins, 0, 0);
      textSize(70);
      fill(clrs[4]);

      let coins_temp = shybu.coins;
      let coin_display = "";
      for (const i in symbols) {
        if (coins_temp / 1000 >= 1) {
          coins_temp /= 1000;

          coin_display = Math.floor(coins_temp * 10) / 10 + symbols[i];
        } else if (i < 1) {
          coin_display = Math.floor(coins_temp).toString();
        }
      }
      textSize(75);
      text(coin_display, 960 - coin_display.toString().length * 75, 125);

      if (millis() - autosave_time > 5000) {
        autosave_time = millis();
        if (Math.random() < 0.005) {
          shybu.clean = false;
        }
        save_data();
      }

      shybu.angry = false;

      for (const i in shybu.stats) {
        if (shybu.stats[i] < 0) {
          game_over = true;
          death_SFX.play();
          restart_cooldown = millis() - 500;
        }
        if (shybu.stats[i] > 100) {
          shybu.stats[i] -= shybu.stats[i] - 100;
        }
        if (shybu.stats[i] < 5) {
          shybu.angry = true;
        }
      }

      image(
        shybu.texture,
        (width - shybu.size) / 2,
        550 - shybu.size,
        shybu.size,
        shybu.size,
      );
      if (!shybu.clean) {
        image(
          shybu.aperance.dirty,
          (width - shybu.size) / 2,
          550 - shybu.size,
          shybu.size,
          shybu.size,
        );
      }
      if (shybu.stats.happynes < 50) {
        image(
          shybu.aperance.frown,
          (width - shybu.size) / 2,
          550 - shybu.size,
          shybu.size,
          shybu.size,
        );
      }
      if (shybu.stats.satiety < 50) {
        image(
          shybu.aperance.sleepy,
          (width - shybu.size) / 2,
          550 - shybu.size,
          shybu.size,
          shybu.size,
        );
      }
      if (shybu.stats.energy < 50) {
        image(
          shybu.aperance.hungry,
          (width - shybu.size) / 2,
          550 - shybu.size,
          shybu.size,
          shybu.size,
        );
      }
      if (shybu.angry) {
        image(
          shybu.aperance.angry,
          (width - shybu.size) / 2,
          550 - shybu.size,
          shybu.size,
          shybu.size,
        );
        image(
          shybu.aperance.frown,
          (width - shybu.size) / 2,
          550 - shybu.size,
          shybu.size,
          shybu.size,
        );
      }

      for (const i in shybu.stats) {
        const index = Object.keys(shybu.stats).indexOf(i);
        const bars = [
          color(255, 0, 0),
          color(0, 255, 0),
          color(0, 0, 255),
          color(200, 0, 255),
        ];
        stroke(0);
        strokeWeight(1);
        fill(bars[index]);
        rect(5 + 27 * index, height, 20, -((150 / 100) * shybu.stats[i]));
        strokeWeight(5);
      }

      if (!in_inventory && !in_shop && !in_crafting) {
        image(ui_buttons, 0, 0);
        image(rooms_button[room], 0, 0);
        blyat_playing = false;
      } else {
        image(ui_cancel, 0, 0);
        if (in_inventory) {
          if (inventory.length < 1) {
            textSize(50);
            fill(220);

            text("!EMPTY!", (width - 6 * 50) / 2, 200);
            if (!blyat_playing) {
              if (Math.random()*1.2 > 1){
              blyat.play();
            } else {
              dissapointment.play()
            }
              blyat_playing = true;
              shybu.stats.happynes *= 0.75;
            }
            setTimeout(() => {
              in_inventory = false;
            }, 2000);
          } else {
            while (selected_item > inventory.length) {
              selected_item--;
            }
            if (selected_item < 0) {
              selected_item = 0;
            }

            image(ui_inventory, 0, 0);

            for (const i in inventory) {
              let x = i;
              let y = 0;
              while (x >= 7) {
                x -= 7;
                y++;
              }

              image(item_icons[inventory[i]], 86 * x + 24, 86 * y + 24);
            }
            if (inventory.length > 0) {
              fill(clrs[5]);

              textSize(45);
              text("USE", 735, 390);

              image(selected_item_icon, 735, 442);

              selected_item_icon.copy(blanko, 0, 0, 128, 128, 0, 0, 128, 128);
              selected_item_icon.copy(
                item_icons[inventory[selected_item]],
                0,
                0,
                64,
                64,
                0,
                0,
                128,
                128,
              );

              for (const i in shybu.stats) {
                fill(
                  clrs[Object.keys(items[inventory[selected_item]]).indexOf(i)],
                );
                textFont(pixe_font);
                textSize(24);
                var val = items[inventory[selected_item]][i];
                if (val >= 0) {
                  val = " " + val.toString();
                }
                text(
                  val,
                  1100,
                  390 +
                    40 *
                      (Object.keys(items[inventory[selected_item]]).indexOf(i) +
                        1),
                );
                text(
                  i,
                  900,
                  390 +
                    40 *
                      (Object.keys(items[inventory[selected_item]]).indexOf(i) +
                        1),
                );
              }
              textSize(245 / inventory[selected_item].length);
              fill(clrs[4]);
              textFont(pixe_font);
              text(inventory[selected_item], 915, 390);
            }
          }
        } else if (in_crafting) {
          if (inventory.length < 2) {
            textSize(50);
            fill(220);

            text("!NOT ENOUGH METERIALS!", (width - 22 * 50) / 2, 200);
            if (!blyat_playing) {
              if (Math.random()*1.2 > 1){
              blyat.play();
            } else {
              dissapointment.play()
            }
              blyat_playing = true;
              shybu.stats.happynes *= 0.95;
            }
            setTimeout(() => {
              in_inventory = false;
            }, 2000);
          } else {
            image(ui_crafting, 0, 0);

            for (const i in inventory) {
              let x = i;
              let y = 0;
              while (x >= 7) {
                x -= 7;
                y++;
              }

              image(item_icons[inventory[i]], 86 * x + 24, 86 * y + 24);
            }

            image(selected_ingridiant_1_icon, 786, 160);
            image(selected_ingridiant_2_icon, 786 + 253, 160);
            image(outcome_icon, 786 + 253, 160 + 172);

            fill(clrs[5]);
            textSize(45);
            text("craft", 786 + 253 - 85, 160 + 172 + 225);

            selected_ingridiant_1_icon.copy(
              blanko,
              0,
              0,
              128,
              128,
              0,
              0,
              128,
              128,
            );
            selected_ingridiant_2_icon.copy(
              blanko,
              0,
              0,
              128,
              128,
              0,
              0,
              128,
              128,
            );
            if (ingridiant_is_1_selected) {
              selected_ingridiant_1_icon.copy(
                selected,
                0,
                0,
                128,
                128,
                0,
                0,
                128,
                128,
              );
            } else {
              selected_ingridiant_2_icon.copy(
                selected,
                0,
                0,
                128,
                128,
                0,
                0,
                128,
                128,
              );
            }
            selected_ingridiant_1_icon.copy(
              item_icons[inventory[selected_ingridiant_1]],
              0,
              0,
              64,
              64,
              0,
              0,
              128,
              128,
            );
            selected_ingridiant_2_icon.copy(
              item_icons[inventory[selected_ingridiant_2]],
              0,
              0,
              64,
              64,
              0,
              0,
              128,
              128,
            );
            outcome_icon.copy(blanko, 0, 0, 128, 128, 0, 0, 128, 128);
            outcome = "blanko";
            if (
              items[inventory[selected_ingridiant_1]] !=
              items[inventory[selected_ingridiant_2]]
            ) {
              for (const i in items[inventory[selected_ingridiant_1]].crafts) {
                for (const j in items[inventory[selected_ingridiant_2]]
                  .crafts) {
                  if (
                    items[inventory[selected_ingridiant_1]].crafts[i] ==
                    items[inventory[selected_ingridiant_2]].crafts[j]
                  ) {
                    outcome = items[inventory[selected_ingridiant_1]].crafts[i];
                  }
                }
              }
            }
            if (outcome != "blanko") {
              outcome_icon.copy(
                item_icons[outcome],
                0,
                0,
                64,
                64,
                0,
                0,
                128,
                128,
              );
            }
          }
        } else {
          image(ui_shop, 0, 0);

          image(selected_buying_item_icon, 180, 35);

          selected_buying_item_icon.copy(
            blanko,
            0,
            0,
            128,
            128,
            0,
            0,
            128,
            128,
          );
          selected_buying_item_icon.copy(
            item_icons[Object.keys(items)[selected_buying_item]],
            0,
            0,
            64,
            64,
            0,
            0,
            128,
            128,
          );
          textSize(40);
          fill(clrs[5]);

          text("BUY", 185, 340);
          fill(clrs[4]);
          textSize(45);
          text(
            items[Object.keys(items)[selected_buying_item]].price,
            240 -
              (items[Object.keys(items)[selected_buying_item]].price.toString()
                .length /
                2) *
                45,
            260,
          );
        }
      }
    } else {
      if (millis() - last_scream > 15000) {
        death_SFX.play();
        last_scream = millis();
      }
      noTint();
      background(50, 0, 0);
      image(death_screen, 0, (height - 520) / 2);
      fill(255, 0, 0);

      textSize(70);
      text("GAME-OVER ", width / 2 - 100, 200);
      textSize(40);
      text(
        "you have \ntreated your pet \nso poorly \nshe decided to \nMURRDER YOU!!!",
        width / 2 - 100,
        300,
      );

      if (millis() - restart_cooldown > 5000) {
        fill(255);
        text("?-RESTART-?", width / 2 - 100, 550);
      }
    }
  } else {
    image(game_background, 0, 0);
    noTint();
    fill(255);

    let score = noodle_game_y;
    let score_text = "";

    let noodle_x = mouseX;
    if (mouseX < game_border) {
      noodle_x = game_border;
    } else if (mouseX > width - game_border) {
      noodle_x = width - game_border;
    }
    image(
      item_icons["instant noodles"],
      noodle_x - sprite_size / 2,
      height / 3 - sprite_size + noodle_Y,
    );
    if (noodle_jumping) {
      const noodle_y_temp = noodle_Y;
      noodle_Y *= 0.9;
      noodle_game_y += noodle_y_temp * (1.1 + Number(!boosted) / 4) - noodle_Y;
    } else {
      boosted = false;
      noodle_Y += noodle_Y / 50 + 0.1 * deltaTime;
    }

    if (noodle_Y > height + sprite_size) {
      if (!die_playing) {
        die.play();
        save_data();
        die_playing = true;
        shybu.coins += noodle_game_y / 5000;
      }

      in_game = false;
    } else if (noodle_Y < 5) {
      noodle_jumping = false;
    }

    for (const i in bowls) {
      let x = i;
      let y = 0;
      while (x > 8) {
        x -= 9;
        y++;
      }
      let bowl_icon_incdex = 0;
      if (bowls[i].broken) {
        bowl_icon_incdex = 2;
      } else if (bowls[i].boosted) {
        bowl_icon_incdex = 1;
      }

      image(
        bowl_icons[bowl_icon_incdex],
        bowls[i].x,
        height - bowls[i].y - 60 + noodle_game_y,
      );

      if (
        noodle_x > bowls[i].x - sprite_size / 2 &&
        noodle_x < bowls[i].x + sprite_size / 2 + 90 &&
        height / 3 + noodle_Y < height - bowls[i].y - 60 + noodle_game_y + 20 &&
        height / 3 + noodle_Y > height - bowls[i].y - 60 + noodle_game_y - 20 &&
        !noodle_jumping
      ) {
        if (!bowls[i].broken) {
          noodle_jumping = true;
          shybu.coins += 0.1;
          jump.play();
          noodle_game_y += 1 / 1000;
        } else {
          lego_break.play();
          removed_bowls++;
          bowls.splice(i, 1);
          bowls.push(
            new bowl(
              Math.random() * (width - 90 - game_border * 2),
              bowls[bowls.length - 1].y + 100,
              !!Math.floor(Math.random() * (1.1 + noodle_game_y / 100000)),
              !!Math.floor(Math.random() * 1.1),
            ),
          );
        }
        if (!bowls[i].boosted) {
          boosted = true;
        }
      }
    }
    for (const i in symbols) {
      if (score / 1000 >= 1) {
        score /= 1000;

        score_text = Math.floor(score * 10) / 10 + symbols[i];
      } else if (i < 1) {
        score_text = Math.floor(score).toString();
      }
    }
    textSize(75);
    text(score_text.toString(), width - score_text.toString().length * 75, 100);

    if (noodle_game_y > 100 * (removed_bowls + 1)) {
      removed_bowls++;
      bowls.splice(0, 1);
      bowls.push(
        new bowl(
          Math.random() * (width - 90 - game_border * 2),
          bowls[bowls.length - 1].y + 100,
          !!Math.floor(Math.random() * (1.1 + noodle_game_y / 100000)),
          !!Math.floor(Math.random() * 1.1),
        ),
      );
    }
  }
}

function mouseClicked() {
  if (!in_game) {
    if (!game_over) {
      if (!in_inventory && !in_shop && !in_crafting) {
        image(ui_buttons, 0, 0);

        if (
          mouseX > 1105 &&
          mouseY > 5 &&
          mouseX < 1105 + 90 &&
          mouseY < 5 + 90
        ) {
          in_shop = true;
        }

        switch (room) {
          case 0:
            if (
              mouseX > 150 &&
              mouseY > 150 &&
              mouseX < 150 + 400 &&
              mouseY < 150 + 400
            ) {
              shybu.clean = true;
            }
            break;
          case 1:
            if (
              mouseX > 750 &&
              mouseY > 310 &&
              mouseX < 750 + 400 &&
              mouseY < 310 + 270 &&
              !day_night_cycle
            ) {
              if (shybu.stats.satiety > shybu.stats.health) {
                shybu.stats.health = shybu.stats.satiety;
              }
              shybu.stats.satiety = 100;
              shybu.stats.energy *= 0.7;
              day_night_time_passed -= day_night_cycle_time;
            }
            break;
          case 2:
            if (
              mouseX > 750 &&
              mouseY > 380 &&
              mouseX < 750 + 200 &&
              mouseY < 380 + 120
            ) {
              bowls = [];
              noodle_Y = 0;
              noodle_game_y = 0;
              noodle_jumping = 0;
              removed_bowls = 0;
              bowls.push(
                new bowl((width - 90 - game_border * 2) / 2, 0, false, false),
              );
              for (let i = 0; i < 8; i++) {
                bowls.push(
                  new bowl(
                    Math.random() * (width - 90 - game_border * 2),
                    bowls[bowls.length - 1].y + 100,
                    !!Math.floor(Math.random() * 1.1),
                    !!Math.floor(Math.random() * 1.1),
                  ),
                );
              }
              save_data();
              in_game = true;
            }
            if (
              mouseX > (width - shybu.size) / 2 &&
              mouseY > 550 - shybu.size &&
              mouseX < (width - shybu.size) / 2 + shybu.size &&
              mouseY < 550 - shybu.size + shybu.size
            ) {
              petting.play();
              shybu.stats.happynes += (100 - shybu.stats.happynes) / 50;
            }
            break;
          case 3:
            if (
              mouseX > 790 &&
              mouseY > 220 &&
              mouseX < 790 + 140 &&
              mouseY < 220 + 280
            ) {
              in_inventory = true;
            }

            break;
          case 4:
            if (
              mouseX > 970 &&
              mouseY > 400 &&
              mouseX < 970 + 160 &&
              mouseY < 400 + 140
            ) {
              in_crafting = true;
            }
            break;
        }

        if (
          mouseX > 0 &&
          mouseY > (height / 4) * 1.5 &&
          mouseX < button_width &&
          mouseY < (height / 4) * 1.5 + height / 4
        ) {
          room--;
          while (room < 0) {
            room++;
          }
        } else if (
          mouseX > width - button_width &&
          mouseY > (height / 4) * 1.5 &&
          mouseX < width &&
          mouseY < (height / 4) * 1.5 + height / 4
        ) {
          room++;
          while (room >= max_rooms) {
            room--;
          }
        }
      } else {
        if (
          mouseX > 1105 &&
          mouseY > 5 &&
          mouseX < 1105 + 90 &&
          mouseY < 5 + 90
        ) {
          in_crafting = false;
          in_inventory = false;
          in_shop = false;
        }
        if (in_inventory) {
          for (const i in inventory) {
            let x = i;
            let y = 0;
            while (x >= 7) {
              x -= 7;
              y++;
            }
            if (
              mouseX > 86 * x + 24 &&
              mouseY > 86 * y + 24 &&
              mouseX < 86 * x + 24 + 64 &&
              mouseY < 86 * y + 24 + 64
            ) {
              selected_item = Number(i);
            }
          }
          if (
            mouseX > 735 &&
            mouseY > 340 &&
            mouseX < 735 + 128 &&
            mouseY < 340 + 48
          ) {
            for (const i in shybu.stats) {
              shybu.stats[i] += items[inventory[selected_item]][i];
            }
            if (
              !!Math.floor(
                Number(Math.random()) +
                  0.1 +
                  items[inventory[selected_item]].messy,
              )
            ) {
              shybu.clean = false;
            }
            inventory.splice(selected_item, 1);
            if (selected_item > 0) {
              selected_item--;
            }
            yummy.play();
            if (inventory.length < 1) {
              in_inventory = false;
            }
          }
        } else if (in_crafting) {
          for (const i in inventory) {
            let x = i;
            let y = 0;
            while (x >= 7) {
              x -= 7;
              y++;
            }

            if (
              mouseX > 86 * x + 24 &&
              mouseY > 86 * y + 24 &&
              mouseX < 86 * x + 24 + 64 &&
              mouseY < 86 * y + 24 + 64
            ) {
              if (ingridiant_is_1_selected) {
                selected_ingridiant_1 = i;
              } else {
                selected_ingridiant_2 = i;
              }
            }
          }
          if (
            mouseX > 786 &&
            mouseY > 160 &&
            mouseX < 786 + 128 &&
            mouseY < 160 + 128
          ) {
            ingridiant_is_1_selected = true;
          } else if (
            mouseX > 786 + 253 &&
            mouseY > 160 &&
            mouseX < 786 + 253 + 128 &&
            mouseY < 160 + 128
          ) {
            ingridiant_is_1_selected = false;
          } else if (
            mouseX > 786 + 253 - 95 &&
            mouseY > 160 + 172 + 225 - 45 * 1.2 &&
            mouseX < 786 + 253 - 95 + 45 * 5.3 &&
            mouseY < 160 + 172 + 225 - 45 * 1.2 + 45 * 1.5
          ) {
            if (outcome != "blanko"){1
            console.log("crafted", items[outcome])
            if (selected_ingridiant_1 > selected_ingridiant_2){
            inventory.splice(selected_ingridiant_1,1)
            inventory.splice(selected_ingridiant_2,1)
          } else {
            inventory.splice(selected_ingridiant_2,1)
            inventory.splice(selected_ingridiant_1,1)
          }
            inventory.push(outcome);
            selected_ingridiant_1 = 0
            selected_ingridiant_2 = 1
            if (inventory.length < 2){
              in_crafting = false
            }
          }
          }
        } else {
          if (
            mouseX > 20 &&
            mouseY > 20 &&
            mouseX < 20 + 130 &&
            mouseY < 20 + 250
          ) {
            selected_buying_item--;
            while (selected_buying_item < 0) {
              selected_buying_item = Object.keys(items).length - 1;
            }
            while (items[Object.keys(items)[selected_buying_item]].price < 1) {
              selected_buying_item--;
            }
          } else if (
            mouseX > 330 &&
            mouseY > 20 &&
            mouseX < 330 + 130 &&
            mouseY < 20 + 250
          ) {
            selected_buying_item++;
            while (selected_buying_item >= Object.keys(items).length) {
              selected_buying_item = 0;
            }
            while (items[Object.keys(items)[selected_buying_item]].price < 1) {
              selected_buying_item++;
            }
          } else if (
            mouseX > 160 &&
            mouseY > 275 &&
            mouseX < 160 + 160 &&
            mouseY < 275 + 80 &&
            inventory.length < inventory_size
          ) {
            if (
              shybu.coins >=
              items[Object.keys(items)[selected_buying_item]].price
            )
              shybu.coins -=
                items[Object.keys(items)[selected_buying_item]].price;
            inventory.push(Object.keys(items)[selected_buying_item]);
          }
        }
      }
    } else if (
      mouseX > width / 2 - 100 &&
      mouseY > 510 &&
      mouseX < width / 2 - 100 + 435 &&
      mouseY < 510 + 40
    ) {
      restart();
    }
  } else {
  }
}

function keyPressed() {
  if (keyCode === 13) {
    in_game = false;
    save_data();
  }
}

function restart() {
  for (const i in shybu.stats) {
    shybu.stats[i] = 100;
  }
  shybu.coins = 20;
  shybu.clean = true;
  game_over = false;
  room = 1;
  inventory = []
  in_inventory = false;
  in_shop = false;
  in_crafting = false
  save_data();
}

function save_data() {
  for (const i in shybu.stats) {
    storeItem(i, shybu.stats[i]);
  }
  storeItem("time", millis() - day_night_time_passed);
  storeItem("clean", shybu.clean);
  storeItem("coins", shybu.coins);
  storeItem("inventory", inventory);
}
