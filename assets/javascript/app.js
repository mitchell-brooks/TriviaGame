$(document).ready(function() {
  //establish timer variable
  var timeLeft = 30;
  //establish interval variable
  var intervalId;
  //variable for correct answers in a round
  var numCorrect = 0;
  //variable for incorrect answers in a round
  var numIncorrect = 0;
  var numUnanswered = 0;
  var currentGuess;
  var currentGuess;
  var currentQuestion;
  var currentAnswers;
  var currentCorrect;
  var questCount = 0;
  //array containing each question as its own object
  var triviaQuestions = [
    {
      question: "Who succeeded Frank McGuire as coach of the North Carolina men's basketball team?",
      answers: ["Dean Smith", "Roy Williams", "Bill Guthridge", "Lenny Rosenbluth"],
      correct: 0
    },
    {
      question: "Which Tar Heel player won the 1984 National Player of the Year Award?",
      answers: ["Jerry Stackhouse", "Rasheed Wallace", "James Worthy", "Michael Jordan"],
      correct: 3
    },
    {
      question: "Which 1960s North Carolina Tar Heels player was deemed too small to play in the NBA?",
      answers: ["George Karl", "Roy Williams", "Larry Brown", "Jack Cobb"],
      correct: 2
    },
    {
      question: "Who set North Carolina's single-game scoring record against Tulane in 1964?",
      answers: ["George Glamack", "Billy Cunningham", "Lennie Rosenbluth", "Jack Cobb"],
      correct: 1
    },
    {
      question: "How many overtimes did the 1957 Tar Heels play in the NCAA semi-final and finals tournament games combined?",
      answers: ["zero","two","three","six"],
      correct: 3
    }
  ]
//click event to start the game
$("#btnStart").click(function(){
  $("#question").empty();
  console.log("success")
  newQuestions();
  
}); 



// game function
function newQuestions(){
  //for loop running through the array of trivia question objects
// for(i=0; i<triviaQuestions.length; i++){
  //reset timer to 30 each time
  timeLeft = 20
  // start the timer
  run();
  // establish variables for user guess and for question-object properties
  currentGuess;
  currentQuestion = triviaQuestions[questCount].question;
  currentAnswers = triviaQuestions[questCount].answers;
  currentCorrect = triviaQuestions[questCount].correct;
  //insert question text into the html
  $("#question").html(currentQuestion);
  $("#answers").empty();
  // for loop to run through each of the answer choices
  for (i=0; i<currentAnswers.length; i++){
    //store html for a new button as a variable
    var buttonAnswer = $('<button class="answerBtn">' + currentAnswers[i] + '</button>');
    //add an attribute with the index of each answer choice (to compare against the correct index)
    $(buttonAnswer).attr({"value": i, "id": "btn" + i});
    //add the button to the answers div
    $("#answers").append(buttonAnswer)
  }
    //click function for each of the buttons
    $(".answerBtn").click(function(){
      //set a variable to the value attribute added to each button
      currentGuess = parseInt($(this).val());
      console.log(currentGuess);
      checkGuess();
      })
    
    
      
      }
    
    
  
  
function checkGuess() {
  if(currentGuess === currentCorrect){
    correctGuess();
  }
  else{
    incorrectGuess();
  }
}

function correctGuess(){
  stop();
  console.log("correct");
  $("#timer").html("You're right!");
  $("#question").html("The answer is:")
  $("#answers").html(triviaQuestions[questCount].answers[currentCorrect]);
  questCount++;
  numCorrect++;
  if (questCount === triviaQuestions.length){
    setTimeout(recap, 4 * 1000);
  }
  else {
  setTimeout(newQuestions, 4 * 1000);
}
}

function incorrectGuess(){
  stop();
  console.log("incorrect");
  $("#timer").html("Wrong");
  $("#question").html("The correct answer was:")
  $("#answers").html(triviaQuestions[questCount].answers[currentCorrect]);
  questCount++;
  numIncorrect++;
  if (questCount === triviaQuestions.length){
    setTimeout(recap, 4 * 1000);
  }
  else {
  setTimeout(newQuestions, 4 * 1000);
  }
}

function timeUp(){
  stop();
  console.log("incorrect");
  $("#timer").html("Time's Up");
  $("#question").html("The correct answer was:")
  $("#answers").html(triviaQuestions[questCount].answers[currentCorrect]);
  questCount++;
  numUnanswered++;
  if (questCount === triviaQuestions.length){
    setTimeout(recap, 4 * 1000);
  }
  else {
  setTimeout(newQuestions, 4 * 1000);
  }
}


function decrement() {
  timeLeft--;
  $("#timer").html("<h3>" + timeLeft + "</h3>");
  if (timeLeft === 0) {
    timeUp();
  }
}
function run() {
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);
}
function stop() {
  clearInterval(intervalId);
}
function recap() {
  $("#question").html("That's all folks!");
  $("#answers").empty();
  $("#answers").append('<p> Correct:' + numCorrect + '</p>');
  $("#answers").append('<p> Incorrect:' + numIncorrect + '</p>');
  $("#answers").append('<p> Unanswered:' + numUnanswered + '</p>');
  $("#answers").append('<button id="btnStart"> Retry </button>')
  questCount = 0;
  numCorrect = 0;
  numIncorrect = 0;
  numUnanswered = 0;
  $("#btnStart").click(function(){
    $("#question").empty();
    $("#answers").empty();
    newQuestions();
  }); 
 
}
}
)