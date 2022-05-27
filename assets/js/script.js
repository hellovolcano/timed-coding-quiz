// Import questions from JSON file

// JavaScript file for interactive coding quiz

// Features:
//  - Quiz is timed
//  - High scores are saved
//  - Asnwers to questions are validated to input into high score

// initialize these so I can delete them before asking the next question
var optionsListEl = '';
var question = '';
var incorrectAnswer = document.createElement("p");

// Initialize the question number to start at the first question in the array
var quesNum = 0;

// Store multiple-choice questions as an array of objects
var allQuestions = [
    {
        name: "What is the first letter of the alphabet?",
        options: ['A','B','C','D'],
        answer: "A"
    },
    {
        name: "What is the greatest band of all time?",
        options: ['KISS','Boyz II Men','Chumbawumba','Josh Groban'],
        answer: "Chumbawumba"
    }
]

// Initiliaze Counter variable to 30
var timer = 15;
var timerEl = document.querySelector("#counter-display");

// set an interval for the counter



// Set a button for the variable that starts the quiz
var startButtonEl = document.querySelector("#start-quiz-btn");
var testIntervalEl = document.querySelector("#intervalTest");

var questionWrapperEl = document.querySelector(".question-wrapper");
var userScore = [];

// Start quiz on button click:
// 1. Hide the content in the quiz-intro div 
var startQuiz = function(){
    // start the timer!
    var counterInterval = setInterval(function() {
        if (timer > 0) {
            console.log("Timer");
            document.getElementById("counter-display").textContent = timer--;
        } else {
            endQuiz;
            clearInterval(counterInterval);
            console.log("we here now the timer is at 0")
        }
    }, 1000);

    var totalNumQuestions = allQuestions.length;
    console.log("total number of questions: " + totalNumQuestions);

    quizIntroEl = document.querySelector(".quiz-intro");
    quizIntroEl.setAttribute("style", "display:none");

    if (quesNum === 0) {
        askQuestion(quesNum);
    } else if (quesNum === allQuestions.length) {
        console.log("Quiz is over");
        console.log("Questions answered: " + quesNum);
        endQuiz();
    } else {
        console.log("Ask the next question");

        // remove existing question div
        optionsListEl.remove();
        question.remove();
        askQuestion(quesNum);
    }
}

// Check the total number of questions
// Check the question number to ensure it's in range.
// if not 0 and not equal to the total number of questions delete any existing question-wrapper divs
//
// Ask the first question & validate answer
// Chec

// 2. Display a question in the question-wrapper div

var askQuestion = function(num) {

    // for loop to go through all the questions in the array

        question = document.createElement("h3");

        question.textContent = allQuestions[num].name;

        optionsListEl = document.createElement('ol');
        question.setAttribute("class", "question-test");

        //add a unique id to the question so we can use it to check the correct answer later
        allQuestions[num].id = num;

        // loop through all the options in the object for the question and add them as list items
        for (var i = 0; i < allQuestions[num].options.length; i++) {
            // var answers = [];
            var answer = document.createElement('li');
    
            // Add the options for the question to the list
            answer.textContent = allQuestions[num].options[i];

            // set a class for a possible answer for our event listeners to know when to do something
            answer.setAttribute("class","answer-selections");
    
            optionsListEl.appendChild(answer);
        } // end of the for loop to append the options to the question

        // write the question THEN the ol so they show up in the correct order in the html
        questionWrapperEl.append(question);
        questionWrapperEl.append(optionsListEl);
        //This is where I could maybe add the getAnswerHandler?
        questionWrapperEl.addEventListener("click", getAnswerHandler);
        
    
    // finished building all questions

}
// function for the event listener to store the user's selection in a variable
var getAnswerHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches('.answer-selections')) {
        var answerToCheck = event.target.textContent;
        checkAnswerHandler(answerToCheck, quesNum);
    }
    
    
}

// 3. On click of one of the list item/answers, check if the answer is correct
var checkAnswerHandler = function(answer, i) {
    if (answer === allQuestions[i].answer) {
        console.log ("You selected the correct answer")
        // if the answer is correct, increment the global question number and then ask the next question
        quesNum++;
        console.log(quesNum);

        // Ask the next question
        startQuiz();

        // Remove the incorrect answer flag
        incorrectAnswer.remove();
    } else {

        timer -= 5; // Decrement timer

        // TODO: refactor so incorrectAnswer doesn't need to be a global variable
        incorrectAnswer.setAttribute("class", "incorrect-answer");
        incorrectAnswer.textContent = "Wrong!";

        questionWrapperEl.after(incorrectAnswer);
    }
}
var endQuiz = function() {
    // Remove questions and answers
    optionsListEl.remove();
    question.remove();

    // Put a placeholder in for the form to add a high score
    var addHighScoreEl = document.createElement("p");
    addHighScoreEl.textContent = "You finished the game! Add your high score!"

    questionWrapperEl.append(addHighScoreEl);

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

// When the user selects an answer, store it in a variable