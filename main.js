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

// Projects ***
// 클릭할 버튼을 감싸고 있는 카테고리 영역을 선택자로 지정
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
// 버튼을 클릭하여 필터링할 각각의 요소들을 배열로 받아옴
const projects = document.querySelectorAll('.project');
// 카테고리 영역에서 현재 클릭 이벤트가 발생한 요소에 함수를 호출
workBtnContainer.addEventListener('click', (e) => {
  // 현재 이벤트가 발생한 요소의 데이터의 필터 값을 변수에 할당 -> 필터 값이 없다면 false가 반환되므로
  // 값이 없다면 이벤트가 발생한 요소의 부모 노드의 데이터 필터 값을 변수에 할당함
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter; // data-filter값 받아오기
  if (filter == null) {
    // filter가 null이면 아무것도 받아오지 않음
    return;
  }
  // console.log(filter);

  // 프로젝트 애니메이션
  projectContainer.classList.add('anim-out');
  // Timeout이 되면 0.3초 뒤에 등록한 함수를 호출
  setTimeout(() => {
    // 배열에 저장된 필터링 될 요소들을 각각 불러옴
    projects.forEach((project) => {
      console.log(project.dataset.type);
      if (filter === '*' || filter === project.dataset.type) {
        // 필터 값이 모두 일치하면 true를 반환(필터 값이 필터링 될 요소와 데이터 타입이 자료형까지 일치하면 true를 반환)
        project.classList.remove('invisible'); // 값이 일치한 요소들은 displqy: none이 포함된 클래스를 제거하여 보이게 해줌
      } else {
        // 값이 일치하지 않는 요소들은 displqy: none이 포함된 클래스를 생성해 안보이게 해줌
        project.classList.add('invisible');
      }
    });
    // 위에서 등록한 애니메이션(anim-out)을 없애줘야 함
    projectContainer.classList.remove('anim-out');
  }, 300);
});

// Navbar menu 선택 시 스크롤 기능 함수
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
