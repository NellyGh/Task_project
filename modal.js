'use strict'

// Modal

const modalTrigger = document.querySelectorAll('[data-modal]'),
modal = document.querySelector('.modal'),
modalCloseBtn = document.querySelector('[data-close]');

modalTrigger.forEach(btn => {
btn.addEventListener('click', openModal);
});

function closeModal() {
modal.classList.add('hide');
modal.classList.remove('show');
document.body.style.overflow = '';
}

function openModal() {
modal.classList.add('show');
modal.classList.remove('hide');
document.body.style.overflow = 'hidden';
clearInterval(modalTimerId);
}

modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
if (e.target === modal) {
  closeModal();
}
});

document.addEventListener('keydown', (e) => {
if (e.code === "Escape" && modal.classList.contains('show')) { 
  closeModal();
}
});

const modalTimerId = setTimeout(openModal, 5000);


// Json-server(POST)

  let nameInfo = document.querySelector(".name");
  let requestInfo = document.querySelector(".request");
  let email = document.querySelector(".email");
  let sendBtn =  document.querySelector(".form-action");

let personalInfo = {
  name: null,
  email: null,
  specialRequest:null
};

sendBtn.addEventListener("submit", event =>{
  event.preventDefault();
  personalInfo.name = nameInfo.value;
  personalInfo.email = email.value;
  personalInfo.specialRequest = requestInfo.value
  
  
  fetch('https://jsonplaceholder.typicode.com/posts', {
  method: "POST",
  body: JSON.stringify({
    personalInfo
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
   })
  .then((response) => {
      return response.json();
   })
  .then(res => {
      console.log(res);
   });

   sendBtn.reset()

});