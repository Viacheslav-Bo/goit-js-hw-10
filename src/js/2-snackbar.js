import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btnSubmit = document.querySelector('button');
const inputDelay = document.querySelector('input[type="number"]');

btnSubmit.disabled = true;

inputDelay.addEventListener('input', () => {
  const states = document.querySelector('input[name="state"]:checked');
  btnSubmit.disabled = false;
});

btnSubmit.addEventListener('click', evt => {
  evt.preventDefault();

  const promise = new Promise((resolve, reject) => {
    const delay = Number(document.querySelector('input').value);
    const state = document.querySelector('input[name="state"]:checked').value;

    setTimeout(() => {
      if (state === 'fulfilled') {
        iziToast.show({
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: 'rgb(163, 255, 194)',
        });
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        iziToast.show({
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: 'rgba(247, 164, 185, 1)',
        });
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  promise.then(console.log).catch(console.log);
});
