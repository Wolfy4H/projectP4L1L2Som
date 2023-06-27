let playing = false;
let score;
let action;
let timeremaining;
let correctAnswer;

document.getElementById("startgame").onclick = function () {
  if (playing == true) {
    location.reload();
  } else {
    playing = true;
    score = 0;

    document.getElementById("scorevalue").innerHTML = score;
    show("timeremaining");
    timeremaining = 10;

    document.getElementById("timeremainingvalue").innerHTML = timeremaining;

    hide("gameover");
    hide("correct");
    hide("wrong");

    document.getElementById("startgame").innerHTML = "Reset Game";

    startCountdown();

    generateQuestion();
  }
};

for (let i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function () {
    if (playing == true) {
      if (this.innerHTML == correctAnswer) {
        score++;
        document.getElementById("scorevalue").innerHTML = score;
        hide("wrong");
        show("correct");
        setTimeout(function () {
          hide("correct");
        }, 1000);

        timeremaining += 2;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;

        generateQuestion();
      } else {
        score--;
        document.getElementById("scorevalue").innerHTML = score;
        hide("correct");
        show("wrong");
        setTimeout(function () {
          hide("wrong");
        }, 1000);

        timeremaining -= 3;
        if (timeremaining <= 0) {
          stopCountdown();
          show("gameover");

          // Game over
          document.getElementById("gameover").innerHTML =
            "<p>Game over!</p><p>Your score is " + score + ".</p>";
          hide("timeremaining");
          hide("correct");
          hide("wrong");
          playing = false;

          document.getElementById("startgame").innerHTML = "Start Game";
        }
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
      }
    }
  };
}

function startCountdown() {
  action = setInterval(function () {
    timeremaining -= 1;

    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    if (timeremaining <= 0) {
      stopCountdown();
      show("gameover");

      // Game over
      document.getElementById("gameover").innerHTML =
        "<p>Game over!</p><p>Your score is " + score + ".</p>";
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing = false;

      document.getElementById("startgame").innerHTML = "Start Game";
    }
  }, 1000);
}

function stopCountdown() {
  clearInterval(action);
}

function hide(Id) {
  document.getElementById(Id).style.display = "none";
}

function show(Id) {
  document.getElementById(Id).style.display = "block";
}

function generateQuestion() {
  let x = 1 + Math.round(9 * Math.random());
  let y = 1 + Math.round(9 * Math.random());
  correctAnswer = x * y;

  document.getElementById("question").innerHTML = x + "x" + y;
  let correctPosition = 1 + Math.round(3 * Math.random());

  document.getElementById("box" + correctPosition).innerHTML = correctAnswer; // Correct answer

  let answers = [correctAnswer];

  for (let i = 1; i < 5; i++) {
    if (i != correctPosition) {
      let wrongAnswer;
      do {
        wrongAnswer =
          (1 + Math.round(9 * Math.random())) *
          (1 + Math.round(9 * Math.random()));
      } while (answers.indexOf(wrongAnswer) > -1);

      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}
