'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  //   console.log(window.scrollY); // 확인 log
  //   console.log(`navbarHeight: ${navbarHeight}`); // 확인 log
  if (window.scrollY > navbarHeight) {
    // scrollY가 navbarHeight보다 크면
    navbar.classList.add('navbar--dark'); // navbar가 어두워 지게(navbar가 나타나게)
  } else {
    // scrollY가 navbarHeight보다 작으면
    navbar.classList.remove('navbar--dark'); // navbar가 사라짐
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

  // navbar menu를 선택하게 되면 toggle버튼 클래스를 없애 줌
  navbarMenu.classList.remove('open');

  scrollIntoView(link);
  selectNavItem(target);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
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

// Projects
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

  // Remove selection from the previous item and select the new one - 이전에 선택된 클릭 요소를 없애고 새로 클릭된 요소를 지정
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  // 클릭된 target의 nodeName이 BUTTON이면 target 그대로 사용하고 아니면(span일 경우) parentNode을 지정
  const target =
    e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');

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

//-----메뉴 선택에 따른 Navbar menu item 활성화------------------------
// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다
const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact',
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);
// console.log(sections);
// console.log(navItems);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0]; // navItems에 있는 젤 첫번째 아이템 설정
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

// Navbar menu 선택 시 스크롤 기능 함수
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
  selectNavItem(navItems[sectionIds.indexOf(selector)]); // Contact Me 버튼과 arrow-up버튼 클릭시 Navbar메뉴 아이템 선택 활성화
}

// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    // console.log(entry.target);
    // 각 메뉴에서 빠져나갈 때
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // entry.boundingClientRect.y가 - 좌표라면? => 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        // 페이지가 내려가는 경우라면(y가 +좌표라면)
        selectedNavIndex = index - 1;
      }
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
  // 스크롤이 제일 위에 있다면
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
    // 제일 위의 위치에서 현재 윈도우 창의 높이(제일 밑의 위치)를 + 했을 때,
    // document페이지에 있는 전체적인 높이와 동일하다면
  } else if (
    // 여기서, 스크롤로 페이지 제일 아래로 내렸을 경우
    // scrollY와 window창의 innerHeight 값을 더한값이 정확하게 일치 하지 않는 경우가 있음
    //ex) document.body.clientHeight은 1270 일 수 있고, scrollY와 window창의 innerHeight 더한값은 1269.2 이렇게 소수점이 나올 수 있기 때문
    // 즉, scrollY와 innerHeight 더한 값을 반올림 해주면 됨!
    Math.round(window.screenY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
