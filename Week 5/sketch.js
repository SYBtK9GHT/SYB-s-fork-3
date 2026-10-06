let in_quiz = false;
let currnet_quiz = "";
let T = 0;
let F = 0;
let checking = false;

const quiz_button_size = 200

const quizes = {
  js: {
    promt1: {
      question: "what do programers think of javascript",
      awnsers: {
        ": shitty ": true,
        ": good ": false,
        ": niche ": false,
        ": practical ": false
      }
    },
    promt2: {
      question: "whats \"2\"+\"2\"-\"2\"",
      awnsers: {
        ": \"20\" ": true,
        ": 2 ": false,
        ": NULL ": false,
        ": \"2\" ": false
      }
    },
    promt3: {
      question: "whats the time javascript was built in",
      awnsers: {
        ": 2 weeks ": true,
        ": 2 days ": false,
        ": 2 months ": false,
        ": 2 years ": false
      }
    },
    promt4: {
      question: "why is js still around",
      awnsers: {
        ": it powers front end functions ": true,
        ": to torture students ": false,
        ": to teach what a bug is ": false,
        ": because the devil needs it ": false
      }
    },
    promt5: {
      question: "what is javascript good at",
      awnsers: {
        ": creating things its not supposed to ": true,
        ": make working projects ": false,
        ": being essential in frontend-web-dev ": false,
        ": being simple and bugless ": false
      }
    }
  },
  Morrowind: {
    promt1: {
      question: "what's the best skill in morrowind",
      awnsers: {
        ": alcemy ": true,
        ": spear ": false,
        ": restoration ": false,
        ": sneak ": false
      }
    },
    promt2: {
      question: "which of these armor is best?",
      awnsers: {
        ": colovian fur helm ": true,
        ": deadric chestplate  ": false,
        ": ice helm ": false,
        ": nordic chain currias ": false
      }
    },
    promt3: {
      question: "what is the 2nd sload soap proppety?",
      awnsers: {
        ": fortify agility ": true,
        ": drain heatl ": false,
        ": levitation ": false,
        ": cure bligt dissise ": false
      }
    },
    promt4: {
      question: "what race has the best magika bonus",
      awnsers: {
        ": altmer (high elf) ": true,
        ": breton ": false,
        ": argonian ": false,
        ": dunmer (dark elf) ": false
      }
    },
    promt5: {
      question: "what city does the player start in",
      awnsers: {
        ": seyda neen ": true,
        ": balmora ": false,
        ": vivec ": false,
        ": aldruin ": false
      }
    },
    promt6: {
      question: "what does the player become",
      awnsers: {
        ": neravarine ": true,
        ": azura ": false,
        ": dovakihn ": false,
        ": ashlander ": false
      }
    },
  }
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
}

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
        push()
        translate(i * (quiz_button_size+10) + 10, 100)
        fill(255)
        rect(0, 0, quiz_button_size, 100, 10)
        fill(0)
        textSize(30)
        text(key.toString(), 20, 60)
        pop()
      }
    } else if (quiz_index < quiz_order.length) {
      fill(255)
      rect(10, 10, 780, 75, 5)
      fill(0)
      textSize(49)
      text(("Q: " + quiz_order[quiz_index]["question"]), 20, 60)

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
        text((String.fromCharCode(65 + parseInt(i)) + " " + current_questions[i]), x * 395 + 20, y * 60 + 490)
      }
    } else {
      background(220);
      textSize(150);
      fill(0, 255, 0);
      text("T: " + T, 250, 200);
      fill(255, 0, 0);
      text("F: " + F, 250, 400);
    }
  }
}

function mouseClicked() {
  if (!in_quiz) {
    for (const key in quizes) {
      const i = pos = Object.keys(quizes).indexOf(key);
      if (mouseX > i * (quiz_button_size+10) + 10
        && mouseY > 100
        && mouseX < i * (quiz_button_size+10) + 10 + quiz_button_size
        && mouseY < 100 + 100) {
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

        if (check) {
          T++
          background(0, 255, 0)
        } else if (!check) {
          F++
          background(255, 0, 0)
        }
        setTimeout(() => {
          checking = false
        }, 2000)
        fill(255)
        if (checking) {
          console.log("BLA")
          fill(255, 0, 255)
        }


        console.log(check, i);
        quiz_index++
        shuffle_questions(quiz_order[quiz_index])
      }
    }


  } else {
    T = 0;
    F = 0;
    in_quiz = false;
  }
}