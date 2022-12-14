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
  // console.log(event.target.dataset.link); // 확인 log
  // const scrollTo = document.querySelector(link);
  // scrollTo.scrollIntoView({ behavior: 'smooth' });
  scrollIntoView(link);
});

// Handle click on "Contact Me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  // console.log(1 - window.scrollY / homeHeight);
  // 1 - window.scrollY(0, 400, 800) / homeHeight(800) 값이 1이면 opacity 불투명, 0.5이면 반투명, 0이면 투명
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down - 오른쪽 하단의 화살표 버튼 기능
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

// Handle click on the "arrow-up" button - 하단 화살표 버튼 클릭시 상단(Home)으로 이동
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// Navbar menu 선택 시 스크롤 기능 함수
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
