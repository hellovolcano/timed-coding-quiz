// Import questions from JSON file

// JavaScript file for interactive coding quiz

// Features:
//  - Quiz is timed
//  - High scores are saved
//  - Asnwers to questions are validated to input into high score

// Initiliaze Counter variable to 30
var timer = 30;
var timerEl = document.querySelector("#counter-display");

// TODO--Create an array of objects -- 5 'question' objects in the array to loop through
// Store multiple-choice question as an object 
var question1 = {
    name: "What is the first letter of the alphabet?",
    options: ['A','B','C','D'],
    answer: "A"
}

var question2 = {
    name: "What is the greatest band of all time?",
    options: ['KISS','Boyz II Men','Chumbawumba','Josh Groban'],
    answer: "Chumbawumba"
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
    askQuestion();
}

// 2. Display a question in the question-wrapper div
var askQuestion = function() {
    var question = document.createElement("h3");
    question.textContent = question1.name;

    var optionsListEl = document.createElement('ol');
    question.setAttribute("class", "question-test");
    
    // loop through options in the question and add a list item for each
    console.log(question1.options.length); //TODO -- refactor so it's looping through an array of objects
    for (var i = 0; i < question1.options.length; i++) {
        // var answers = [];
        var answer = document.createElement('li');

        // Add the options for the question to the list
        answer.textContent = question1.options[i];

        // set a class for a possible answer for our event listeners to know when to do something
        answer.setAttribute("class","answer-selections");

        optionsListEl.appendChild(answer);
    }
    
    // write the question THEN the ol so they show up in the correct order in the html
    questionWrapperEl.append(question);
    questionWrapperEl.append(optionsListEl);

    console.log(questionWrapperEl);
}

// function for the event listener to store the user's selection in a variable
var getAnswerHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches('.answer-selections')) {
        var answerToCheck = event.target.textContent;
    }
    
    checkAnswerHandler(answerToCheck);
}

// 3. On click of one of the list item/answers, check if the answer is correct
var checkAnswerHandler = function(answer) {
    if (answer === question1.answer) {
        console.log ("You selected the correct answer")
        // add logic here to select the next question
    } else {

        timer -= 5; // Decrement timer
        // TODO: Print "Wrong!" underneath the question
        var incorrectAnswer = document.createElement("p");
        incorrectAnswer.setAttribute("class", "incorrect-answer");
        incorrectAnswer.textContent = "Wrong!";

        questionWrapperEl.after(incorrectAnswer);
    }
}

// 4. If correct, log true to userScore; if false, display the question until the correct answer is selected (but do not log), deduct points from counter
// 5. Loop through all the questions
// 6. Make the counter decrement regularly and stop the game when it's at 0
// 7. At the end of the quiz, display the score (time remaining in counter) and the option to save score (to a highScores obj)


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

// EVENT LISTENERS

// When the user clicks the start button, start the quiz
startButtonEl.addEventListener("click", startQuiz);
questionWrapperEl.addEventListener("click", getAnswerHandler);

// When the user selects an answer, store it in a variable