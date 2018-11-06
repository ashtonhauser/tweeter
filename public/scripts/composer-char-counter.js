$(document).ready(function () {
  let characters = document.getElementById('new-tweet');

  function updateCounter(event) {
    const counter = document.getElementsByClassName('counter')[0];
    const letterCount = 140;
    counter.textContent = letterCount - this.value.length;
    if (Number(counter.textContent) < 0) {
      counter.style.color = 'red';
    } else {
      counter.style.color = 'black';
    }
  }

  characters.addEventListener('keyup', updateCounter);
});
