/* const buttonOrder = (button, wasItGues) => {

    const buttonsOrderedArray = [];
    return buttonsOrderedArray.concat([button])
}
 */
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

const showButton = buttonIndex => {
  setTimeout(() => {
    const buttonToShow = buttonsArray[buttonIndex];
    const color = getColor(buttonToShow.getAttribute("id"));
    buttonToShow.classList.remove(color + "Active");
  }, 350);
};

const tellWhichButtonToPress = () => {
  const randomButtonIdx = Math.floor(Math.random() * buttonsArray.length);
  const colorToPress = getColor(
    buttonsArray[randomButtonIdx].getAttribute("id")
  );
  soundsArray[randomButtonIdx].play();
  buttonsArray[randomButtonIdx].classList.add(colorToPress + "Active");

  showButton(randomButtonIdx);
  return randomButtonIdx;
};

const isThatTheCorrectButton = pressedButton => {
  if (pressedButton == buttonsArray[buttonToPressList[0]]) {
    checkList = checkList.concat(buttonToPressList.shift());

    if (buttonToPressList.length === 0) {
      alert("You win! Keep going");

      checkList.forEach(button => {
        showButton(button);
      });
      buttonToPressList = checkList;
      checkList = [];
      setTimeout(() => {
        buttonToPressList = buttonToPressList.concat(tellWhichButtonToPress());
      }, 900);
    }
  } else {
    alert("You lost! :(");
  }
};

// Global variables

var checkList = [];
var buttonToPressList = [];
const soundsArray = [
  new Audio("sonido1.mp3"),
  new Audio("sonido2.mp3"),
  new Audio("sonido3.mp3"),
  new Audio("sonido4.mp3"),
];
const buttonsArray = buttonsElements();

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

// To do when initializating

setTimeout(() => {
  buttonToPressList = buttonToPressList.concat(
    tellWhichButtonToPress(getColor)
  );
}, 1400);
