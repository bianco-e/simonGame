const buttonOrder = (button) => {
    const buttonsOrderedArray = [];
    return buttonsOrderedArray.concat([button])
}

const getColor = (elementName) => {
    const splited = elementName.split("");
    const upperCaseLetter = splited.find(l => {
       return l.toUpperCase() == l
    })
    return elementName.slice(0, splited.indexOf(upperCaseLetter))
}

const buttonsElements = () => {
    const redButtonElement = document.getElementById("redButton");
    const blueButtonElement = document.getElementById("blueButton");
    const greenButtonElement = document.getElementById("greenButton");
    const blackButtonElement = document.getElementById("blackButton");

    return [redButtonElement, blueButtonElement, greenButtonElement, blackButtonElement]
}

const tellWhichButtonToPress = (getColor, buttonOrder, buttonsElements) => {
    const buttonsArray = buttonsElements();

    const randomButton = Math.floor(Math.random() * buttonsArray.length);
    const colorToPress = getColor(buttonsArray[randomButton].getAttribute("id"));
    soundsArray[randomButton].play();
    buttonsArray[randomButton].classList.add(colorToPress+"Active");
    

    setTimeout(() => {
        buttonsArray[randomButton].classList.remove(colorToPress+"Active");        
    }, 350);

    buttonOrder(buttonsArray[randomButton].getAttribute("id"));

    return randomButton;
}

const isThatTheCorrectButton = (buttonsElements, pressedButton) =>{
    const buttonsArray = buttonsElements();

    if (pressedButton == buttonsArray[buttonToPress]){
        alert("Well done")
    } else {
        alert("You lost! :(")
    }
}
var buttonToPress;
const soundsArray = [
    new Audio('sonido1.mp3'),
    new Audio('sonido2.mp3'),
    new Audio('sonido3.mp3'),
    new Audio('sonido4.mp3')
]


buttonsElements().map((button, i) => {
    return [button, soundsArray[i]]
}).forEach((buttonAndSound) => {
    buttonAndSound[0].addEventListener("click", () => {buttonAndSound[1].play(); isThatTheCorrectButton(buttonsElements, buttonAndSound[0])})
}) 

setTimeout(() => {
    buttonToPress = tellWhichButtonToPress(getColor, buttonOrder, buttonsElements)
}, 1400);