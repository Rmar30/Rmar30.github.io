function Option(option, is_answer) {
  this.text = option;
  this.isAnswer = is_answer;
}

function Question(text, options) {
  this.text = text;
  this.options = options;
}

function addQuestion(questionList, question) {
  questionList.push(question);
}

function replaceQuestion(questionList, index, newQuestion) {
  questionList[index] = newQuestion;
}

function createQuestionLayout(questions, index) {
  let questionItemViewDiv = document.createElement(E_DIV);
  questionItemViewDiv.className = C_QUESTION_ITEM_VIEW;

  let questionHeader = document.createElement(E_H4);
  questionHeader.innerHTML = questions[index].text;
  questionItemViewDiv.appendChild(questionHeader);

  let buttonGroupDiv = document.createElement(E_DIV);
  buttonGroupDiv.className = C_BTN_GROUP;

  let buttonEdit = document.createElement(E_BUTTON);
  buttonEdit.type = E_ATTR_BUTTON_TYPE;
  buttonEdit.className = C_EDIT_BUTTON;
  buttonEdit.innerHTML = EDIT_BUTTON_TEXT;
  buttonEdit.value = index;
  buttonEdit.addEventListener(EVENT_CLICK, editQuestion);

  let buttonDelete = document.createElement(E_BUTTON);
  buttonDelete.type = E_BUTTON;
  buttonDelete.className = C_DELETE_BUTTON;
  buttonDelete.innerHTML = DELETE_BUTTON_TEXT;
  buttonDelete.value = index;
  buttonDelete.addEventListener(EVENT_CLICK, deleteQuestion);

  buttonGroupDiv.appendChild(buttonEdit);
  buttonGroupDiv.appendChild(buttonDelete);

  questionItemViewDiv.appendChild(buttonGroupDiv);

  return questionItemViewDiv;
}

function retrieveQuiz() {
  let questions;
  questions = retrieveQuestions();

  if (questions != []) {
    createQuizLayout(questions);
  }
}

function quizQuestionModeHandler(mode, index, questions, newQuestion) {
  if (mode == LS_MODE_EDIT) {
    replaceQuestion(questions, index, newQuestion);
    localStorage.setItem(LS_QUESTIONS, JSON.stringify(questions));
    localStorage.removeItem(LS_MODE);
    localStorage.removeItem(LS_INDEX);
  } else {
    addQuestion(questions, newQuestion);
    localStorage.setItem(LS_QUESTIONS, JSON.stringify(questions));
  }
}

function storeQuiz() {
  // Retrieve Current List of Questions
  let questions;
  questions = retrieveQuestions();

  // Create List of Options
  options = [];
  let i = 1;

  for (i; i <= 4; i++) {
    let currentOption = document.getElementById(I_OPTION + i);
    let currentAnswer = document.getElementById(I_ANSWER + i);

    if (currentOption.value != "") {
      let option = new Option(currentOption.value, currentAnswer.checked);
      options.push(option);
    }
  }

  // Generate and Add Question to Local Storage
  let currentQuestion = document.getElementById(I_QUESTION);
  if (currentQuestion.value != "" && options.length > 0) {
    let newQuestion = new Question(currentQuestion.value, options);

    // Check Mode
    let mode = localStorage.getItem(LS_MODE);
    let index = localStorage.getItem(LS_INDEX);

    quizQuestionModeHandler(mode, index, questions, newQuestion);
    location.reload();
  } else {
    currentQuestion.value = VALIDATION_QUESTION_TEXT;
  }
}

function cancelQuestion() {
  location.reload();
}

function editQuestion() {
  let questions;
  questions = retrieveQuestions();

  // Set Edit Mode for Submission
  localStorage.setItem(LS_MODE, LS_MODE_EDIT);
  localStorage.setItem(LS_INDEX, this.value);

  // Change to Modification Form
  displayModPage();

  // Fill in Question and Options
  document.getElementById(I_QUESTION).innerHTML = questions[this.value].text;

  let i = 0;
  questions[this.value].options.forEach(function(option) {
    if (option.text) {
      document.getElementById(I_OPTION + (i + 1)).value = option.text;
      if (option.isAnswer == true) {
        document
          .getElementById(I_ANSWER + (i + 1))
          .setAttribute(E_ATTR_CHECKED, true);
      }
      i++;
    }
  });
}

function deleteQuestion() {
  let questions;

  questions = retrieveQuestions();

  questions.splice(this.value, 1);
  localStorage.setItem(LS_QUESTIONS, JSON.stringify(questions));

  if (questions.length == 0) {
    localStorage.removeItem(LS_QUESTIONS);
  }

  location.reload();
}

function displayModPage() {
  questionView = document.getElementsByClassName(C_QUESTION_VIEW)[0];
  questionView.classList.add(C_HIDE);

  questionAddButton = document.getElementsByClassName(C_QUESTION_ADD_BTN)[0];
  questionAddButton.classList.add(C_HIDE);

  questionMod = document.getElementsByClassName(C_QUESTION_MOD_VIEW)[0];
  questionMod.classList.remove(C_HIDE);
}
