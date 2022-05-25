// JavaScript file for interactive coding quiz

// Features:
//  - Quiz is timed
//  - High scores are saved
//  - Asnwers to questions are validated to input into high score

// Initiliaze Counter variable to 30
var timer = 30;


// Store multiple-choice question as an object 
var question1 = {
    name: "",
    options: "",
    answer: ""
}
// Set a button for the variable that starts the quiz
var startButtonEl = document.querySelector("#start-quiz-btn");

var questionWrapperEl = document.querySelector(".question-wrapper");
var userScore = [];

// Start quiz on button click:
// 1. Hide the content in the quiz-intro div 
var startQuiz = function(){
    quizIntroEl = document.querySelector(".quiz-intro");
    quizIntroEl.setAttribute("style", "display:none");
    questionWrapperEl.setAttribute("style", "display:initial")
}

startButtonEl.addEventListener("click", startQuiz);


// 2. Display the first question in the question-wrapper div
// 3. On click of one of the list item/answers, validate the answer
// 4. If correct, log true to userScore; if false, display the question until the correct answer is selected (but do not log)
// 5. Loop through all the questions
// 6. At the end of the quiz, display the score (time remaining in counter) and the option to save score (to a highScores obj)

// Loop through and display all of the questions in an array to the user


// Validate the user's response and write true to userScore if the answer was correct; if false, look false
// to userScore array, but present question again but do not log true to the userScore array

// MAYBE: Check to see if there is already a value in the position of the i/question # 


// ACCEPTANCE CRITERIA

// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score