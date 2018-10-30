'use strict';

// ---- VARIABLE DEFINITION ----
let questionNumber = 0;
let questionTracker = 1;
let answeredCorrect = 0;
let answeredIncorrect = 0;

function resetVariableDefinition() {
  questionNumber = 0;
  questionTracker = 1;
  answeredCorrect = 0;
  answeredIncorrect = 0;
}

// REMOVES THE START PAGE AND
// START PAGE CONTENT 
function hideStartpage() {
    $('.start-page').addClass('hide');
};

function showStartPage() {
  $('.start-page').removeClass('hide');
}

// REMOVES HIDE CLASS FROM MAIN QUIZ CONTENT 
// SO THAT QUIZ FORM CAN SHOW 
function removeHideclass() {
    $('.main-container').removeClass('hide');
};

// ADDS 'HIDE' CLASS TO MAIN QUIZ CONTENT
// (TO THE .MAIN-CONTAINER CLASS)
// SO THAT QUIZ FORM IS HIDDEN
function addHideclass() {
    $('.main-container').addClass('hide');
};

// WHEN START BUTTON IS PRESSED REMOVES START PAGE
// REMOVE HIDE CLASS TO REVEAL QUIZ FORM
function handleStartButton() {
  $('.start-page').on('click', 'button', function(){
    hideStartpage();
    removeHideclass();
  });
};

// RETURNS QUESTION AND SCORE TRACKER
function trackerElements() {
  return `
  <p class="question-tracker">Question ${questionTracker} of 10</p> <p class="score-tracker">Score: ${answeredCorrect} of 10</p>`;
};

// RENDERS TRACKER ELEMENTS TO THE DOM
function renderTracker() {
$('.tracker').html(trackerElements());
};

// WILL INCREMENT QUESTION TRACKER BY 1
function increaseQuestionTracker() {
  questionTracker++;
};

// WILL INCREMENT SCORE TRACKER BY 1
// IF USER ANSWERED CORRECTLY
function increaseAnsweredCorrect() {
  answeredCorrect++;
};

// WILL INCREMENT INCORRECT TRACKER BY 1
// IF USER ANSWERED INCORRECTLY
function increaseAnsweredIncorrect() {
  answeredIncorrect++;
};

// WILL INCREMENT QUESTION TRACKER BY 1
function increaseQuestionNumber() {
questionNumber++;
};

// RETURNS THE QUIZ APP CURRENT QUESTION  
function currentQuestion() {
    return `${STORE[questionNumber].question}`;
};

// RENDERS THE QUIZ APP CURRENT QUESTION IN THE DOM
function renderQuizAppQuestion() {
    $('.current-qusetion').html(currentQuestion());
};

function possibleAnswers() {
  let answerHTML = ``;
  for(let i = 0; i < STORE[questionNumber].answer.length; ++i) {
  answerHTML += `<input type="radio" role="radio" name="answer" id="answer${i}" value="${STORE[questionNumber].answer[i]}" aria-checked="false" required><label for="answer${i}">${STORE[questionNumber].answer[i]}</label><br><br>`;
  }
  return answerHTML;
};

//RENDER THE QUIZ APP POSSIBLE ANSWERS IN THE DOM
function renderPossibleAnswers() {
  $('.possible-answers').html(possibleAnswers());
};

// LISTEN FOR CLICKS ON THE SUBMIT BUTTON
function submitQuestionHandler() {
  $(".submit-button").on('click', function(event) {
    event.preventDefault();
    disableSubmitQuestion();
    checkUserAnswer();
  });
};

function disableSubmitQuestion() {
  $('.submit-button').prop('disabled', true);
};

function enableSubmitQuestion() {
  $('.submit-button').prop('disabled', false);
};

// FUNCTION CHECKS USER ANSWER
// WILL LET USER KNOW IF ANSWER WAS RIGHT OR WRONG
function checkUserAnswer() {
  let selected = $('input:checked');
  let userAnswer = selected.val();
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  if (userAnswer === undefined) {
    window.alert("PLEASE SELECT AN ANSWER!");
    enableSubmitQuestion();
  } else if (userAnswer == correctAnswer) {
    userAnswerCorrectFeedback();
    increaseAnsweredCorrect();
  } else {
    userAnswerIncorrectFeedback();
    increaseAnsweredIncorrect();
  }
};

// RETURNS FEEDBACK FOR USER IF ANSWER WAS CORRECT
function renderFeedbackPage(){
  $('#feedbackPage').css("display", "block");
};

function userAnswerCorrectFeedback() {
  renderFeedbackPage();
  $('.userFeedback-content').html(`<p>Correct!<p>
  ${STORE[questionNumber].explanation}<br><br>
  <button role="button" class="nextQuestion">Next Question</button>`);
};

// RETURNS FEEDBACK FOR USER IF ANSWER WAS INCORRECT
function userAnswerIncorrectFeedback() {
  renderFeedbackPage();
  $('.userFeedback-content').html(`<p>Sorry that was incorrect<p>
  ${STORE[questionNumber].explanation}<br><br>
  <button role="button" class="nextQuestion">Next Question</button>`);
};

// HANDLES THE NEXT BUTTON ON THE FEEDBACK PAGE
function nextButtonHandler() {
  $('.userFeedback-content').on('click','button', function() {
    nextStep();
    enableSubmitQuestion();
  });
}

function nextStep() {
  if (questionTracker == STORE.length) {
    closeFeedbackPage();
    quizResults();
  } else {
    closeFeedbackPage();
    nextQuestion();
  };
};

function closeFeedbackPage() {
  $('#feedbackPage').css("display", "none");
};
 
// DEFINE WHAT NEEDS TO HAPPENS IN ORDER TO MOVE TO NEXT QUESTION
 function nextQuestion() {
  increaseQuestionTracker();
  increaseQuestionNumber();
  renderQuizAppQuestion();
  renderPossibleAnswers();
  renderTracker();
};

function quizResults() {
    addHideclass();
    renderQuizResults();
};

// PRINT FINAL SCORE AND OPTION TO RESTART QUIZ
function endOfQuizResults() {
  if (answeredCorrect > 6) {
    return `
    <section class="resultsContent">
      <h3>YOUR SCORE: ${answeredCorrect} CORRECT / ${answeredIncorrect} INCORRECT</h3>
      <p>If you would like to retake Quiz, 'click restart'</p>
      <div role="img" class="resultImg"><img src="url.img/h8XDfXS.jpg" alt="image of vault boy from fallout giving a thumbs up"></div>
      <button role="button" class="restart-quiz-button">Restart</button>    
    </section>
    `;
  } else {
    return `
    <section class="resultsContent">
      <h3>YOUR SCORE: ${answeredCorrect} CORRECT / ${answeredIncorrect} INCORRECT</h3>
      <p>If you would like to retake Quiz, 'click restart'</p>
      <div role="img" class="resultImg"><img src="url.img/1465601601445.png" alt="image of vault boy from fallout with hand on forehead"></div>
      <button role="button" class="restart-quiz-button">Restart</button>
    <section>
    `;
  };
};

// RENDER THE RESULTS PAGE AT THE END OF THE QUIZ
function renderQuizResults() {
    $('.resultsPage').html(endOfQuizResults());
    restartButtonHandler();
};

// HANDLES THE RESTART BUTTON AT THE END OF THE QUIZ
function restartButtonHandler(){
  $('.resultsContent').on('click', 'button', function() {
    removeRestartPage();
    showStartPage();
    resetVariableDefinition();
    renderTracker();
    renderQuizAppQuestion();
    renderPossibleAnswers();
  });
};

function removeRestartPage() {
  $('.resultsContent').remove();
}

// THIS FUNCTION WILL BE OUR CALLBACK WHEN THE PAGE LOADS
function handleQuizApp() {
    handleStartButton();
    renderQuizAppQuestion();
    renderPossibleAnswers();
    renderTracker();
    submitQuestionHandler();
    nextButtonHandler();
  };
  
// WHEN THE PAGE LOADS, CALL `HANDLEQUIZAPP`
$(handleQuizApp)