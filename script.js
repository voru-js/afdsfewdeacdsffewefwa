
const wrapper = document.querySelector('.slider-images'); 
const imagesSlider = wrapper.querySelectorAll('img'); 
const imageWidth = imagesSlider[0].getBoundingClientRect().width; 
const gap = 50; 
let currentIndex = 0; 


function updateSlider() {
  wrapper.style.transform = `translateX(-${currentIndex * (imageWidth + gap)}px)`; // добавляем отступ между картинками
  wrapper.style.transition = 'transform 0.5s ease-in-out'; // добавляем плавность

}
let autoSlideInterval = setInterval(() => {
  if (currentIndex >= imagesSlider.length - 4)  { //если дошли до 4 последних картинок, то начинаем сначала, иначе череез width оно уходило пока не останется 1 картинка на экране
    
    currentIndex = 0; // начинаем сначала
  } else {
    currentIndex = (currentIndex + 1) % imagesSlider.length; // идем дальше
  }
  updateSlider();
}, 3000); // интервал смены картинок в мс, можно менять на любое время


function stopAutoSlide() {
  clearInterval(autoSlideInterval); // останавливаем автопрокрутку
}


document.querySelector('.right-arrow').addEventListener('click', () => {
  stopAutoSlide(); // останавливаем автопрокрутку по нажатию на стрелку
  if (currentIndex >= imagesSlider.length - 4) {
   // ну соответственно если дошли до 4 последних картинок, то начинаем сначала
    currentIndex = 0;
  } else { 
    currentIndex = (currentIndex + 1) % imagesSlider.length; 
  }
  updateSlider(); // обновляем слайдер
});


document.querySelector('.left-arrow').addEventListener('click', () => { // почти такой же код как и выше, только в другую сторону
  stopAutoSlide(); 
  currentIndex = (currentIndex - 1 + imagesSlider.length) % imagesSlider.length; 
  updateSlider();
});

let start = 0;
let scrollLeft = 0;
wrapper.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX; // получаем координаты касания
  scrollLeft = wrapper.scrollLeft; // получаем текущее положение скролла
} );
wrapper.addEventListener('touchmove', (e) => {
  const x = e.touches[0].clientX; // получаем координаты касания
  const walk = startX - x; // определяем скорость прокрутки
  wrapper.scrollLeft = scrollLeft + walk; // прокручиваем слайдер
})
// анимация появления элементов при скролле, здесь можно добавить любой класс, только потом в html data-transition добавьте
function smoothAppearOnScroll() { // добавляем класс к элементу, который будет анимироваться
  const elements = document.querySelectorAll('.slogan, .about-us-image-container, .about-us-text-container, .maps-h, .slider-title, .slider-container, .slider-wrapper, .accordion-title, .acc-image, .expandable-list');
  const observer = new IntersectionObserver((entries) => { // создаем наблюдатель, который будет отслеживать элементы
    entries.forEach((entry) => { // для каждого элемента
      if (entry.isIntersecting) { // если элемент попал в область видимости
        const transitionValue = entry.target.getAttribute('data-transition'); // получаем значение transition из атрибута data-transition
        entry.target.style.opacity = 1; // меняем opacity на 1
        entry.target.style.transform = "translateY(0)"; // меняем трансформацию на 0
        entry.target.style.transition = transitionValue; // применяем значение transition
      } 
    });
  });

  elements.forEach((element) => { // изначальное состояние элемента
    element.style.opacity = 0; // изначальная opacity 0
    element.style.transform = "translateY(20px)"; // изначальная трансформация 20px вниз
    observer.observe(element); // начинаем наблюдение за элементом
  });
}

smoothAppearOnScroll(); // вызываем функцию

// аккордион
function toggleSection(button) { 
  const allSections = document.querySelectorAll('.section-content'); // выбираем класс всех секций
  const currentContent = button.nextElementSibling; 
  const toggleIcon = button.querySelector('.toggle-icon'); // выбираем иконку, которая будет меняться при открытии секции

  allSections.forEach(section => {
    const parent = section.parentElement; // выбираем родителя секции
    const icon = parent.querySelector('.toggle-icon'); // выбираем иконку родителя секции
    if (section !== currentContent) { // если секция не равна текущей секции, то закрываем ее
      section.style.maxHeight = "0";
      section.style.padding = "0";
      parent.classList.remove('active'); // убираем класс активной секции
      if (icon) icon.textContent = "+"; // меняем иконку обратно на плюс
    }
  });

  if (currentContent.style.maxHeight && currentContent.style.maxHeight !== "0px") { // если секция открыта, то закрываем ее
    currentContent.style.maxHeight = "0";
    currentContent.style.padding = "0";
    if (toggleIcon) toggleIcon.textContent = "+"; // меняем иконку на плюс
  } else {
    currentContent.style.maxHeight = currentContent.scrollHeight + "5px"; // добавлено 5px иначе оно все сломается нахуй, хуй знает почему - но сломается. по идее значение должно быть 0px
    currentContent.style.padding = "10px";
    if (toggleIcon) toggleIcon.textContent = "-"; // меняем иконку на минус
  }
}

// кнопка меню на мобильной версии
function toggleMenu() {
  const menuList = document.querySelector('.listheader');
  const menuListElements = document.querySelectorAll('.list-element');

  menuList.classList.toggle('active'); // добавляем класс active к меню, чтобы оно появилось

  if (menuList.classList.contains('active')) {  // если меню активно, то добавляем класс fixed к body, чтобы заблокировать прокрутку страницы
    document.body.classList.add('fixed');
    menuListElements.forEach(element => {
      element.addEventListener('click', closeMenu); // добавляем ивент листенер на каждый элемент меню, чтобы закрыть меню при клике на него
    });
  } else { // если меню не активно, то убираем класс fixed у body, чтобы разблокировать прокрутку страницы
    document.body.classList.remove('fixed');
    menuListElements.forEach(element => {
      const newElement = element.cloneNode(true);
      element.replaceWith(newElement);
    });
  }
}

function closeMenu() { // функция закрытия меню
  const menuList = document.querySelector('.listheader');
  menuList.classList.remove('active');
  document.body.classList.remove('fixed');
}

// скролл делает невидимым хедер, тут все впринцепи должно быть понятно
  const header = document.getElementById("header");
const menuList = document.querySelector('.listheader');
let lastScrollY = window.scrollY;
let opacity = 1;

function handleScroll() {
  const currentScrollY = window.scrollY;
  if (!menuList.classList.contains('active')) {
    const scrollSpeed = Math.abs(currentScrollY - lastScrollY);
    const fadeSpeed = Math.min(scrollSpeed / 50, 1) * 0.1;

    if (currentScrollY > lastScrollY) {
      opacity = Math.max(opacity - fadeSpeed, 0);
      
    } else {
      opacity = Math.min(opacity + fadeSpeed, 1);
    }

    header.style.opacity = opacity;
  } else {
    opacity = 1;
    header.style.opacity = opacity;
  }
  
  lastScrollY = currentScrollY;
  requestAnimationFrame(handleScroll);
} 
// это  функция для полноэкранных картинок, она открывает картинку в модальном окне и закрывает его по клику на картинку или на кнопку закрыть
  
requestAnimationFrame(handleScroll);
function fullImages() { 
    const firstImage = document.getElementById('#image1');
    const secondImage = document.querySelector('.full-image1');
    const imageContainer = document.querySelector('.full-image-container');
    firstImage.addEventListener('click', () => {
    imageContainer.classList.toggle('active');
    });
}
const images = document.querySelectorAll('.imagesslider');
const modal = document.getElementById('fullscreenModal');
const modalImage = modal.querySelector('.fullscreen-image');
const closeModal = modal.querySelector('.close-modal');

images.forEach(image => {
  image.addEventListener('click', () => {
    modalImage.src = image.src;
    modal.classList.remove('hidden');
  });
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
  modalImage.src = '';
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.add('hidden');
    modalImage.src = '';
  }
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
    modalImage.src = '';
  }
});
