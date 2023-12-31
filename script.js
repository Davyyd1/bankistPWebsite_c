'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
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

//tabbed component
const tabs = document.querySelectorAll('.operations__tab');
// console.log(tabs);
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //guard clause
  if(!clicked) return;

  //active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))

  //actiivate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

//menu fade animation
const handleHover = function (e) {
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    })
    logo.style.opacity = this;
  }
}

//passing 'argument' into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll',function(e){
//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky') 
//   else nav.classList.remove('sticky')
//   // console.log(window.scrollY);
// })

// sticky navigation: intersection observer API
// const obsCallBack = function(entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }
// const obsOptions = {
//   root: null,
//   threshold: [0,0.2]
// };

// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav= function(entries) {
  const [entry] = entries;
  // console.log(entry);
  if(entry.isIntersecting === false) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);


// reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  const[entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver(revealSection, {
  root:null,
  threshold: 0.15,
})
allSections.forEach(function(section){
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
})

//lazy loading images FIXME
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  //replace src with data-src in html
  entry.target.addEventListener('load', function(){
      entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img))

//slider
const slider = function() {
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach(function(_, i) {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
  })
}


const activateDot = function(slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

const goToSlide = function(slide) {
  slides.forEach((s,i) => s.style.transform = `translateX(${100 * (i-slide)}%)`)
}

// next slide
const nextSlide = function () {
  if(curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide)
  activateDot(curSlide);
}

const prevSlide = function () {
  if(curSlide === 0 ){
    curSlide = maxSlide - 1;
  } else {
    curSlide--
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}

const init = function() {
  goToSlide(0);
  createDots();
  activateDot(0);
}
init();

//event handlers
btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

document.addEventListener('keydown', function(e){
  console.log(e);
  if(e.key === 'ArrowLeft') {
    prevSlide();
  } 
  if(e.key === 'ArrowRight') {
    nextSlide();
  } 
})

dotContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains('dots__dot')) {
    // console.log('DOT');
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
})
}
slider();


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

// const h1 = document.querySelector('h1');

// // going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// //going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--color-primary)';

// //going sideways : siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML PARSED ON DOM TREE BUILD');
})

window.addEventListener('load', function(e) {
  console.log('Page fully loaded', e);
})