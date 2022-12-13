'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  //   console.log(window.scrollY); // 확인 log
  //   console.log(`navbarHeight: ${navbarHeight}`); // 확인 log
  if (window.scrollY > navbarHeight) {
    // scrollY가 navbarHeight보다 크면
    navbar.classList.add('navbar--dark'); // navbar가 어두워 지게
  } else {
    // scrollY가 navbarHeight보다 작으면
    navbar.classList.remove('navbar--dark'); // navbar--dark를 없앰
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  console.log(event.target.dataset.link);

  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
});
