const quizes = {
  javascript: [
    // promt1: 
    {
      question: "what do programers \nthink of javascript",
      awnsers: {
        "horrible": true,
        "good": false,
        "niche": false,
        "practical": false
      }
    },
    // promt2: 
    {
      question: "in javascript \nwhat's \"2\"+\"2\"-\"2\"",
      awnsers: {
        "20": true,
        "2": false,
        "NULL": false,
        "\"2\"": false
      }
    },
    // promt3: 
    {
      question: "whats the time \njavascript was built in",
      awnsers: {
        "2 weeks": true,
        "2 days": false,
        "2 months": false,
        "2 years": false
      }
    },
    // promt4: 
    {
      question: "why is this buggy programing \nlanguage still around today",
      awnsers: {
        "it powers front end functions": true,
        "to torture students": false,
        "to teach what a bug is": false,
        "unknown": false
      }
    },
    // promt5: 
    {
      question: "what is javascript \nactualy good at",
      awnsers: {
        "creating things its not supposed to": true,
        "make working projects": false,
        "being essential in frontend-web-dev": false,
        "being a bugless programing language": false
      }
    },
    // promt6: 
    {
      question: "how to console.log \n\"2\"+\"2\"-\"2\"",
      awnsers: {
        "\\\"2\\\"+\\\"2\\\"-\\\"2\\\"": true,
        "\"2\"+\"2\"-\"2\" ": false,
        "\\\"2\\\"+\\\"2\\\"-\\\"2\\\\n\"": false,
        "you can't": false
      }
    },
    // promt7: 
    {
      question: "why does javascript \nwork so weird sometimes",
      awnsers: {
        "it randomly converts thing to strings": true,
        "there's a  RNG in the compiler": false,
        "it's not discoverd yet": false,
        "bacause of how consequent data types are": false
      }
    },
    // promt8: 
    {
      question: "in javascript \nwhat's \"b\" + \"a\" + +\"a\" +\"a\" ",
      awnsers: {
        "\"baNaNa\"": true,
        "ERR": false,
        "\"baaa\"": false,
        "NULL ": false
      }
    },
    // promt9: 
    {
      question: "in javascript \nwhat's typeof NaN",
      awnsers: {
        "number": true,
        "NaN": false,
        "Undefined": false,
        "NULL": false
      }
    },
    // promt10: 
    {
      question: "in javascript \nwhat's !!null, (null === false) ",
      awnsers: {
        "false, false": true,
        "true, false": false,
        "false, true": false,
        "true, true": false
      }
    }
  ],

  Morrowind: [
    // promt1:
    {
      question: "what's the best \nskill in morrowind",
      awnsers: {
        "alcemy": true,
        "spear": false,
        "restoration": false,
        "sneak": false
      }
    },
    // promt2: 
    {
      question: "which of these armorpieces \nis the best",
      awnsers: {
        "colovian fur helm": true,
        "deadric chestplate": false,
        "ice helm": false,
        "nordic chain currias": false
      }
    },
    // promt3: 
    {
      question: "what is the 2nd \nsload soap propperty",
      awnsers: {
        "fortify agility": true,
        "drain heatl": false,
        "levitation": false,
        "cure bligt dissise": false
      }
    },
    // promt4: 
    {
      question: "what race has the \nbest magika bonus",
      awnsers: {
        "altmer (high elf)": true,
        "breton": false,
        "argonian": false,
        "dunmer (dark elf)": false
      }
    },
    // promt5: 
    {
      question: "what city does the \nplayer start in",
      awnsers: {
        "seyda neen": true,
        "balmora": false,
        "vivec": false,
        "aldruin": false
      }
    },
    // promt6: 
    {
      question: "what does the \nplayer become",
      awnsers: {
        "neravarine": true,
        "azura": false,
        "dovakihn": false,
        "ashlander": false
      }
    },
    // promt7: 
    {
      question: "where does the game \nmorrowind take place",
      awnsers: {
        "vvardenfell": true,
        "morrowind": false,
        "solstein": false,
        "mornhold": false
      }
    },
    // promt8: 
    {
      question: "who guides the player \nto defeat dagoth ur",
      awnsers: {
        "azura": true,
        "caius cosades": false,
        "the distand priest": false,
        "the wise woman": false
      }
    },
    // promt9: 
    {
      question: "wich house is the \nnervarine not hortator of",
      awnsers: {
        "indoril": true,
        "hlaalu": false,
        "telvani": false,
        "redoran": false
      }
    },
    // promt10: 
    {
      question: "what'the most importand \nstat in the game",
      awnsers: {
        "endurance": true,
        "wildpower": false,
        "strength": false,
        "intelligence ": false
      }
    },

  ],



  // furry: {
  //   promt1: {
  //     question: "what do programers think of javascript",
  //     awnsers: {
  //       ": shitty ": true,
  //       ": good ": false,
  //       ": niche ": false,
  //       ": practical ": false
  //     }
  //   },
  //   promt2: {
  //     question: "whats \"2\"+\"2\"-\"2\"",
  //     awnsers: {
  //       ": \"20\" ": true,
  //       ": 2 ": false,
  //       ": NULL ": false,
  //       ": \"2\" ": false
  //     }
  //   },
  //   promt3: {
  //     question: "whats the time javascript was built in",
  //     awnsers: {
  //       ": 2 weeks ": true,
  //       ": 2 days ": false,
  //       ": 2 months ": false,
  //       ": 2 years ": false
  //     }
  //   },
  //   promt4: {
  //     question: "why is js still around",
  //     awnsers: {
  //       ": it powers front end functions ": true,
  //       ": to torture students ": false,
  //       ": to teach what a bug is ": false,
  //       ": because the devil needs it ": false
  //     }
  //   },
  //   promt5: {
  //     question: "what is javascript good at",
  //     awnsers: {
  //       ": creating things its not supposed to ": true,
  //       ": make working projects ": false,
  //       ": being essential in frontend-web-dev ": false,
  //       ": being a simple programing language with no bugs and errors ": false
  //     }
  //   }
  // },

  "DEV TEST": [
    //promt1:
    {
      question: "_______________________\n_______________________",
      awnsers: {
        "this is a dev enviroment": true,
        "NULL": false,
        "Undefined": false,
        "false": false
      }
    },
  ]
}

let in_quiz = false;
let currnet_quiz = "";
let True_counter = 0;
let False_counter = 0;
let checking = false;
let last_time = 0;

const quiz_button_size = 200



let quiz_order = [];
let quiz_index = 0
let current_questions = [];


function shuffle_dict(dict) {
  let arr = Object.keys(dict);
  return shuffle(arr);
}

function shuffle_questions(my_promt) {
  current_questions = []
  const shuffled_awnsers = shuffle_dict(my_promt["awnsers"])
  for (const i in shuffled_awnsers) {
    current_questions.push(shuffled_awnsers[i])
  }
}

function play_quiz(quiz) {
  quiz_order = [];
  const Q = shuffle_dict(quiz)
  for (const i in Q) {
    quiz_order.push(quiz[Q[i]])
  }

}

function setup() {
  createCanvas(800, 600);
}

function draw() {

  if (!checking) {
    background(220);
    if (!in_quiz) {
      quiz_order = [];
      quiz_index = 0;
      current_questions = [];
      fill(0)
      textSize(50)
      text("SELECT A QUIZ", 200, 50)
      for (const key in quizes) {
        const i = pos = Object.keys(quizes).indexOf(key);
        let x = i
        let y = 0
        while (x > 2){
          x -= 3
          y++
        }

        push()
        translate(x * (quiz_button_size + 10) + 75, y * 110 + 100)
        fill(255)
        rect(0, 0, quiz_button_size, 100, 10)
        fill(0)
        textSize(30)
        text(key.toString(), 20, 60)
        pop()
      }
    } else if (quiz_index < quiz_order.length) {
      fill(255)
      rect(10, 10, 780, 145, 5)
      fill(0)
      textSize(90)
      text("Q: ", 30, 110)
      textSize(50)
      text(quiz_order[quiz_index]["question"], 140, 70)

      for (const i in current_questions) {
        let x = i
        let y = 0
        while (x > 1) {
          x -= 2
          y++
        }

        fill(255)
        if (checking) {
          fill(255, 0, 255)
        }
        rect(x * 395 + 10, y * 60 + 460, 390, 50, 5)
        fill(0)
        textSize(19)
        text((String.fromCharCode(65 + parseInt(i)) + ": " + current_questions[i]), x * 395 + 20, y * 60 + 490)
      }
    } else {
      background(220);
      textSize(150);
      fill(0, 255, 0);
      text("T: " + True_counter, 250, 200);
      fill(255, 0, 0);
      text("F: " + False_counter, 250, 400);
      fill(0);
      textSize(75);
      text("click to restart", 150, 500);

    }
  } else {

    setTimeout(() => {
      checking = false
    }, 750)
  }
}

function mouseClicked() {
  if (!checking) {
    if (!in_quiz) {
      for (const key in quizes) {
        const i = pos = Object.keys(quizes).indexOf(key);
        let x = i
        let y = 0
        while (x > 2){
          x -= 3
          y++
        }

        if (mouseX > x * (quiz_button_size + 10) + 75
          && mouseY > y * 110 + 100
          && mouseX < x * (quiz_button_size + 10) + 75 + quiz_button_size
          && mouseY < y * 110 + 100 + 100) {

          

          currnet_quiz = key.toString()
          console.log(currnet_quiz)
          in_quiz = true
          play_quiz(quizes[currnet_quiz]);
          shuffle_questions(quiz_order[quiz_index])
        }
      }
    } else if (quiz_index < quiz_order.length) {
      for (const i in current_questions) {

        let x = i
        let y = 0
        while (x > 1) {
          x -= 2
          y++
        }
        if (mouseX > x * 395 + 10
          && mouseY > y * 60 + 460
          && mouseX < x * 395 + 10 + 390
          && mouseY < y * 60 + 460 + 50) {

          let check = quiz_order[quiz_index]["awnsers"][current_questions[i]]
          checking = true

          background(220);
          if (check) {
            True_counter++
            fill(0, 255, 0)
            textSize(200)
            text("TRUE", 100, 350)
          } else if (!check) {
            False_counter++
            fill(255, 0, 0)
            textSize(200)
            text("FALSE", 100, 350)
          }
          console.log(check, i);
          quiz_index++
          shuffle_questions(quiz_order[quiz_index])
        }
      }


    } else {
      True_counter = 0;
      False_counter = 0;
      in_quiz = false;
    }
  } else {
    checking = false
  }
}