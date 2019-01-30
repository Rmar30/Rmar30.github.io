function retrieveQuestions() {
  if (localStorage.getItem(LS_QUESTIONS)) {
    return JSON.parse(localStorage.getItem(LS_QUESTIONS));
  } else {
    return [];
  }
}

function createQuizLayout(questions) {
  let i = 0;

  // Create Question Label w/ Button Controls
  for (i; i < questions.length; i++) {
    questionLayout = createQuestionLayout(questions, i);

    // Create List of Options for each Question
    let j = 0;
    questions[i].options.forEach(function(option) {
      if (option.text) {
        optionLayout = createOptionLayout(option, i, j);
        j++;

        questionLayout.appendChild(optionLayout);
        questionViewDiv = document.getElementsByClassName(C_QUESTION_VIEW)[0];
        questionViewDiv.append(questionLayout);
      }
    });
  }
}

function createOptionLayout(option, questionNumber, optionNumber) {
  let buttonRadioGroup = document.createElement(E_RADIO);
  buttonRadioGroup.className = C_RADIO;

  let radioLabel = document.createElement(E_LABEL);

  let radioInput = document.createElement(E_INPUT);
  radioInput.type = E_ATTR_RADIO_TYPE;
  radioInput.name = E_ATTR_RADIO_INPUT_NAME + (questionNumber + 1);
  radioLabel.appendChild(radioInput);

  let radioText = document.createElement(E_DIV);
  radioText.innerHTML = option.text;
  radioText.id = SB_Q + (questionNumber + 1) + SB_OPTION + (optionNumber + 1);

  radioLabel.appendChild(radioText);

  buttonRadioGroup.appendChild(radioLabel);

  return buttonRadioGroup;
}
