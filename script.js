'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const nav = document.querySelector('nav');
const section1 = document.querySelector('#section--1');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault();
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


btnScroll.addEventListener('click', (e) => {

  // // getBoundingClientRect() trả bề object DOMRect 
  // // cung cấp thông tin size an element so với khung hình (viewport)

  // const sectionRect = section1.getBoundingClientRect();
  // console.log(sectionRect.left, sectionRect.top);
  // console.log(e.target.getBoundingClientRect());
  // // x: phần pixel đã cuộn từ trái sang
  // // y: phần pixel đã cuộn từ trên xuống top elemet
  // console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);

  // console.log('height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // // pixel trục ngang 
  // // pixel trục dọc

  // window.scrollTo({
  //   left: sectionRect.left + window.scrollX,
  //   top: sectionRect.top + window.scrollY,
  //   behavior: 'smooth'
  // });

  section1.scrollIntoView({ behavior: 'smooth' })
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e);
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//// tabbed component
// btnContainer
const tabContainers = document.querySelector('.operations__tab-container');
// contents 
const tabContents = document.querySelectorAll('.operations__content');
// btns
const tabOperations = document.querySelectorAll('.operations__tab');

tabContainers.addEventListener('click', (e) => {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;
  // get attribute 
  const idActive = clicked.getAttribute('data-tab');
  // get dataset in html
  // data-id 
  // const id = clicked.dataset.id;

  // data-tab 
  const tabActive = clicked.dataset.tab;
  // clear active 
  tabOperations.forEach(element => element.classList.remove('operations__tab--active'));
  tabContents.forEach(element => element.classList.remove('operations__content--active'));
  // add active
  document.querySelector(`.operations__tab--${tabActive}`).classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${tabActive}`).classList.add('operations__content--active');

})


const navlinkHover = function (e) {
  // tìm btns
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // Cách 1: tìm cha
    // tìm cha 
    // const nav = link.closest('.nav');

    // Cách 2: dùng closest
    // tim siblings
    const linkSib = link.closest('.nav').querySelectorAll('.nav__link');
    // tim logo
    const logo = link.closest('.nav').querySelector('img');


    logo.style.opacity = this;
    linkSib.forEach(li => {
      if (li !== link) {
        li.style.opacity = this
      }
    });
  }
}


//// Menu fade animation
document.querySelector('.nav').addEventListener('mouseover', navlinkHover.bind(0.5));

document.querySelector('.nav').addEventListener('mouseout', navlinkHover.bind(1))
// sticky navigation
// const sectionRect = section1.getBoundingClientRect();

// // window.addEventListener('scroll', (e) => {
// //   if (window.scrollY > sectionRect.top) {
// //     nav.classList.add('sticky');
// //   } else {
// //     nav.classList.remove('sticky');
// //   }
// // })
// // /// Sticky Navigation Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);



/// Revealing section

const allSections = document.querySelectorAll('.section');

const sectionOb = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
}


const sectionsObserver = new IntersectionObserver(sectionOb, {
  root: null,
  threshold: 0.15,
});


allSections.forEach((section) => {
  section.classList.add('section--hidden');
  sectionsObserver.observe(section);
});


/// lazy load image 
// This selects all image elements which have a data-src attribute. This is a CUSTOM data attribute
const imageLazy = document.querySelectorAll('img[data-src]');
console.log(imageLazy);
const lazyLoadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  else {
    // This happens asynchronously, behind the scenes. When it's ready, the image emits a load event.
    entry.target.src = entry.target.dataset.src;
    // With this, we handle the event when the image finished loading. We then remove the blurred filter! We use a reguylar function here becuase I want to use 'this'
    entry.target.addEventListener("load", function () {
      this.classList.remove("lazy-img");
    });
  };
  observer.observe(entry.target);
}
const imageLazyObserver = new IntersectionObserver(lazyLoadImg, {
  root: null,
  threshold: 0,
  // We need to load this image BEFORE we actually reach it, so we don't create a visible lag. To acieve this, we add a 200px margin to the bottom, virtually "extending the viewport 200px down", so that it is intersected earlier. [Check if it works on network tab]
  // We want EXACTLY 200px, not some percentage, that's why we use the margin here, and NOT the treshold
  rootMargin: "0px 0px -200px 0px",
});

imageLazy.forEach(image => imageLazyObserver.observe(image));
////////////////////////////////////////





// const ramdomInt = function (min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const ramdomColor = function () {
//   return `rgb(${ramdomInt(0, 255)}, ${ramdomInt(0, 255)}, ${ramdomInt(0, 255)})`
// };

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = ramdomColor();

//   console.log("link", e.target);

// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = ramdomColor();

//   console.log("container", e.target);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = ramdomColor();

//   console.log("nav", e.target);
// });




// const h1 = document.querySelector('h1');

// console.log(h1.children);
// console.log(h1.querySelectorAll('.highlight '));
// console.log(h1.childNodes);

// console.log(h1.parentNode); // return node
// console.log(h1.parentElement); // return node

// h1.firstElementChild.style.color = 'white';
// // đi qua từ h1 đến root document và tìm .header ko có thì null
// h1.closest('.header').style.background = 'var(--gradient-secondary)'
// h1.closest('h1').style.background = 'var(--gradient-primary)'
