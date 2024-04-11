import iziToast from "izitoast";


const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateInputs = form.querySelectorAll('input[name="state"]');
const submitButton = form.querySelector('button[type="submit"]');

function showMessage(state, delay) {
  if (state === 'fulfilled') {
    iziToast.success({
      title: 'Success',
      message: `✅ Fulfilled promise in ${delay}ms`,
      position: 'topRight',
      timeout: delay
    });
  } else if (state === 'rejected') {
    iziToast.error({
      title: 'Error',
      message: `❌ Rejected promise in ${delay}ms`,
      position: 'topRight',
      timeout: delay
    });
  }
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const delay = parseInt(delayInput.value); 
  const selectedState = Array.from(stateInputs).find(input => input.checked);
  
  if (!selectedState) {
    iziToast.error({
      title: 'Error',
      message: 'Please select a state',
      position: 'topRight'
    });
    return;
  }
  
  const state = selectedState.value;
  
  const delayPromise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => resolve(delay), delay);
    } else if (state === 'rejected') {
      setTimeout(() => reject(delay), delay);
    }
  });
    
  delayPromise
    .then(delay => showMessage(state, delay))
    .catch(delay => showMessage(state, delay));
});

