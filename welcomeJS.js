const playButtonElement = document.getElementById("playButtonId");
const inputElement = document.getElementById("playerName")

const buttonEvent = () => {
    let playerName = inputElement.value
    window.location.href = "./simonSaysDom.html?"+playerName
}

playButtonElement.addEventListener("click", buttonEvent)
inputElement.addEventListener("keydown", event => {
    if (event.keyCode === 13) {
        buttonEvent();
    }
})
