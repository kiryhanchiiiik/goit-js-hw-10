import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import resolveIcon from '../img/resolve.svg';

import errorIcon from '../img/error-icon.svg';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const radioState = document.querySelector('input[name="state"]:checked');
  const state = radioState.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.show({
        title: 'OK',
        titleColor: '#ffffff',
        message: `Fulfilled promise in ${delay}ms`,
        backgroundColor: '#59a10d',
        messageColor: '#ffffff',
        position: 'topRight',
        iconUrl: resolveIcon,
        closeOnEscape: true,
        close: false,
      });
    })
    .catch(delay => {
      iziToast.show({
        title: 'Error',
        titleColor: '#ffffff',
        message: `Rejected promise in ${delay}ms`,
        backgroundColor: '#ef4040',
        messageColor: '#ffffff',
        iconUrl: errorIcon,
        position: 'topRight',
        closeOnEscape: true,
        close: false,
      });
    });
});
