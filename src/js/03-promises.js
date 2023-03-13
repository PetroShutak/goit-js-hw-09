import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject({ position, delay });
      }, delay);
    });
  }
}

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('input[name="amount"]'),
  step: document.querySelector('input[name="step"]'),
  btn: document.querySelector('button[type="submit"]'),
};

refs.btn.addEventListener('click', onBtnClick);

function onBtnClick(event) {
  event.preventDefault();
  const amount = refs.input.value;
  const step = refs.step.value;
  const promises = [];
  let delay = 0;

  for (let i = 1; i <= amount; i += 1) {
    delay += step;
    createPromise(i, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
