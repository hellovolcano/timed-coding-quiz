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

// Set the initial value of the timer and display it on the page on load
var timer = 15;
document.querySelector("#counter-display").textContent = timer;

var quizCounter = "";

var startQuiz = function() {
    
    
    

    // set an interval for the counter
    quizCounter = setInterval(counterInterval, 1000);
    console.log(quizCounter);

    function counterInterval() {
        if (timer > 0) {
            console.log("timer");
            document.getElementById("counter-display").textContent = timer--;
        } else {
            endQuiz();
            console.log("we here now the timer is at 0")
        }
    };


    buildQuiz();


}

function stopCounter() {
    clearInterval(quizCounter);
}

// Set a button for the variable that starts the quiz
var startButtonEl = document.querySelector("#start-quiz-btn");
var saveButtonEl = document.createElement("button");
    saveButtonEl.setAttribute("class","start-quiz-btn");
    saveButtonEl.setAttribute("id","save-button");
    saveButtonEl.textContent = "Save your score!";
    console.log(saveButtonEl);

var questionWrapperEl = document.querySelector(".question-wrapper");
var userScore = [];

// Start quiz on button click:
var buildQuiz = function(){
    // hide the intro text
      // start the timer!
    
    
    quizIntroEl = document.querySelector(".quiz-intro");
    quizIntroEl.setAttribute("style", "display:none");

    quizLoop();
}

// This helper function displays the first question and then loops through based on how many questions there are. When no questions are left
// it should invoke the endQuiz() function to end the quiz and stop the interval
var quizLoop = function (interval) {
    var totalNumQuestions = allQuestions.length;
    console.log("total number of questions: " + totalNumQuestions);


    // Evaluate the number of the question that is running to decide if there's any code to cleanup, or just end the quiz
    if (quesNum === 0) {
        askQuestion(quesNum);
    } else if (quesNum === allQuestions.length) {

        console.log("Quiz is over");
        console.log("Questions answered: " + quesNum);
        // stopCounter();
        console.log("does this print anything? " + interval);
        endQuiz();
        
        
    } else {
        console.log("Ask the next question");

        // remove existing question div
        optionsListEl.remove();
        question.remove();
        askQuestion(quesNum);
    }
}

// This section builds out one question, adds its options, and then appends it to the parent. It is called from quizLoop

var askQuestion = function(num) {

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
        quizLoop();

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

    // stop the interval so we can grab the score
    stopCounter();


    // Build out the high score collection/display

    // build a div to hold the score we're collecting
    var collectScoreDiv = document.createElement("div");
    collectScoreDiv.setAttribute("class", "high-score");

    var displayScoreEl = document.createElement("p");
    displayScoreEl.setAttribute("id","user-score");
    displayScoreEl.textContent = document.getElementById("counter-display").textContent;

    var addInitialsEl = document.createElement("input");
    addInitialsEl.setAttribute("type","text");
    addInitialsEl.setAttribute("class","initials-input");
    addInitialsEl.setAttribute("id","username");

    //append the current score and the form to add initials to the collector div
    collectScoreDiv.append(addInitialsEl);
    collectScoreDiv.append(displayScoreEl);


    // congratulations blurb to display above the option to save their score, 'cause we're friendly
    var addHighScoreEl = document.createElement("p");
    addHighScoreEl.textContent = "You finished the game! Add your high score!"

    // Add the save button
    

    // append the collection elements to the div
    questionWrapperEl.append(addHighScoreEl);
    questionWrapperEl.append(collectScoreDiv);
    questionWrapperEl.append(saveButtonEl);

    // define variables to hold the score to save into an obj (to eventually store into localStorage)
   


    // TODO: Add a save button. On save, we should save the score and username into an object and display it in the browser

}


// Placeholder for save score function
var saveScore = function() {

    // Get the user name and score from the form and then save it into local storage
    var userName = document.getElementById("username").value;

    console.log(userName);
    var userScore = document.getElementById("user-score").textContent;
    console.log(userScore)

    // TODO: Check to ensure that they've submitted a user name before we save it to the object
    var userScoreObj = {
        name: userName,
        score: userScore
    }

    console.log(userScoreObj);
}

// Placeholder for loading high scores. Will be invoked after the user saves their score, and when the user clicks the "High Scores" link in the header
var loadHighScores = function() {
    alert("I'll display high scores some day");
}




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
saveButtonEl.addEventListener("click", saveScore);
