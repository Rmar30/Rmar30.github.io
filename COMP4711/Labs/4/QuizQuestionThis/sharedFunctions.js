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

function retrieveQuizQuestionThis() {

  questions = [];

  // QUESTION 1
  options = [];
  let option = new Option("Owner object", true);
  options.push(option);
  option = new Option("Global object", false);
  options.push(option);
  option = new Option("Undefined object", false);
  options.push(option);
  option = new Option("Recipient Element", false);
  options.push(option);

  let question = new Question("What does ‘this’ mean in the context of a <b> method </b>?", options);
  addQuestion(questions, question);


  // QUESTION 2
  options = [];
  option = new Option("Owner object", false);
  options.push(option);
  option = new Option("Global object", false);
  options.push(option);
  option = new Option("Undefined object", true);
  options.push(option);
  option = new Option("Recipient Element", false);
  options.push(option);

  question = new Question("What does ‘this’ mean in the context of a <b> function in strict mode</b>?", options);
  addQuestion(questions, question);


  // QUESTION 3
  options = [];
  option = new Option("Owner object", false);
  options.push(option);
  option = new Option("Global object", true);
  options.push(option);
  option = new Option("Undefined object", false);
  options.push(option);
  option = new Option("Recipient Element", false);
  options.push(option);

  question = new Question("What does ‘this’ mean in the context of a <b> function or alone </b>?", options);
  addQuestion(questions, question);


  // QUESTION 4
  options = [];
  option = new Option("Owner object", false);
  options.push(option);
  option = new Option("Global object", false);
  options.push(option);
  option = new Option("Undefined object", false);
  options.push(option);
  option = new Option("Recipient Element", true);
  options.push(option);

  question = new Question("What does ‘this’ mean in the context of an <b> event </b>?", options);
  addQuestion(questions, question);


  // QUESTION 5
  options = [];
  option = new Option("Owner object", false);
  options.push(option);
  option = new Option("Global object", false);
  options.push(option);
  option = new Option("Any object", true);
  options.push(option);
  option = new Option("All objects", false);
  options.push(option);

  question = new Question("What does ‘this’ mean in the context of methods like <b> call() </b> and <b> apply() </b> ?", options);
  addQuestion(questions, question);


  // QUESITON 6
  options = [];
  option = new Option("True", true);
  options.push(option);
  option = new Option("False", false);
  options.push(option);

  question = new Question("The browser and the document it displays are both objects", options);
  addQuestion(questions, question);


  // QUESTION 7
  options = [];
  option = new Option("Get all elements matching specified selector(s)", false);
  options.push(option);
  option = new Option("Get the last element matching specified selector(s)", false);
  options.push(option);
  option = new Option("Get the middle element matching specified selector(s)", false);
  options.push(option);
  option = new Option("Get the first element matching specified selector(s)", true);
  options.push(option);

  question = new Question("What does document.querySelector(“Some CSS Selector”) do?", options);
  addQuestion(questions, question);


  // QUESITON 8
  options = [];
  option = new Option("True", true);
  options.push(option);
  option = new Option("False", false);
  options.push(option);

  question = new Question("Everything that happens in the browser is registered as an event?", options);
  addQuestion(questions, question);


  // QUESTION 9
  options = [];
  option = new Option("Focus", false);
  options.push(option);
  option = new Option("Blur", false);
  options.push(option);
  option = new Option("Resets/Submit", false);
  options.push(option);
  option = new Option("Calendar Events", true);
  options.push(option);

  question = new Question("Which of the following is <b> NOT </b> a common DOM Event", options);
  addQuestion(questions, question);


  // QUESTION 10
  options = [];
  option = new Option("break", false);
  options.push(option);
  option = new Option("continue", false);
  options.push(option);
  option = new Option("foreach", true);
  options.push(option);
  option = new Option("for", false);
  options.push(option);

  question = new Question("Which of the following is not a loop keyword?", options);
  addQuestion(questions, question);

  return JSON.parse(JSON.stringify(questions))

}

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
