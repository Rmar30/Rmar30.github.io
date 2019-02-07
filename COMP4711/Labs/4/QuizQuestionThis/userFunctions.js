function createQuestionLayout(questions, index) {
  let questionItemViewDiv = document.createElement(E_DIV);
  questionItemViewDiv.className = C_QUESTION_ITEM_VIEW;

  let questionHeader = document.createElement(E_H4);
  questionHeader.innerHTML = questions[index].text;
  questionItemViewDiv.appendChild(questionHeader);

  return questionItemViewDiv;
}

function retrieveQuiz() {
  let questions;
  questions = retrieveQuizQuestionThis();

  if (questions.length != 0) {
    createQuizLayout(questions);
  } else {
    let errorText = document.createElement(E_H3);
    errorText.innerHTML = ERROR_TEXT;
    errorText.className = C_ERROR_MSG;

    questionView = document.getElementsByClassName(C_QUESTION_VIEW)[0];
    questionView.append(errorText);
    quizSubmitBtn = document.getElementsByClassName(C_QUIZ_SUB_BTN)[0];
    quizSubmitBtn.classList.add(C_HIDE);
  }
}

function checkAnswers() {
  let questions;
  let score = 0;
  questions = retrieveQuizQuestionThis();

  if (questions != []) {
    let i = 0;
    for (i; i < questions.length; i++) {
      let j = 0;
      questions[i].options.forEach(function(option) {
        // HighLight The Answer Key
        if (option.isAnswer) {
          let radioOption = document.getElementById(
            SB_Q + (i + 1) + SB_OPTION + (j + 1)
          );
          radioOption.classList.add(C_ANSWER);
        }
        j++;
      });

      let radioList = document.getElementsByName(
        E_ATTR_RADIO_INPUT_NAME + (i + 1)
      );
      for (k = 0; k < radioList.length; k++) {
        let radioOption = document.getElementById(
          SB_Q + (i + 1) + SB_OPTION + (k + 1)
        );
        let hasAnswerClass = radioOption.classList.contains(C_ANSWER);

        if (radioList[k].checked && !hasAnswerClass) {
          radioOption.classList.add(C_INCORRECT_ANSWER);
        } else if (radioList[k].checked && hasAnswerClass) {
          score++;
        } else {
          radioOption.classList.remove(C_INCORRECT_ANSWER);
        }
      }
    }
  }

  let scoreText = document.createElement(E_H3);
  scoreText.innerHTML =
    "You Scored a Total of " + score + " out of " + questions.length;
  scoreText.className = C_SCORE;
  $(".score-view").html(scoreText);
}
