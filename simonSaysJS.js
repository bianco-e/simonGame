const getColor = elementName => {
  const splited = elementName.split("");
  const upperCaseLetter = splited.find(l => {
    return l.toUpperCase() == l;
  });
  return elementName.slice(0, splited.indexOf(upperCaseLetter));
};

const buttonsElements = () => {
  const redButtonElement = document.getElementById("redButton");
  const blueButtonElement = document.getElementById("blueButton");
  const greenButtonElement = document.getElementById("greenButton");
  const blackButtonElement = document.getElementById("blackButton");

  return [
    redButtonElement,
    blueButtonElement,
    greenButtonElement,
    blackButtonElement,
  ];
};

const showButtonToPress = buttonIndex => {
    const buttonToShow = buttonsArray[buttonIndex];
    const colorToPress = getColor(buttonToShow.getAttribute("id"));

    soundsArray[buttonIndex].play();
    buttonToShow.classList.add(colorToPress + "Active");
    setTimeout(() => {
    buttonToShow.classList.remove(colorToPress + "Active");
  }, 250);
};

const generateNextButton = () => {
  const randomButtonIdx = Math.floor(Math.random() * buttonsArray.length);
  
  return randomButtonIdx;
};

const isThatTheCorrectButton = pressedButton => {
  if (pressedButton == buttonsArray[buttonToPressList[0]]) {
    checkList = checkList.concat(buttonToPressList.shift());

    if (buttonToPressList.length === 0) {
      checkList.forEach((button, i) => {
        setTimeout(() => {
          showButtonToPress(button);
        }, (i+1)*600);
      });
      buttonToPressList = checkList;
      checkList = [];
      setTimeout(() => {
        const index = generateNextButton();
        showButtonToPress(index);
        buttonToPressList = buttonToPressList.concat(index);
      }, (buttonToPressList.length+1)*600);

      counter++;
      document.getElementById("buttonsInARow").value = `Stage ${counter}`
    }
  } else {
    alert(":( You lost. Press OK to try again!");
    window.location.href = "./welcomeDom.html"
  }
};

// Global variables

var checkList = [];
var buttonToPressList = [];
const soundsArray = [
  new Audio("./sounds/sound1.mp3"),
  new Audio("./sounds/sound2.mp3"),
  new Audio("./sounds/sound3.mp3"),
  new Audio("./sounds/sound4.mp3"),
];
const buttonsArray = buttonsElements();
let counter = 1;

// To do when initializating

const directionArray = window.location.toString().split("")
const playerName = directionArray.slice(directionArray.indexOf("?")+1).join("");
document.getElementById("nameInput").value = `Welcome ${playerName}`
document.getElementById("buttonsInARow").value = `Stage ${counter}`

setTimeout(() => {
  const index = generateNextButton();
  showButtonToPress(index);
  buttonToPressList = buttonToPressList.concat(index);
}, 1500);

// To do when pressing a button

buttonsElements()
  .map((button, i) => {
    return [button, soundsArray[i]];
  })
  .forEach(buttonAndSound => {
    buttonAndSound[0].addEventListener("click", () => {
      buttonAndSound[1].play();
      isThatTheCorrectButton(buttonAndSound[0]);
    });
  });

