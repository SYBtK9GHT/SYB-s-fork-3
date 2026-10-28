class item {
  constructor(health, energy, happynes, satiety, price) {
    this.health = health
    this.energy = energy
    this.satiety = satiety
    this.happynes = happynes
    this.price = price
  }
}

const items = {
  "granko": new item(0, 0, 20, 0, 1),
  "instant noodles": new item(0, 20, 0, 0, 1),
  "kaiserbrötchen": new item(10, 30, 0, 0, 1),
  "kofola": new item(10, 0, 30, 20, 1),
  "monster": new item(-5, 0, 10, 50, 0),
  "salko": new item(0, 90, 0, 0, 1),
  "studentská": new item(0, 50, 20, 0, 0),
  "suikerbrood": new item(0, 60, 0, 0, 0),
  "vodka": new item(-30, 0, 50, 0, 1),

  "blahaj": new item(0, -10, 80, 20, 0),
    "parecetamol": new item(80, 0, -40, 0, 1),
}

const inventory_size = 21

/*
salko + kofola = vodka
salko + kaiserbrötchen = suikerbrood
salko + granko = studentská
monster + vodka = kofola
instant noodles + monster = blahaj

*/

let inventory = []

let yummy = undefined

let item_icons = {
  "granko": undefined,
  "instant noodles": undefined,
  "kaiserbrötchen": undefined,
  "kofola": undefined,
  "monster": undefined,
  "salko": undefined,
  "studentská": undefined,
  "suikerbrood": undefined,
  "vodka": undefined,
  "parecetamol": undefined,
  "blahaj": undefined
}

let selected_item = 0
let selected_item_icon = undefined

let selected_buying_item = 0
let selected_buying_item_icon = undefined


const max_rooms = 5
let room = 1
const button_width = 35

let death_screen = undefined
let game_over = false
let death_SFX = undefined
let last_scream = 0
let restart_cooldown = 0

let day_night_cycle_time = 120000
let day_night_cycle = false
let day_night_time_passed = 0

let pixe_font = undefined

let autosave_time = 0

let rooms = []
let rooms_button = []
let outside_sky = []

let in_shop = false
let in_inventory = false

let shybu = {
  aperance: {
    frown: undefined,
    dirty: undefined,
    angry: undefined,
    sleepy: undefined,
    hungry: undefined
  },
  texture: undefined,
  stats: {
    health: 10,
    energy: 50,
    satiety: 50,
    happynes: 50,
  },
  coins: 1,
  size: 260,
  angry: false,
  clean: true
}

let ui_coins = undefined

let blanko = undefined




let ui_buttons = undefined
let ui_inventory = undefined
let ui_shop = undefined
let ui_cancel = undefined

function preload() {

  blanko = loadImage("./assets/items/blanko.png")
  selected_item_icon = loadImage("./assets/items/blanko.png")
  selected_buying_item_icon = loadImage("./assets/items/blanko.png")



  ui_buttons = loadImage("./assets/UI/buttons.png")
  ui_inventory = loadImage("./assets/UI/inventory.png")
  ui_shop = loadImage("./assets/UI/shop.png")
  ui_cancel = loadImage("./assets/UI/cancel.png")
  ui_coins = loadImage("./assets/UI/money.png")

  item_icons["granko"] = loadImage("./assets/items/granko.png")
  item_icons["instant noodles"] = loadImage("./assets/items/instant noodles.png")
  item_icons["kaiserbrötchen"] = loadImage("./assets/items/kaiserbrötchen.png")
  item_icons["kofola"] = loadImage("./assets/items/kofola.png")
  item_icons["monster"] = loadImage("./assets/items/monster.png")
  item_icons["salko"] = loadImage("./assets/items/salko.png")
  item_icons["studentská"] = loadImage("./assets/items/studentská.png")
  item_icons["suikerbrood"] = loadImage("./assets/items/suikerbrood.png")
  item_icons["vodka"] = loadImage("./assets/items/vodka.png")
  item_icons["parecetamol"] = loadImage("./assets/items/parecetamol.png")
  item_icons["blahaj"] = loadImage("./assets/items/blahaj.png")

  yummy = loadSound("./assets/SFX/roblox-yummy.mp3")

  shybu.texture = loadImage("./assets/shybu-looks/shybu.png")
  shybu.aperance.frown = loadImage("./assets/shybu-looks/shybu-frown.png")
  shybu.aperance.dirty = loadImage("./assets/shybu-looks/shybu-dirty.png")
  shybu.aperance.angry = loadImage("./assets/shybu-looks/shybu-angry.png")
  shybu.aperance.sleepy = loadImage("./assets/shybu-looks/shybu-sleepy.png")
  shybu.aperance.hungry = loadImage("./assets/shybu-looks/shybu-hungry.png")

  death_screen = loadImage("./assets/shybu-looks/death-screen.png")
  death_SFX = loadSound("./assets/SFX/Mare_Scream1.mp3")
  pixe_font = loadFont("./assets/font/PressStart2P-Regular.ttf")

  rooms[0] = loadImage("./assets/rooms/bath room.png")
  rooms[1] = loadImage("./assets/rooms/bedroom.png")
  rooms[2] = loadImage("./assets/rooms/playing room.png")
  rooms[3] = loadImage("./assets/rooms/living room.png")
  rooms[4] = loadImage("./assets/rooms/outside.png")

  rooms_button[0] = loadImage("./assets/rooms/bath room-button.png")
  rooms_button[1] = loadImage("./assets/rooms/bedroom-button.png")
  rooms_button[2] = loadImage("./assets/rooms/playing room-button.png")
  rooms_button[3] = loadImage("./assets/rooms/living room-button.png")
  rooms_button[4] = loadImage("./assets/rooms/outside-button.png")

  outside_sky[0] = loadImage("./assets/rooms/outside-night.png")
  outside_sky[1] = loadImage("./assets/rooms/outside-day.png")
}

function setup() {
  for (let i = 0; i < 2; i++) {
    for (const i in items) {
      if (inventory_size > inventory.length && items[i].price > 0) {
        inventory.push(i)
      }
    }
  }

  console.log(inventory)

  createCanvas(1200, 600);
  for (const i in shybu.stats) {
    if (getItem(i) != null) {
      shybu.stats[i] = getItem(i)
    }
  }
  if (getItem("clean") != null) {
    shybu.clean = getItem("clean")
  }
  if (getItem("time") != null) {
    day_night_time_passed -= getItem("time")
  }

}

function draw() {
  textFont(pixe_font)
  strokeWeight(5)

  const night_shade = color(0, 20, 55)
  if (selected_item < 0) {
    selected_item = 0
  }


  if (millis() - day_night_time_passed > day_night_cycle_time) {
    day_night_cycle = !day_night_cycle
    day_night_time_passed += day_night_cycle_time
  }
  if (day_night_cycle) {
    background(100, 200, 255)
    noTint()
  } else {
    background(night_shade)
    tint(lerpColor(color(0, 50, 75), color(255, 255, 255), 0.5))
  }



  shybu.stats.energy -= 0.00005 * deltaTime
  shybu.stats.satiety -= 0.00005 * deltaTime
  shybu.stats.happynes -= 0.00001 * deltaTime



  if (!game_over) {
    const clrs = [
      lerpColor(color(255, 0, 0), night_shade, Number(!day_night_cycle) * 0.5),
      lerpColor(color(0, 255, 0), night_shade, Number(!day_night_cycle) * 0.5),
      lerpColor(color(0, 0, 255), night_shade, Number(!day_night_cycle) * 0.5),
      lerpColor(color(200, 0, 255), night_shade, Number(!day_night_cycle) * 0.5),
      lerpColor(color(255, 225, 0), night_shade, Number(!day_night_cycle) * 0.5),
      lerpColor(color(255), night_shade, Number(!day_night_cycle) * 0.5),
    ]

    image(outside_sky[Number(day_night_cycle)], 0, 0)
    image(rooms[room], 0, 0)
    image(ui_coins, 0, 0)
    textSize(70)
    fill(clrs[4])

    text(shybu.coins, 960 - shybu.coins.toString().length * 70, 125)

    if (millis() - autosave_time > 5000) {
      autosave_time = millis()
      if (Math.random() < 0.005) { shybu.clean = false }
      save_data()
    }


    shybu.angry = false


    for (const i in shybu.stats) {
      if (shybu.stats[i] < 0) {
        game_over = true
        death_SFX.play()
        restart_cooldown = millis() - 500
      }
      if (shybu.stats[i] > 100) {
        shybu.stats[i] -= shybu.stats[i] - 100
      }
      if (shybu.stats[i] < 5) {
        shybu.angry = true
      }
    }

    image(shybu.texture, (width - shybu.size) / 2, 550 - shybu.size, shybu.size, shybu.size)
    if (!shybu.clean) {
      image(shybu.aperance.dirty, (width - shybu.size) / 2, 550 - shybu.size, shybu.size, shybu.size)
    }
    if (shybu.stats.happynes < 50) {
      image(shybu.aperance.frown, (width - shybu.size) / 2, 550 - shybu.size, shybu.size, shybu.size)
    }
    if (shybu.stats.satiety < 50) {
      image(shybu.aperance.sleepy, (width - shybu.size) / 2, 550 - shybu.size, shybu.size, shybu.size)
    }
    if (shybu.stats.energy < 50) {
      image(shybu.aperance.hungry, (width - shybu.size) / 2, 550 - shybu.size, shybu.size, shybu.size)
    }
    if (shybu.angry) {
      image(shybu.aperance.angry, (width - shybu.size) / 2, 550 - shybu.size, shybu.size, shybu.size)
      image(shybu.aperance.frown, (width - shybu.size) / 2, 550 - shybu.size, shybu.size, shybu.size)
    }


    for (const i in shybu.stats) {
      const index = Object.keys(shybu.stats).indexOf(i)
      const bars = [
        color(255, 0, 0),
        color(0, 255, 0),
        color(0, 0, 255),
        color(200, 0, 255),
      ]
      stroke(0)
      strokeWeight(1)
      fill(bars[index])
      rect(5 + 27 * index, height, 20, -(150 / 100 * shybu.stats[i]))
      strokeWeight(5)
    }


    if (!in_inventory && !in_shop) {
      image(ui_buttons, 0, 0)
      image(rooms_button[room], 0, 0)

    } else {
      image(ui_cancel, 0, 0)
      if (in_inventory) {
        if (inventory.length < 1) {
          textSize(50)
          fill(220)

          text("!EMPTY!", (width - 6 * 50) / 2, 200)
          setTimeout(() => {

            in_inventory = false
          },
            2000)

        } else {

          while (selected_item > inventory.length) {
            selected_item--
          }
          if (selected_item < 0) {
            selected_item = 0
          }

          image(ui_inventory, 0, 0)

          for (const i in inventory) {
            let x = i
            let y = 0
            while (x >= 7) {
              x -= 7
              y++
            }

            image(item_icons[inventory[i]], 86 * x + 24, 86 * y + 24)
          }
          if (inventory.length > 0) {


            fill(clrs[5])

            textSize(45)
            text("USE", 735, 390)

            image(selected_item_icon, 735, 442)

            selected_item_icon.copy(blanko, 0, 0, 128, 128, 0, 0, 128, 128)
            selected_item_icon.copy(item_icons[inventory[selected_item]], 0, 0, 64, 64, 0, 0, 128, 128)


            for (const i in shybu.stats) {
              fill(clrs[Object.keys(items[inventory[selected_item]]).indexOf(i)])
              textFont(pixe_font)
              textSize(24)
              var val = items[inventory[selected_item]][i]
              if (val >= 0) { val = " " + val.toString() }
              text(val, 1100, 390 + 40 * (Object.keys(items[inventory[selected_item]]).indexOf(i) + 1))
              text(i, 900, 390 + 40 * (Object.keys(items[inventory[selected_item]]).indexOf(i) + 1))
            }
            textSize(245 / inventory[selected_item].length)
            fill(clrs[4])
            textFont(pixe_font)
            text(inventory[selected_item], 915, 390)
          }
        }


      } else {
        image(ui_shop, 0, 0)

        image(selected_buying_item_icon, 180, 35)

        selected_buying_item_icon.copy(blanko, 0, 0, 128, 128, 0, 0, 128, 128)
        selected_buying_item_icon.copy(item_icons[Object.keys(items)[selected_buying_item]], 0, 0, 64, 64, 0, 0, 128, 128)
        textSize(40)
        fill(clrs[5])

        text("BUY", 185, 340)
        fill(clrs[4])
        textSize(45)
        text(items[Object.keys(items)[selected_buying_item]].price, 240 - (items[inventory[selected_buying_item]].price.toString().length / 2 * 45), 260)
      }
    }


  } else {

    if (millis() - last_scream > 15000) {
      console.log("scream")
      death_SFX.play()
      last_scream = millis()
    }
    noTint()
    background(50, 0, 0)
    image(death_screen, 0, (height - 520) / 2)
    fill(255, 0, 0)

    textSize(70)
    text("GAME-OVER ", width / 2 - 100, 200)
    textSize(40)
    text("you have \ntreated your pet \nso poorly \nshe decided to \nMURRDER YOU!!!", width / 2 - 100, 300)

    if (millis() - restart_cooldown > 5000) {
      fill(255)
      text("?-RESTART-?", width / 2 - 100, 550)
    }
  }


}

function mouseClicked() {

  if (!game_over) {
    if (!in_inventory && !in_shop) {
      image(ui_buttons, 0, 0)

      if (mouseX > 1105
        && mouseY > 5
        && mouseX < 1105 + 90
        && mouseY < 5 + 90
      ) {
        in_shop = true
      }



      switch (room) {
        case 0:
          if (mouseX > 150
            && mouseY > 150
            && mouseX < 150 + 400
            && mouseY < 150 + 400
          ) {
            shybu.clean = true
          }
          break;
        case 1:
          if (mouseX > 750
            && mouseY > 310
            && mouseX < 750 + 400
            && mouseY < 310 + 270
            && !day_night_cycle
          ) {
            if (shybu.stats.satiety > shybu.stats.health) {
              shybu.stats.health = shybu.stats.satiety
            }
            shybu.stats.satiety = 100
            shybu.stats.energy *= 0.70
            day_night_time_passed -= day_night_cycle_time

          }
          break;
        case 2:
          if (mouseX > (width - shybu.size) / 2
            && mouseY > 550 - shybu.size
            && mouseX < (width - shybu.size) / 2 + shybu.size
            && mouseY < 550 - shybu.size + shybu.size
          ) {

            shybu.stats.happynes += (100 - shybu.stats.happynes) / 2
          }
          break;
        case 3:
          if (mouseX > 790
            && mouseY > 220
            && mouseX < 790 + 140
            && mouseY < 220 + 280
          ) {

            in_inventory = true

          }
          break;
        case 4:
          //TODO add somthing
          break;
      }


      if (mouseX > 0
        && mouseY > height / 4 * 1.5
        && mouseX < button_width
        && mouseY < height / 4 * 1.5 + height / 4
      ) {
        room--
        while (room < 0) {
          room++
        }
      } else if (mouseX > width - button_width
        && mouseY > height / 4 * 1.5
        && mouseX < width
        && mouseY < height / 4 * 1.5 + height / 4
      ) {
        room++
        while (room >= max_rooms) {
          room--
        }
      }
    } else {
      if (mouseX > 1105
        && mouseY > 5
        && mouseX < 1105 + 90
        && mouseY < 5 + 90
      ) {
        in_inventory = false
        in_shop = false
      }
      if (in_inventory) {
        for (const i in inventory) {
          let x = i
          let y = 0
          while (x >= 7) {
            x -= 7
            y++
          }
          if (mouseX > 86 * x + 24
            && mouseY > 86 * y + 24
            && mouseX < 86 * x + 24 + 64
            && mouseY < 86 * y + 24 + 64
          ) {
            selected_item = Number(i)
          }
        }
        if (mouseX > 735
          && mouseY > 340
          && mouseX < 735 + 128
          && mouseY < 340 + 48) {
          for (const i in shybu.stats) {
            shybu.stats[i] += items[inventory[selected_item]][i]
            console.log(selected_item)

          }
          inventory.splice(selected_item, 1)
          if (inventory.length < 1) {
            in_inventory = false
          }
        }
      } else {
        if (mouseX > 20
          && mouseY > 20
          && mouseX < 20 + 130
          && mouseY < 20 + 250) {
          selected_buying_item--
          while (selected_buying_item < 0) {
            selected_buying_item = Object.keys(items).length - 1
          }
          while(items[Object.keys(items)[selected_buying_item]].price < 1){
            selected_buying_item--
          }
        } else if (mouseX > 330
          && mouseY > 20
          && mouseX < 330 + 130
          && mouseY < 20 + 250) {
          selected_buying_item++
          while (selected_buying_item >= Object.keys(items).length) {
            selected_buying_item = 0
          }
          while(items[Object.keys(items)[selected_buying_item]].price < 1){
            selected_buying_item++
          }
        }
      }
    }
  } else if (
    mouseX > width / 2 - 100 &&
    mouseY > 510 &&
    mouseX < width / 2 - 100 + 435 &&
    mouseY < 510 + 40
  ) {
    restart()
  }
}

function restart() {
  for (const i in shybu.stats) {
    shybu.stats[i] = 100
  }
  shybu.clean = true
  game_over = false
  room = 1
}

function save_data() {
  for (const i in shybu.stats) {
    storeItem(i, shybu.stats[i])
  }
  storeItem("time", millis() - day_night_time_passed)
  storeItem("clean", shybu.clean)
}