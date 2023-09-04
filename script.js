'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));
const header = document.querySelector('.header');
//creating and inserting elements
// .insertAdjacentHTML
// const header = document.head;
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'we use cookies for improved functionality and analitics.';
message.innerHTML = 'we use cookies for improved functionality and analitics. <button class="btn btn--close-cookie">Got it!</button>"';

header.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click',function(){
  message.remove();
})