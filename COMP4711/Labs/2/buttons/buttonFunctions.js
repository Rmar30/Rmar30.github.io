function displayButtons() {
  let i;

  // Define First Row A-M
  const alphabetLengthRow1 = 13;
  let buttonList = document.createElement("buttons");

  for (i = 0; i < alphabetLengthRow1; i++) {
    let value = String.fromCharCode(65 + i);

    // Setup Individual Button Properties (value and text)
    let button = document.createElement("BUTTON");
    button.value = value;
    let buttonText = document.createTextNode(value);
    button.appendChild(buttonText);

    // Add Event Handler to Individual Button
    button.onclick = clickHandler;
    buttonList.appendChild(button);
    document.getElementById("buttons_row1").appendChild(buttonList);
  }

  // Define Second Row N-Z
  const alphabetLengthRow2 = 26;
  let buttonList2 = document.createElement("buttons2");

  for (i = 13; i < alphabetLengthRow2; i++) {
    let value = String.fromCharCode(65 + i);

    // Setup Individual Button Properties (value and text)
    let button = document.createElement("BUTTON");
    button.value = value;
    let buttonText = document.createTextNode(value);
    button.appendChild(buttonText);

    // Add Event Handler to Individual Button
    button.onclick = clickHandler;
    buttonList2.appendChild(button);
    document.getElementById("buttons_row2").appendChild(buttonList2);
  }
}

function clickHandler() {
  alert(this.value);
}
