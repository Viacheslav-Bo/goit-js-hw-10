// Напиши скрипт, який після сабміту форми створює проміс.
// В середині колбека цього промісу через вказану користувачем
// кількість мілісекунд проміс має виконуватися (при fulfilled) або
// відхилятися (при rejected), залежно від обраної опції в радіокнопках.
// Значенням промісу, яке передається як аргумент у методи resolve/reject,
//  має бути значення затримки в мілісекундах.

// Створений проміс треба опрацювати у відповідних для вдалого/невдалого
// виконання методах.

// Якщо проміс виконується вдало, виводь у консоль наступний рядок,
// де delay — це значення затримки виклику промісу в мілісекундах.

// `✅ Fulfilled promise in ${delay}ms`

// `❌ Rejected promise in ${delay}ms`

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
console.log(form);

form.addEventListener('click', evt => {
  const btnSubmit = document.querySelector('button');
  //   console.log(btnSubmit);

  const promise = new Promise((resolve, reject) => {
    const delay = Number(document.querySelector('input').value);
    const isSuccess = document.querySelector('input[value="fulfilled"]');
    console.log(isSuccess);
    const radioReject = document.querySelector('input[value="rejected"]');
    console.log(radioReject);

    setTimeout(() => {
      if (isSuccess !== radioReject) {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(value => {
      console.log(value); // "Success! Value passed to resolve function"
    })
    .catch(error => {
      console.log(error); // "Error! Error passed to reject function"
    });
});
