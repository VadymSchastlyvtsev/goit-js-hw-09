import Notiflix from "notiflix";
import "notiflix/dist/notiflix-aio-3.2.6.min.js"

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const randomNumber = Math.random() > 0.3;
  
  setTimeout(() => {
    if (randomNumber) {
      resolve({position, delay});
    } else {
      reject({position, delay});
    }
  }, delay);
  
});
  
}

const form = document.querySelector('.form');
form.addEventListener('click', handlerForm)

function handlerForm (event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const promiseDelay = delay + i * step;

    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
