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


//button scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
  const s1coords = section1.getBoundingClientRect();
  
  section1.scrollIntoView({behavior: 'smooth'})
});

//
//page navigation

// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click',function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   })
// })

// 1. add event listener to common parent element
// 2. determine what element originated the event

document.querySelector('.nav__links').addEventListener('click',function (e) {
  e.preventDefault();

  //matching strategy
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
})

//
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));
// const header = document.querySelector('.header');
// //creating and inserting elements
// // .insertAdjacentHTML
// // const header = document.head;
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = 'we use cookies for improved functionality and analitics.';
// message.innerHTML = 'we use cookies for improved functionality and analitics. <button class="btn btn--close-cookie">Got it!</button>"';

// header.append(message);

// document.querySelector('.btn--close-cookie').addEventListener('click',function(){
//   message.remove();
// })

//styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.height);

// console.log(getComputedStyle(message).color);

// message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// //attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// //non standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function(e){
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);
//   console.log(e.target.getBoundingClientRect());
//   // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);


//   //  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
  
//   // //scrolling 1.
//   // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

//   //2.
//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset, 
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   //3.
//   section1.scrollIntoView({behavior: 'smooth'})
//   // window.scrollTo(s1coords.left, s1coords.top);
// });

// const alertH1 = function(e){
//   alert('addeventlistener: great! you are reading the heading :D');

//   h1.removeEventListener('mouseenter', alertH1);
// }
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => { h1.removeEventListener('mouseenter', alertH1)
  
// }, 3000);
// h1.onmouseenter =  function(e){
//   alert('onmouseenter: great! you are reading the heading :D');
// }

// rgb(255,255,255)
// const randomInt = (min,max) => Math.floor(Math.random() * (max-min+1) + min);
// const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
// console.log(randomColor(0,255));

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
  
//   //stop propagation
//   // e.stopPropagation();
// });


// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
//   console.log('container', e.target);
// });


// document.querySelector('.nav').addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
//   console.log('nav', e.target);
// }, true);

const h1 = document.querySelector('h1');

// going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--color-primary)';

//going sideways : siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);