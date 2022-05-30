// Import questions from JSON file

// JavaScript file for interactive coding quiz

// Features:
//  - Quiz is timed
//  - High scores are saved
//  - Asnwers to questions are validated to input into high score

// initialize these so I can delete them before asking the next question
var optionsListEl = '';
var question = '';
var givefeedbackEl = document.createElement("div");

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

// Initialize empty array to store the scores in local storage
var scores = [];

// Set the initial value of the timer and display it on the page on load
var timer = 0;
document.querySelector("#counter-display").textContent = timer;

var quizCounter = "";

var startQuiz = function() {

    // set an interval for the counter
    timer = 15;
    
    
    function counterInterval() {
        if (timer >= 0) {
            
            document.getElementById("counter-display").textContent = timer--;
        } else {
            endQuiz();
        }
    };
    // calling the counterInterval function immediately so there is no delay on first pass
    counterInterval();
    quizCounter = setInterval(counterInterval, 1000);

    //start building the quiz questions
    buildQuiz();
}

function stopCounter() {
    clearInterval(quizCounter);
}

// Set a button for the variable that starts the quiz
var startButtonEl = document.querySelector("#start-quiz-btn");
// Save button 
var saveButtonEl = document.createElement("button");
    saveButtonEl.setAttribute("class","start-quiz-btn");
    saveButtonEl.setAttribute("id","save-button");
    saveButtonEl.textContent = "Save your score!";
// Retake quiz button for the high scores display
var retakeQuizBtnEl = document.createElement("button");
    retakeQuizBtnEl.setAttribute("class","start-quiz-btn");
    retakeQuizBtnEl.setAttribute("id","retake-quiz-btn");
    retakeQuizBtnEl.textContent = "Retake Quiz";

var questionWrapperEl = document.querySelector(".question-wrapper");
var userScore = [];

// Removes intro content and starts the function that loops through and displays the quiz questions
var buildQuiz = function(){

    // hide the intro text
    quizIntroEl = document.querySelector(".quiz-intro");
    quizIntroEl.setAttribute("style", "display:none");

    quizLoop();
}

// This helper function displays the first question and then loops through based on how many questions there are. When no questions are left
// it should invoke the endQuiz() function to end the quiz and stop the interval
var quizLoop = function (interval) {
    // var totalNumQuestions = allQuestions.length;


    // Evaluate the number of the question that is running to decide if there's any code to cleanup, or just end the quiz
    if (quesNum === 0) {
        askQuestion(quesNum);
    } else if (quesNum === allQuestions.length) {

        // stopCounter();
        endQuiz();
        
        
    } else {

        // remove existing question div
        optionsListEl.remove();
        question.remove();

        // ask the next question
        askQuestion(quesNum);
    }
}

// This section builds out one question, adds its options, and then appends it to the parent. It is called from quizLoop

var askQuestion = function(num) {

        question = document.createElement("h2");

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
    var ans = '';
    if (answer === allQuestions[i].answer) {

        // if the answer is correct, increment the global question number and then ask the next question
        quesNum++;
        ans = true;

    } else {
        ans = false;
        timer -= 6;   
    }

    giveFeedback(ans);
}

var giveFeedback = function(boolean) {

    givefeedbackEl.setAttribute("class", "feedback-response");
    
    var corOrWrongEl =document.createElement('p');
    var lineBreakEl = document.createElement("hr");

    if (boolean) {
        corOrWrongEl.textContent = "Correct!";

        //ask the next question
        quizLoop();

    } else {
        corOrWrongEl.textContent = "Incorrect";

    }
    givefeedbackEl.append(lineBreakEl);
    givefeedbackEl.append(corOrWrongEl);
    

    questionWrapperEl.after(givefeedbackEl);
    
}


var clearFeedback = function() {
    givefeedbackEl.remove();
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

    var scoreToDisplay = document.getElementById("counter-display").textContent;
    displayScoreEl.textContent = "Your score is: " + scoreToDisplay;

    var addInitialsEl = document.createElement("input");
    addInitialsEl.setAttribute("type","text");
    addInitialsEl.setAttribute("class","initials-input");
    addInitialsEl.setAttribute("id","username");

    //append the current score and the form to add initials to the collector div
    collectScoreDiv.append(displayScoreEl);
    collectScoreDiv.append(addInitialsEl);

    // congratulations blurb to display above the option to save their score, 'cause we're friendly
    var addHighScoreEl = document.createElement("h1");
    addHighScoreEl.textContent = "All Done!"

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
    // debugger;

    // Make sure anything stored in local storage last time is included in the array we're saving to
    scores = localStorage.getItem("score");
    scores = JSON.parse(scores);
    
    // if there is nothing in local storage, let's reset the value of scores back to an empty array

    if (scores === null) {
        scores = [];
    }

    // Get the user name and score from the form and then save it into local storage
    var userName = document.getElementById("username").value;
    var userScore = document.getElementById("counter-display").textContent;
    
    console.log(userScore);
    // Store it all in an object so we can eventually save it to localStorage
    // TODO: Check to ensure that they've submitted a user name before we save it to the object
    var userScoreObj = {
        name: userName,
        score: userScore
    }

    scores.push(userScoreObj);

    // reorder the scores in the array to be highest to lowest using bubble sort
    for(var i = 0; i < scores.length; i++){
        for(var j = 0; j < scores.length - i - 1; j++) {
            // compare using descending order and swap if the first compare is larger
            if (parseInt(scores[j+1].score) > parseInt(scores[j].score)) {
                [scores[j+1],scores[j]] = [scores[j],scores[j+1]]
            }
        }
    }
    localStorage.setItem("score",JSON.stringify(scores));

    loadHighScores();
}



// Placeholder for loading high scores. Will be invoked after the user saves their score, and when the user clicks the "High Scores" link in the header
var loadHighScores = function() {

    // stop counter from counting down if the user clicked the high scores link mid-quiz
    clearInterval(quizCounter);

    // hide/remove any items that might be present
    quizIntroEl = document.querySelector(".quiz-intro");
    quizIntroEl.setAttribute("style", "display:none");
    questionWrapperEl.remove();

    scores = localStorage.getItem("score");
    
    if (scores === null) {
        scores = [];
        
        return false;

    }

    var quizWrapperEl = document.querySelector("#quiz-wrapper");
    
    var highScoreListEl = document.createElement("ol");
    highScoreListEl.setAttribute("class","high-score");

    scores = JSON.parse(scores);
    
    for (var i=0; i < scores.length; i++) {
        
        //create list item
        var highScoreEl = document.createElement("li");

        //if i is even, apply a specific color
        if (i % 2) {
            highScoreEl.setAttribute("class","even-score-li");

        } else {
            highScoreEl.setAttribute("class","odd-score-li");

        }
        var containerDivEl = document.createElement("div");
        containerDivEl.setAttribute("class","container-score");
        
        var nameDivEl = document.createElement("div");
        nameDivEl.textContent = scores[i].score;

        var scoreDivEl = document.createElement("div");
        scoreDivEl.textContent = scores[i].name;

        // Add name and score as div within a div so we can easily use justify-content to get the right alignment
        containerDivEl.appendChild(scoreDivEl);
        containerDivEl.appendChild(nameDivEl);
        

        highScoreEl.appendChild(containerDivEl);
        highScoreListEl.appendChild(highScoreEl);

        // remove the function so it doesn't keep appending to the high scores table when we're already displaying it
        var highScoresAEl = document.querySelector("#high-scores");
        highScoresAEl.removeAttribute("onclick");

    }
    var highScoreTitleEl = document.createElement("h1");
    highScoreTitleEl.textContent = "High Scores";

    // Add a button to retake quiz



    quizWrapperEl.appendChild(highScoreTitleEl);
    quizWrapperEl.appendChild(highScoreListEl);

    quizWrapperEl.appendChild(retakeQuizBtnEl);
}

var retakeQuiz = function() {
    location.reload();
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
retakeQuizBtnEl.addEventListener("click", retakeQuiz);
questionWrapperEl.addEventListener("mouseover", clearFeedback);