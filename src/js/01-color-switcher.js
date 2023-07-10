const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

function changeBackgroundColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

let validBtn;

startBtn.addEventListener('click', handlerStart);

stopBtn.addEventListener('click', handlerStop);

 function handlerStart() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    validBtn = setInterval(changeBackgroundColor, 1000);
  };

function handlerStop() {
  
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(validBtn);
  };





