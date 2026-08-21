import questions from "./ass/questions.js";

let myScore = 0;
const totleScore = 5;

let donQuestion = [];

$(document).ready(function () {
  $(".button-start").click(() => {
    showQuizScreen();
  });
  $("#homeScreen").on("click", function () {
    reset();
    showHomeScreen();
  });
});

const reset = () => {
  donQuestion = [];
  $("#compleate-projress-qus").css("width", `0%`);
  $("#result h2").empty();
  $("#moralSaport").empty();
  myScore = 0;
};
const showQuizScreen = () => {
  $("#start-screen").toggleClass("active");
  $("#quiz-screen").toggleClass("active");
  // genreatQuestion()
  questionSelector();
};
const showResultScreen = () => {
  $("#quiz-screen").toggleClass("active");
  $("#result-screen").toggleClass("active");

  geareatResult();
};
const showHomeScreen = () => {
  $("#result-screen").toggleClass("active");
  $("#start-screen").toggleClass("active");
};

const questionSelector = () => {
  progUpdate(donQuestion.length);
  if (donQuestion.length >= totleScore) {
    showResultScreen();
    return;
  }
  let randNum;

  do {
    randNum = Math.floor(Math.random() * questions.length);
  } while (donQuestion.includes(randNum));

  donQuestion.push(randNum);
  const question = questions[randNum];
  genreatQuestion(question);
};

const genreatQuestion = (question) => {
  $("#main-qus h2").text(question.question);
  $("#qus-option").empty();
  question.options.forEach((option) => {
    $("#qus-option").append(`<div class="option">${option}</div>`);
  });
  console.log("anser " + question.answer);
  $("#qus-option div").on("click", function () {
    console.log($(this).text());
    if ($(this).text() === question.answer) {
      $(this).addClass("writeOption");
      myScore++;
      setTimeout(() => {
        questionSelector();
      }, 300);
    } else {
      $(this).addClass("wrongOption");
      setTimeout(() => {
        questionSelector();
      }, 300);
    }
  });
};

const progUpdate = (e) => {
  $("#current-qus").text(e);
  const progressIncreaseBy = (e / totleScore) * 100;
  $("#compleate-projress-qus").css("width", `+${progressIncreaseBy}%`);
};

const geareatResult = () => {
  if (myScore === 0) {
    $("#result h2").append("🔄 <br/>Try Again!");
    $("#moralSaport").text(
      "Every mistake is a chance to learn. Give it another try!",
    );
  } else if (myScore === 1) {
    $("#result h2").append("📚 <br/>Keep Practicing!");
    $("#moralSaport").text(
      "Don’t give up! Try again and learn from your mistakes.",
    );
  } else if (myScore === 2) {
    $("#result h2").append("💪 <br/> Keep Going!");
    $("#moralSaport").text("You’re getting there. A little more practice!");
  } else if (myScore === 3) {
    $("#result h2").append("👍 <br/> Good Job!");
    $("#moralSaport").text("Nice work! Keep practicing and you’ll improve.");
  } else if (myScore === 4) {
    $("#result h2").append("🌟 <br/>Excellent!");
    $("#moralSaport").text("Great job! You’re almost perfect!");
  } else if (myScore === 5) {
    $("#result h2").append("🏆 <br/> Perfect!");
    $("#moralSaport").text("Amazing! You got every question right!");
  }

  $("#myScore").text(myScore);
};
