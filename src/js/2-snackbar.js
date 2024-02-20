import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const delayTime = form.delay.value;
    const radioBtn = form.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (radioBtn === 'fulfilled') {
                resolve(delayTime);
            } else {
                reject(delayTime);
            }
        }, delayTime);
    });

    promise.then(delay => {
        console.log(`✅ Fulfilled promise in ${delay}ms`);
        iziToast.success({
            fontSize: 'large',
            close: false,
            position: 'topRight',
            messageColor: 'white',
            timeout: 2000,
            backgroundColor: 'green',
            message: (`✅ Fulfilled promise in ${delay}ms`)
        });
    }).catch(delay => {
        console.error(`❌ Rejected promise in ${delay}ms`);
        iziToast.error({
            fontSize: 'large',
            close: false,
            position: 'topRight',
            messageColor: 'white',
            timeout: 2000,
            backgroundColor: 'red',
            message: (`❌ Rejected promise in ${delay}ms`)
        });
    });
});