/*
    FUNCTION TO DISPLAY QUESTIONS ON PAGE LOAD
*/
function displayQuestion() {
  let question1 = {
    question: "1) Which of the options is correct?",
    options: [
      "All names in JavaScript must use camelCase",
      "JavaScript is case-sensitive",
      "JavaScript care about white space",
      "Each line of JavaScript must end with a semicolon"
    ]
  };

  let question2 = {
    question: "2) What are the three main Javascript Loading Methods?",
    options: [
      "Right Away Loading, Asynchronous Loading, Deferred Loading",
      "Load on Demand, Synchronous Loading, Immediate Loading",
      "Deferred Loading, Synchronous Loading, Right Away Loading",
      "Immediate Loading, Asynchronous Loading, Load on Demand"
    ]
  };

  let question3 = {
    question: "3) Symbol is a Numeric Data Type in Javascript",
    options: ["True", "False"]
  };

  let question4 = {
    question: "4) What is Closure in Javascript?",
    options: [
      "The completion of a Javascript function call",
      "A function inside a function that relies on variables in the inside function to work",
      "A function inside a function that relies on variables in the outside function to work",
      "No such term exists"
    ]
  };

  let question5 = {
    question: "5) C = 3; is an example of What type of Variable?",
    options: [
      "Local Variable",
      "Constant Variable",
      "Static Variable",
      "Global Variable"
    ]
  };

  // Object Array of Questions and Answer Key
  questions = [question1, question2, question3, question4, question5];
  answerKey = [
    "JavaScript is case-sensitive",
    "Right Away Loading, Asynchronous Loading, Deferred Loading",
    "True",
    "A function inside a function that relies on variables in the outside function to work",
    "Global Variable"
  ];

  // OnPageLoad Prompt for # of Questions
  let response = promptQuestion();

  if (response >= 0 || !isNaN(response) || response <= 5) {
    let i = 0;

    // Create Question Label
    for (i; i < response; i++) {
      let question_label = document.createElement("label");
      question_label.setAttribute("for", "question" + (i + 1));
      question_label.innerHTML = questions[i].question;

      // Create List of Options for each Question
      questions[i].options.forEach(function(option) {
        let option_div = document.createElement("div");
        option_div.className = "radio";
        let option_label = document.createElement("label");
        let input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "question" + (i + 1));
        input.value = "questions[i].option1";
        let text = document.createTextNode(option);
        input.appendChild(text);

        let option_text = document.createTextNode(option);

        option_label.appendChild(input);
        option_label.appendChild(option_text);
        option_div.appendChild(option_label);
        question_label.appendChild(option_div);
      });

      document.getElementById("questions").appendChild(question_label);

      // Separate Each Question
      let br = document.createElement("br");
      document.getElementById("questions").appendChild(br);
    }
  }
}

/*
    FUNCTION TO PROMPT USER FOR # OF QUESTIONS
*/
function promptQuestion() {
  let response;

  response = prompt(
    "Enter the number of questions you'd like to answer between 0 to 5"
  );

  while (isNaN(response) || response < 0 || response > 5) {
    response = prompt(
      "Enter the number of questions you'd like to answer between 0 to 5"
    );
  }

  return response;
}
