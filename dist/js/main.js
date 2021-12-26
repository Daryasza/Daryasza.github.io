// ФОРМА
(function() {
//Проверка имени (нет ли цифр)
const isName = document.querySelector('#name')
isName.addEventListener('keydown', function(event) {
  let isDigit = false; 
  
  if (event.key >=0 || event.key <=9) {
    isDigit = true; 
  }
  if (isDigit == true) {
    event.preventDefault();
  }
});

//Проверка телефона (доступны только -, +, backspace, arrows и цифры)
const inputPhone = document.querySelector('#inputPhone');
inputPhone.addEventListener('keydown', function(event) {
  let isDigit = false; 
  let isDash = false;
  let isPlus = false;
  let isControl = false;

  if (event.key >=0 || event.key <=9) {
    isDigit = true; 
  }
  if (event.key == '-') {
    isDash = true;
  }
  if (event.key == '+') {
    isPlus = true;
  }
  if (event.key == 'ArrowRight' || event.key == 'ArrowLeft' || event.key == 'Backspace') {
    isControl = true;
  }

  if (!isDigit && !isControl && !isDash && !isPlus) {
    event.preventDefault();
  }
});

//Верификация формы
const form = document.querySelector('.inputs');

const validateField = (field) => {
  if (!field.value.trim().length) {
    field.classList.add('inputs__form--error');
    return false;
  } else {
    field.classList.remove('inputs__form--error');
    return true;
  }
}

const validateForm = (input) => {
  let isValid = true

  for (const key in input) {
    if (Object.hasOwnProperty.call(input, key)) {
      const element = input[key];

      const valid = validateField(element);
      if (!valid) {
        isValid = false;
      }
    }
  }
  return isValid;
}

const sectionForm = document.querySelector('.section--form');
const body = document.body; 
const successMessage = createModal('Сообщение отправлено!'); 
const failureMessage = createModal('Отправить письмо не удалось, повторите запрос позже.');

function createModal(content) {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const text = document.createElement('div');
  text.classList.add('text');

  const close = document.createElement('a');
  close.classList.add('btn');
  close.classList.add('btn--color--red');

  overlay.appendChild(modal);
  modal.appendChild(text);
  text.innerHTML = content;
  modal.appendChild(close);
  close.href = "#";
  close.innerHTML = "закрыть";
  

  close.addEventListener('click', e => {
    e.preventDefault();

    body.style.overflow="scroll";
    body.removeChild(overlay);
    });

    overlay.addEventListener('click', function(element) {
      
      if (element.target === overlay) {
        close.click();
      }
    })
  return overlay;
}

//Отправка данных на сервер
form.addEventListener('submit', e => {
  e.preventDefault();

  const input = {
    name: form.elements.name,
    phone: form.elements.phone,
    comment: form.comment,
  }

  if (validateForm(input)) {
    body.style.overflow="hidden";

    const data = {
      name: input.name.value, 
      phone: input.phone.value,
      comment: input.comment.value,
      //сервер ждет значения поля email, не предусмотренного макетом, поэтому вставляю значение вручную
      to: 'my@email.com'
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.responseType = 'json';
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(data));
    
    xhr.addEventListener('load', () => {
      if ((xhr.response.status)) {
        body.appendChild(successMessage);
        form.reset();
      } else {
        body.appendChild(failureMessage);
        
        //в случае ошибки со стороны сервера, не очищаю содержимое формы для удобства отправки повторного запроса
      }
    });
  }
});
})()
;//ПОЛНОЭКРАННОЕ МЕНЮ 
//Логика перехода от ссылки к нужной секции страницы прописана в файле one-page-scroll.js и подтянута через data-атрибуты html.
(function() {
const hamburgerFullScreenMenu = document.querySelector('#hamburger')
const xFullScreenMenu = document.querySelector('#FSmenuClose');
const FullScreenMenu = document.querySelector('#FSmenu');
const FSmenuItem = document.querySelectorAll('.menu__link');

hamburgerFullScreenMenu.addEventListener('click', function(element){
  openFullScreenMenu();
  
  xFullScreenMenu.addEventListener('click', function(element){
    element.preventDefault();

    closeFullScreenMenu();
  });
});

FSmenuItem.forEach(element => {
  element.addEventListener('click', e => {

    closeFullScreenMenu();
  })
});

const closeFullScreenMenu = () => {
  FullScreenMenu.style.display = 'none';
  document.body.style.overflow = "scroll";
}

const openFullScreenMenu = () => {
  FullScreenMenu.style.display = 'block';
  document.body.style.overflow = "hidden";
}
})();(function() {
  
let map;

function init() {

  var map = new ymaps.Map("map", {

    center: [55.74882631, 37.59754130],
    zoom: 14,
    controls: []
  });

  var coords = [
    [55.75065397, 37.60518435],
    [55.76103528, 37.57886920],
    [55.75534929, 37.61857394],
    [55.74416673, 37.58072261]
  ];

  var myCollection = new ymaps.GeoObjectCollection({}, {
    iconLayout: 'default#image',
    iconImageHref: '../img/map/marker.svg',
    iconImageSize: [43, 55],
    iconImageOffset: [-35, -52],
    draggable: false,
    autoFitToViewport: 'always'
  });

  for (var i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }
  map.geoObjects.add(myCollection);
  if (myCollection.getLength() == 1) {
    map.setCenter(
      myCollection.get(0).geometry.getCoordinates()
    )
  } else if (myCollection.getLength() > 1) {
    map.setBounds(myCollection.getBounds());
  }

  map.behaviors.disable('scrollZoom');

  if (new MobileDetect(window.navigator.userAgent).mobile()) {
    map.behaviors.disable('drag');
  }
    
};

ymaps.ready(init);

})();(function() {

const menuBtn = $('.sct-menu__block');

$(document).ready(() => {
  
  for (let i = 0; i < menuBtn.length; i++) {
    const element = menuBtn[i];

    element.addEventListener('click', e => {
      e.preventDefault();

      for (let index = 0; index < menuBtn.length; index++) {
        const element = menuBtn[index];

        if (element !== e.currentTarget) {
          element.closest('.sct-menu__item').classList.remove('sct-menu__item--active');
        }
      }
      element.closest('.sct-menu__item').classList.toggle('sct-menu__item--active');
    })
  }
})
})()
;(function() {

const section = $('.section');
const maincontent = $('.maincontent');
const sideBar = $('.sidebar');
const sideBarItem = sideBar.find('.sidebar__item');

section.first().addClass('active');
let inMove = false;

const scrollFunc = (sectionNumber) => {
  const newPosition = countSectionPosition(sectionNumber);
  const sectionTransitionTime = 700;
  const mouseInertiaTime = 300;

  if (inMove) return;
  inMove = true;

  maincontent.css({ 
    transform: `translateY(${newPosition}%)`
  });
  resetActiveClassForItem(section, sectionNumber, 'active');
  changeSidebarColor(sectionNumber);

  setTimeout(() => {
    inMove = false
    resetActiveClassForItem(sideBarItem,sectionNumber, 'sidebar__item--active');

  }, sectionTransitionTime + mouseInertiaTime);    
}

const countSectionPosition = (sectionNumber) => {

  sectionPosition = sectionNumber * -100;

  if (isNaN(sectionPosition)) {
    console.error('передано не верное значение в countSectionPosition');
    return 0;
  }

  return sectionPosition;
}

const resetActiveClassForItem = (item, itemEq, activeClass) => {
  item.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const changeSidebarColor = (sectionNumber) => {
  const currentSection = section.eq(sectionNumber);
  const sideBarColor = currentSection.attr('data-sidebar-color');

  if (sideBarColor === 'grey') {

    sideBar.addClass('sidebar--color--grey')
  } else {

    sideBar.removeClass('sidebar--color--grey')
  }
}

const newPositionDetector = () => {
  const activeSection = section.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        scrollFunc(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length) {
        scrollFunc(prevSection.index());
      }
    }
  }
}

$(window).on('wheel', (e) => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = newPositionDetector();
  
  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
})

$(window).on('keydown', (e) => {

  const tagName = e.target.tagName.toLowerCase();
  const userTypinginInputs = tagName == "input" || tagName == "textarea";
  const scroller = newPositionDetector();

  if (userTypinginInputs) return;

  switch (e.keyCode) {
    case 40:
      scroller.next();
      break;

    case 38:
      scroller.prev();
      break;
  }
})

$('[data-scroll-to]').click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const targetSection = $(`[data-section-id=${target}]`);

  scrollFunc(targetSection.index());
})


//https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
const mobileDet = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDet.mobile();

if (isMobile) {
  //http://hgoebl.github.io/mobile-detect.js/
  
  $('.wrapper').on('touchmove', e => e.preventDefault());

  $("body").swipe( {
    
    swipe:function(event, direction) {
      const scroller = newPositionDetector();

      let scrollDirection; 

      if (direction === 'up') {
        scrollDirection = 'next';
      }

      if (direction === 'down') {
        scrollDirection = 'prev';
      }
      scroller[scrollDirection]();
    }
  });
}
})()







;(function() {

const findBlock = (target) => {
   return $('.review').filter((ndx, item) => {
    return $(item).attr('data-slide') === target;
  });
};

$('.interactive-avatar__link').click(e => {
  e.preventDefault();

  const currentLink = $(e.currentTarget);
  const targetReview = currentLink.attr('data-link');
  const slidetoShow = findBlock(targetReview);
  const currentAvatar = currentLink.closest('.interactive-avatar');

  slidetoShow.addClass('review--active').siblings().removeClass('review--active');
  currentAvatar.addClass('interactive-avatar--active').siblings().removeClass('interactive-avatar--active');
})
})()




;// СЛАЙДЕР 
(function() {

const slider = document.querySelector('.slider__list');
const sliderBtn = document.querySelectorAll('.arrow');
const sliderItems = document.querySelectorAll('.slider__item');

const sliderSwipe = (direction) => {
  const sliderWidth = slider.offsetWidth;

  let i = 0;

  for (let index = 0; index < sliderItems.length; index++) {
    const element = sliderItems[index];

    if (element.classList.contains('slider__item--active')) {
      i = index;
    }
    
    element.classList.remove('slider__item--active');
  }

  const itemsCounter = sliderItems.length;

  if (direction === 'left') {
    i-=1;

    if (i<0) {
      i = itemsCounter - 1;
    }

  } else {
   i+=1;

   if (i > itemsCounter - 1) {
    i = 0;
    }
  }

  slider.style.left = `-${sliderWidth * i}px`;
  sliderItems[i].classList.add('slider__item--active'); 
}

for (let i = 0; i < sliderBtn.length; i++) {
  const element = sliderBtn[i];

  element.addEventListener('click', function(e) {
    e.preventDefault();

    if (this.classList.contains('arrow--left')) {
      sliderSwipe('left')
    } else {
      sliderSwipe('right')
    }
  });
}

$('.slider__btn').click(e => e.preventDefault())

})()
;//КОМАНДА (выпадающий текст - десктоп)

(function() {

$(document).ready(() => {
  const teamBtn = $('.team__name');

  for (let i = 0; i < teamBtn.length; i++) {
    const element = teamBtn[i];

    element.addEventListener('click', e => {
      e.preventDefault();

        for (let index= 0; index < teamBtn.length; index++) {
          const element = teamBtn[index];
          
          if (element !== e.currentTarget) {
            element.closest('.team__item').classList.remove('team__item--active');
          }
        }
      element.closest('.team__item').classList.toggle('team__item--active');
    })
  }
})
})()

;(function() {

let intervalId;
let soundControl;
let durationControl;

const video = document.getElementById('video');
const playBtn = document.querySelector('.video__play-btn');
const playBtnB = document.querySelector('.video__btn-playB');
const soundBtn = document.querySelector('.video__sound-btn');

//play/pause события (для мобильных плееров)
video.addEventListener('pause', invertVideoBtns);
video.addEventListener('play', invertVideoBtns);

//нажатие на ключевые точки видео
video.addEventListener('click', playStop);
playBtnB.addEventListener('click', playStop);
playBtn.addEventListener('click', playStop);

//изменение ползунка проигрывания видео
durationControl = document.getElementById('durationLevel');
durationControl.addEventListener('input', setVideoDuration);

durationControl.min = 0;
video.onloadedmetadata = function() {
  durationControl.max = video.duration * 1000;
}
durationControl.value = 0;

//нажатие кнопки вкл/выкл звука
let micControl = document.getElementById("soundOff/On");
micControl.addEventListener('click', soundOff);

//изменение ползунка звука
soundControl = document.getElementById('sound-level');
soundControl.addEventListener('input', changeSoundVolume);
soundControl.min = 0;
soundControl.max = 10;

//значения звука по умолчанию
soundControl.value = soundControl.max;
let step = soundControl.max / 1000;
let percent = video.volume / step;
soundControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${percent}%, #868686 ${percent}%)`;

//окончание видео
video.addEventListener('ended', endOfVideo);



function playStop() {

  if (video.paused) {
    video.play();
    intervalId = setInterval(updateDuration, 10);

  } else {
    video.pause();
    clearInterval(intervalId)
  }
}

function invertVideoBtns() {
  playBtnB.classList.toggle("video__btn-playB--active");
  playBtn.classList.toggle('video__play-btn--active');
}

function setVideoDuration() {
  video.currentTime = durationControl.value / 1000;
  updateDuration();
}

function updateDuration() {
  durationControl.value = video.currentTime * 1000;

  let step = video.duration / 100;
  let percent = video.currentTime / step;
  durationControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${percent}%, #868686 ${percent}%)`;
}


function soundOff() {

  if (video.volume === 0) {
    video.volume = soundLevel;
    soundControl.value = soundLevel * 10;
    soundBtn.classList.remove('video__sound-btn--active');

    let step = soundControl.max / 1000;
    let percent = video.volume / step;
    soundControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${percent}%, #868686 ${percent}%)`;

  } else {
    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
    soundBtn.classList.add('video__sound-btn--active');
    soundControl.style.background = `#868686`;
  }
}

function changeSoundVolume() {
  video.volume = soundControl.value / 10;
  let step = soundControl.max / 1000;
  let percent = video.volume / step;
  soundControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${percent}%, #868686 ${percent}%)`;

  if (video.volume == 0) {
    soundBtn.classList.add('video__sound-btn--active');
  } else {
    soundBtn.classList.remove('video__sound-btn--active');
    let step = soundControl.max / 1000;
    let percent = video.volume / step;
    soundControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${percent}%, #868686 ${percent}%)`;
  }
}

function endOfVideo() {
  video.currentTime = 0;
  durationControl.value = 0;
  durationControl.style.background = `#868686`;
  
  playBtnB.classList.remove('video__btn-playB--active');
  playBtn.classList.remove('video__play-btn--active');
  video.load();
}

})()
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0uanMiLCJmcy1tZW51LmpzIiwibWFwLmpzIiwibWVudS5qcyIsIm9uZS1wYWdlLXNjcm9sbC5qcyIsInJldmlld3MuanMiLCJzbGlkZXIuanMiLCJ0ZWFtLmpzIiwidmlkZW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0N6SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDN0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vINCk0J7QoNCc0JBcbihmdW5jdGlvbigpIHtcbi8v0J/RgNC+0LLQtdGA0LrQsCDQuNC80LXQvdC4ICjQvdC10YIg0LvQuCDRhtC40YTRgClcbmNvbnN0IGlzTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuYW1lJylcbmlzTmFtZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGlzRGlnaXQgPSBmYWxzZTsgXG4gIFxuICBpZiAoZXZlbnQua2V5ID49MCB8fCBldmVudC5rZXkgPD05KSB7XG4gICAgaXNEaWdpdCA9IHRydWU7IFxuICB9XG4gIGlmIChpc0RpZ2l0ID09IHRydWUpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59KTtcblxuLy/Qn9GA0L7QstC10YDQutCwINGC0LXQu9C10YTQvtC90LAgKNC00L7RgdGC0YPQv9C90Ysg0YLQvtC70YzQutC+IC0sICssIGJhY2tzcGFjZSwgYXJyb3dzINC4INGG0LjRhNGA0YspXG5jb25zdCBpbnB1dFBob25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lucHV0UGhvbmUnKTtcbmlucHV0UGhvbmUuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBpc0RpZ2l0ID0gZmFsc2U7IFxuICBsZXQgaXNEYXNoID0gZmFsc2U7XG4gIGxldCBpc1BsdXMgPSBmYWxzZTtcbiAgbGV0IGlzQ29udHJvbCA9IGZhbHNlO1xuXG4gIGlmIChldmVudC5rZXkgPj0wIHx8IGV2ZW50LmtleSA8PTkpIHtcbiAgICBpc0RpZ2l0ID0gdHJ1ZTsgXG4gIH1cbiAgaWYgKGV2ZW50LmtleSA9PSAnLScpIHtcbiAgICBpc0Rhc2ggPSB0cnVlO1xuICB9XG4gIGlmIChldmVudC5rZXkgPT0gJysnKSB7XG4gICAgaXNQbHVzID0gdHJ1ZTtcbiAgfVxuICBpZiAoZXZlbnQua2V5ID09ICdBcnJvd1JpZ2h0JyB8fCBldmVudC5rZXkgPT0gJ0Fycm93TGVmdCcgfHwgZXZlbnQua2V5ID09ICdCYWNrc3BhY2UnKSB7XG4gICAgaXNDb250cm9sID0gdHJ1ZTtcbiAgfVxuXG4gIGlmICghaXNEaWdpdCAmJiAhaXNDb250cm9sICYmICFpc0Rhc2ggJiYgIWlzUGx1cykge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn0pO1xuXG4vL9CS0LXRgNC40YTQuNC60LDRhtC40Y8g0YTQvtGA0LzRi1xuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dHMnKTtcblxuY29uc3QgdmFsaWRhdGVGaWVsZCA9IChmaWVsZCkgPT4ge1xuICBpZiAoIWZpZWxkLnZhbHVlLnRyaW0oKS5sZW5ndGgpIHtcbiAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdpbnB1dHNfX2Zvcm0tLWVycm9yJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIGZpZWxkLmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0c19fZm9ybS0tZXJyb3InKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5jb25zdCB2YWxpZGF0ZUZvcm0gPSAoaW5wdXQpID0+IHtcbiAgbGV0IGlzVmFsaWQgPSB0cnVlXG5cbiAgZm9yIChjb25zdCBrZXkgaW4gaW5wdXQpIHtcbiAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwoaW5wdXQsIGtleSkpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBpbnB1dFtrZXldO1xuXG4gICAgICBjb25zdCB2YWxpZCA9IHZhbGlkYXRlRmllbGQoZWxlbWVudCk7XG4gICAgICBpZiAoIXZhbGlkKSB7XG4gICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGlzVmFsaWQ7XG59XG5cbmNvbnN0IHNlY3Rpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tLWZvcm0nKTtcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5OyBcbmNvbnN0IHN1Y2Nlc3NNZXNzYWdlID0gY3JlYXRlTW9kYWwoJ9Ch0L7QvtCx0YnQtdC90LjQtSDQvtGC0L/RgNCw0LLQu9C10L3QviEnKTsgXG5jb25zdCBmYWlsdXJlTWVzc2FnZSA9IGNyZWF0ZU1vZGFsKCfQntGC0L/RgNCw0LLQuNGC0Ywg0L/QuNGB0YzQvNC+INC90LUg0YPQtNCw0LvQvtGB0YwsINC/0L7QstGC0L7RgNC40YLQtSDQt9Cw0L/RgNC+0YEg0L/QvtC30LbQtS4nKTtcblxuZnVuY3Rpb24gY3JlYXRlTW9kYWwoY29udGVudCkge1xuICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheScpO1xuXG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsJyk7XG5cbiAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0ZXh0LmNsYXNzTGlzdC5hZGQoJ3RleHQnKTtcblxuICBjb25zdCBjbG9zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgY2xvc2UuY2xhc3NMaXN0LmFkZCgnYnRuJyk7XG4gIGNsb3NlLmNsYXNzTGlzdC5hZGQoJ2J0bi0tY29sb3ItLXJlZCcpO1xuXG4gIG92ZXJsYXkuYXBwZW5kQ2hpbGQobW9kYWwpO1xuICBtb2RhbC5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgdGV4dC5pbm5lckhUTUwgPSBjb250ZW50O1xuICBtb2RhbC5hcHBlbmRDaGlsZChjbG9zZSk7XG4gIGNsb3NlLmhyZWYgPSBcIiNcIjtcbiAgY2xvc2UuaW5uZXJIVE1MID0gXCLQt9Cw0LrRgNGL0YLRjFwiO1xuICBcblxuICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGJvZHkuc3R5bGUub3ZlcmZsb3c9XCJzY3JvbGxcIjtcbiAgICBib2R5LnJlbW92ZUNoaWxkKG92ZXJsYXkpO1xuICAgIH0pO1xuXG4gICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIFxuICAgICAgaWYgKGVsZW1lbnQudGFyZ2V0ID09PSBvdmVybGF5KSB7XG4gICAgICAgIGNsb3NlLmNsaWNrKCk7XG4gICAgICB9XG4gICAgfSlcbiAgcmV0dXJuIG92ZXJsYXk7XG59XG5cbi8v0J7RgtC/0YDQsNCy0LrQsCDQtNCw0L3QvdGL0YUg0L3QsCDRgdC10YDQstC10YBcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBjb25zdCBpbnB1dCA9IHtcbiAgICBuYW1lOiBmb3JtLmVsZW1lbnRzLm5hbWUsXG4gICAgcGhvbmU6IGZvcm0uZWxlbWVudHMucGhvbmUsXG4gICAgY29tbWVudDogZm9ybS5jb21tZW50LFxuICB9XG5cbiAgaWYgKHZhbGlkYXRlRm9ybShpbnB1dCkpIHtcbiAgICBib2R5LnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCI7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbmFtZTogaW5wdXQubmFtZS52YWx1ZSwgXG4gICAgICBwaG9uZTogaW5wdXQucGhvbmUudmFsdWUsXG4gICAgICBjb21tZW50OiBpbnB1dC5jb21tZW50LnZhbHVlLFxuICAgICAgLy/RgdC10YDQstC10YAg0LbQtNC10YIg0LfQvdCw0YfQtdC90LjRjyDQv9C+0LvRjyBlbWFpbCwg0L3QtSDQv9GA0LXQtNGD0YHQvNC+0YLRgNC10L3QvdC+0LPQviDQvNCw0LrQtdGC0L7QvCwg0L/QvtGN0YLQvtC80YMg0LLRgdGC0LDQstC70Y/RjiDQt9C90LDRh9C10L3QuNC1INCy0YDRg9GH0L3Rg9GOXG4gICAgICB0bzogJ215QGVtYWlsLmNvbSdcbiAgICB9XG5cbiAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHIub3BlbignUE9TVCcsICdodHRwczovL3dlYmRldi1hcGkubG9mdHNjaG9vbC5jb20vc2VuZG1haWwnKTtcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICBcbiAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgIGlmICgoeGhyLnJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChzdWNjZXNzTWVzc2FnZSk7XG4gICAgICAgIGZvcm0ucmVzZXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoZmFpbHVyZU1lc3NhZ2UpO1xuICAgICAgICBcbiAgICAgICAgLy/QsiDRgdC70YPRh9Cw0LUg0L7RiNC40LHQutC4INGB0L4g0YHRgtC+0YDQvtC90Ysg0YHQtdGA0LLQtdGA0LAsINC90LUg0L7Rh9C40YnQsNGOINGB0L7QtNC10YDQttC40LzQvtC1INGE0L7RgNC80Ysg0LTQu9GPINGD0LTQvtCx0YHRgtCy0LAg0L7RgtC/0YDQsNCy0LrQuCDQv9C+0LLRgtC+0YDQvdC+0LPQviDQt9Cw0L/RgNC+0YHQsFxuICAgICAgfVxuICAgIH0pO1xuICB9XG59KTtcbn0pKClcbiIsIi8v0J/QntCb0J3QntCt0JrQoNCQ0J3QndCe0JUg0JzQldCd0K4gXG4vL9Cb0L7Qs9C40LrQsCDQv9C10YDQtdGF0L7QtNCwINC+0YIg0YHRgdGL0LvQutC4INC6INC90YPQttC90L7QuSDRgdC10LrRhtC40Lgg0YHRgtGA0LDQvdC40YbRiyDQv9GA0L7Qv9C40YHQsNC90LAg0LIg0YTQsNC50LvQtSBvbmUtcGFnZS1zY3JvbGwuanMg0Lgg0L/QvtC00YLRj9C90YPRgtCwINGH0LXRgNC10LcgZGF0YS3QsNGC0YDQuNCx0YPRgtGLIGh0bWwuXG4oZnVuY3Rpb24oKSB7XG5jb25zdCBoYW1idXJnZXJGdWxsU2NyZWVuTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoYW1idXJnZXInKVxuY29uc3QgeEZ1bGxTY3JlZW5NZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI0ZTbWVudUNsb3NlJyk7XG5jb25zdCBGdWxsU2NyZWVuTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNGU21lbnUnKTtcbmNvbnN0IEZTbWVudUl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9fbGluaycpO1xuXG5oYW1idXJnZXJGdWxsU2NyZWVuTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGVsZW1lbnQpe1xuICBvcGVuRnVsbFNjcmVlbk1lbnUoKTtcbiAgXG4gIHhGdWxsU2NyZWVuTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgIGVsZW1lbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNsb3NlRnVsbFNjcmVlbk1lbnUoKTtcbiAgfSk7XG59KTtcblxuRlNtZW51SXRlbS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG5cbiAgICBjbG9zZUZ1bGxTY3JlZW5NZW51KCk7XG4gIH0pXG59KTtcblxuY29uc3QgY2xvc2VGdWxsU2NyZWVuTWVudSA9ICgpID0+IHtcbiAgRnVsbFNjcmVlbk1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwic2Nyb2xsXCI7XG59XG5cbmNvbnN0IG9wZW5GdWxsU2NyZWVuTWVudSA9ICgpID0+IHtcbiAgRnVsbFNjcmVlbk1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xufVxufSkoKSIsIihmdW5jdGlvbigpIHtcbiAgXG5sZXQgbWFwO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuXG4gIHZhciBtYXAgPSBuZXcgeW1hcHMuTWFwKFwibWFwXCIsIHtcblxuICAgIGNlbnRlcjogWzU1Ljc0ODgyNjMxLCAzNy41OTc1NDEzMF0sXG4gICAgem9vbTogMTQsXG4gICAgY29udHJvbHM6IFtdXG4gIH0pO1xuXG4gIHZhciBjb29yZHMgPSBbXG4gICAgWzU1Ljc1MDY1Mzk3LCAzNy42MDUxODQzNV0sXG4gICAgWzU1Ljc2MTAzNTI4LCAzNy41Nzg4NjkyMF0sXG4gICAgWzU1Ljc1NTM0OTI5LCAzNy42MTg1NzM5NF0sXG4gICAgWzU1Ljc0NDE2NjczLCAzNy41ODA3MjI2MV1cbiAgXTtcblxuICB2YXIgbXlDb2xsZWN0aW9uID0gbmV3IHltYXBzLkdlb09iamVjdENvbGxlY3Rpb24oe30sIHtcbiAgICBpY29uTGF5b3V0OiAnZGVmYXVsdCNpbWFnZScsXG4gICAgaWNvbkltYWdlSHJlZjogJy4uL2ltZy9tYXAvbWFya2VyLnN2ZycsXG4gICAgaWNvbkltYWdlU2l6ZTogWzQzLCA1NV0sXG4gICAgaWNvbkltYWdlT2Zmc2V0OiBbLTM1LCAtNTJdLFxuICAgIGRyYWdnYWJsZTogZmFsc2UsXG4gICAgYXV0b0ZpdFRvVmlld3BvcnQ6ICdhbHdheXMnXG4gIH0pO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgbXlDb2xsZWN0aW9uLmFkZChuZXcgeW1hcHMuUGxhY2VtYXJrKGNvb3Jkc1tpXSkpO1xuICB9XG4gIG1hcC5nZW9PYmplY3RzLmFkZChteUNvbGxlY3Rpb24pO1xuICBpZiAobXlDb2xsZWN0aW9uLmdldExlbmd0aCgpID09IDEpIHtcbiAgICBtYXAuc2V0Q2VudGVyKFxuICAgICAgbXlDb2xsZWN0aW9uLmdldCgwKS5nZW9tZXRyeS5nZXRDb29yZGluYXRlcygpXG4gICAgKVxuICB9IGVsc2UgaWYgKG15Q29sbGVjdGlvbi5nZXRMZW5ndGgoKSA+IDEpIHtcbiAgICBtYXAuc2V0Qm91bmRzKG15Q29sbGVjdGlvbi5nZXRCb3VuZHMoKSk7XG4gIH1cblxuICBtYXAuYmVoYXZpb3JzLmRpc2FibGUoJ3Njcm9sbFpvb20nKTtcblxuICBpZiAobmV3IE1vYmlsZURldGVjdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkubW9iaWxlKCkpIHtcbiAgICBtYXAuYmVoYXZpb3JzLmRpc2FibGUoJ2RyYWcnKTtcbiAgfVxuICAgIFxufTtcblxueW1hcHMucmVhZHkoaW5pdCk7XG5cbn0pKCkiLCIoZnVuY3Rpb24oKSB7XG5cbmNvbnN0IG1lbnVCdG4gPSAkKCcuc2N0LW1lbnVfX2Jsb2NrJyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcbiAgXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWVudUJ0bi5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBtZW51QnRuW2ldO1xuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbWVudUJ0bi5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IG1lbnVCdG5baW5kZXhdO1xuXG4gICAgICAgIGlmIChlbGVtZW50ICE9PSBlLmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgICBlbGVtZW50LmNsb3Nlc3QoJy5zY3QtbWVudV9faXRlbScpLmNsYXNzTGlzdC5yZW1vdmUoJ3NjdC1tZW51X19pdGVtLS1hY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxlbWVudC5jbG9zZXN0KCcuc2N0LW1lbnVfX2l0ZW0nKS5jbGFzc0xpc3QudG9nZ2xlKCdzY3QtbWVudV9faXRlbS0tYWN0aXZlJyk7XG4gICAgfSlcbiAgfVxufSlcbn0pKClcbiIsIihmdW5jdGlvbigpIHtcblxuY29uc3Qgc2VjdGlvbiA9ICQoJy5zZWN0aW9uJyk7XG5jb25zdCBtYWluY29udGVudCA9ICQoJy5tYWluY29udGVudCcpO1xuY29uc3Qgc2lkZUJhciA9ICQoJy5zaWRlYmFyJyk7XG5jb25zdCBzaWRlQmFySXRlbSA9IHNpZGVCYXIuZmluZCgnLnNpZGViYXJfX2l0ZW0nKTtcblxuc2VjdGlvbi5maXJzdCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcbmxldCBpbk1vdmUgPSBmYWxzZTtcblxuY29uc3Qgc2Nyb2xsRnVuYyA9IChzZWN0aW9uTnVtYmVyKSA9PiB7XG4gIGNvbnN0IG5ld1Bvc2l0aW9uID0gY291bnRTZWN0aW9uUG9zaXRpb24oc2VjdGlvbk51bWJlcik7XG4gIGNvbnN0IHNlY3Rpb25UcmFuc2l0aW9uVGltZSA9IDcwMDtcbiAgY29uc3QgbW91c2VJbmVydGlhVGltZSA9IDMwMDtcblxuICBpZiAoaW5Nb3ZlKSByZXR1cm47XG4gIGluTW92ZSA9IHRydWU7XG5cbiAgbWFpbmNvbnRlbnQuY3NzKHsgXG4gICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgke25ld1Bvc2l0aW9ufSUpYFxuICB9KTtcbiAgcmVzZXRBY3RpdmVDbGFzc0Zvckl0ZW0oc2VjdGlvbiwgc2VjdGlvbk51bWJlciwgJ2FjdGl2ZScpO1xuICBjaGFuZ2VTaWRlYmFyQ29sb3Ioc2VjdGlvbk51bWJlcik7XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaW5Nb3ZlID0gZmFsc2VcbiAgICByZXNldEFjdGl2ZUNsYXNzRm9ySXRlbShzaWRlQmFySXRlbSxzZWN0aW9uTnVtYmVyLCAnc2lkZWJhcl9faXRlbS0tYWN0aXZlJyk7XG5cbiAgfSwgc2VjdGlvblRyYW5zaXRpb25UaW1lICsgbW91c2VJbmVydGlhVGltZSk7ICAgIFxufVxuXG5jb25zdCBjb3VudFNlY3Rpb25Qb3NpdGlvbiA9IChzZWN0aW9uTnVtYmVyKSA9PiB7XG5cbiAgc2VjdGlvblBvc2l0aW9uID0gc2VjdGlvbk51bWJlciAqIC0xMDA7XG5cbiAgaWYgKGlzTmFOKHNlY3Rpb25Qb3NpdGlvbikpIHtcbiAgICBjb25zb2xlLmVycm9yKCfQv9C10YDQtdC00LDQvdC+INC90LUg0LLQtdGA0L3QvtC1INC30L3QsNGH0LXQvdC40LUg0LIgY291bnRTZWN0aW9uUG9zaXRpb24nKTtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiBzZWN0aW9uUG9zaXRpb247XG59XG5cbmNvbnN0IHJlc2V0QWN0aXZlQ2xhc3NGb3JJdGVtID0gKGl0ZW0sIGl0ZW1FcSwgYWN0aXZlQ2xhc3MpID0+IHtcbiAgaXRlbS5lcShpdGVtRXEpLmFkZENsYXNzKGFjdGl2ZUNsYXNzKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKTtcbn1cblxuY29uc3QgY2hhbmdlU2lkZWJhckNvbG9yID0gKHNlY3Rpb25OdW1iZXIpID0+IHtcbiAgY29uc3QgY3VycmVudFNlY3Rpb24gPSBzZWN0aW9uLmVxKHNlY3Rpb25OdW1iZXIpO1xuICBjb25zdCBzaWRlQmFyQ29sb3IgPSBjdXJyZW50U2VjdGlvbi5hdHRyKCdkYXRhLXNpZGViYXItY29sb3InKTtcblxuICBpZiAoc2lkZUJhckNvbG9yID09PSAnZ3JleScpIHtcblxuICAgIHNpZGVCYXIuYWRkQ2xhc3MoJ3NpZGViYXItLWNvbG9yLS1ncmV5JylcbiAgfSBlbHNlIHtcblxuICAgIHNpZGVCYXIucmVtb3ZlQ2xhc3MoJ3NpZGViYXItLWNvbG9yLS1ncmV5JylcbiAgfVxufVxuXG5jb25zdCBuZXdQb3NpdGlvbkRldGVjdG9yID0gKCkgPT4ge1xuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gc2VjdGlvbi5maWx0ZXIoJy5hY3RpdmUnKTtcbiAgY29uc3QgbmV4dFNlY3Rpb24gPSBhY3RpdmVTZWN0aW9uLm5leHQoKTtcbiAgY29uc3QgcHJldlNlY3Rpb24gPSBhY3RpdmVTZWN0aW9uLnByZXYoKTtcblxuICByZXR1cm4ge1xuICAgIG5leHQoKSB7XG4gICAgICBpZiAobmV4dFNlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgIHNjcm9sbEZ1bmMobmV4dFNlY3Rpb24uaW5kZXgoKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBwcmV2KCkge1xuICAgICAgaWYgKHByZXZTZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICBzY3JvbGxGdW5jKHByZXZTZWN0aW9uLmluZGV4KCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4kKHdpbmRvdykub24oJ3doZWVsJywgKGUpID0+IHtcbiAgY29uc3QgZGVsdGFZID0gZS5vcmlnaW5hbEV2ZW50LmRlbHRhWTtcbiAgY29uc3Qgc2Nyb2xsZXIgPSBuZXdQb3NpdGlvbkRldGVjdG9yKCk7XG4gIFxuICBpZiAoZGVsdGFZID4gMCkge1xuICAgIHNjcm9sbGVyLm5leHQoKTtcbiAgfVxuXG4gIGlmIChkZWx0YVkgPCAwKSB7XG4gICAgc2Nyb2xsZXIucHJldigpO1xuICB9XG59KVxuXG4kKHdpbmRvdykub24oJ2tleWRvd24nLCAoZSkgPT4ge1xuXG4gIGNvbnN0IHRhZ05hbWUgPSBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IHVzZXJUeXBpbmdpbklucHV0cyA9IHRhZ05hbWUgPT0gXCJpbnB1dFwiIHx8IHRhZ05hbWUgPT0gXCJ0ZXh0YXJlYVwiO1xuICBjb25zdCBzY3JvbGxlciA9IG5ld1Bvc2l0aW9uRGV0ZWN0b3IoKTtcblxuICBpZiAodXNlclR5cGluZ2luSW5wdXRzKSByZXR1cm47XG5cbiAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICBjYXNlIDQwOlxuICAgICAgc2Nyb2xsZXIubmV4dCgpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIDM4OlxuICAgICAgc2Nyb2xsZXIucHJldigpO1xuICAgICAgYnJlYWs7XG4gIH1cbn0pXG5cbiQoJ1tkYXRhLXNjcm9sbC10b10nKS5jbGljayhlID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICBjb25zdCB0YXJnZXQgPSAkdGhpcy5hdHRyKCdkYXRhLXNjcm9sbC10bycpO1xuICBjb25zdCB0YXJnZXRTZWN0aW9uID0gJChgW2RhdGEtc2VjdGlvbi1pZD0ke3RhcmdldH1dYCk7XG5cbiAgc2Nyb2xsRnVuYyh0YXJnZXRTZWN0aW9uLmluZGV4KCkpO1xufSlcblxuXG4vL2h0dHBzOi8vZ2l0aHViLmNvbS9tYXR0YnJ5c29uL1RvdWNoU3dpcGUtSnF1ZXJ5LVBsdWdpblxuY29uc3QgbW9iaWxlRGV0ID0gbmV3IE1vYmlsZURldGVjdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5jb25zdCBpc01vYmlsZSA9IG1vYmlsZURldC5tb2JpbGUoKTtcblxuaWYgKGlzTW9iaWxlKSB7XG4gIC8vaHR0cDovL2hnb2VibC5naXRodWIuaW8vbW9iaWxlLWRldGVjdC5qcy9cbiAgXG4gICQoJy53cmFwcGVyJykub24oJ3RvdWNobW92ZScsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcblxuICAkKFwiYm9keVwiKS5zd2lwZSgge1xuICAgIFxuICAgIHN3aXBlOmZ1bmN0aW9uKGV2ZW50LCBkaXJlY3Rpb24pIHtcbiAgICAgIGNvbnN0IHNjcm9sbGVyID0gbmV3UG9zaXRpb25EZXRlY3RvcigpO1xuXG4gICAgICBsZXQgc2Nyb2xsRGlyZWN0aW9uOyBcblxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3VwJykge1xuICAgICAgICBzY3JvbGxEaXJlY3Rpb24gPSAnbmV4dCc7XG4gICAgICB9XG5cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdkb3duJykge1xuICAgICAgICBzY3JvbGxEaXJlY3Rpb24gPSAncHJldic7XG4gICAgICB9XG4gICAgICBzY3JvbGxlcltzY3JvbGxEaXJlY3Rpb25dKCk7XG4gICAgfVxuICB9KTtcbn1cbn0pKClcblxuXG5cblxuXG5cblxuIiwiKGZ1bmN0aW9uKCkge1xuXG5jb25zdCBmaW5kQmxvY2sgPSAodGFyZ2V0KSA9PiB7XG4gICByZXR1cm4gJCgnLnJldmlldycpLmZpbHRlcigobmR4LCBpdGVtKSA9PiB7XG4gICAgcmV0dXJuICQoaXRlbSkuYXR0cignZGF0YS1zbGlkZScpID09PSB0YXJnZXQ7XG4gIH0pO1xufTtcblxuJCgnLmludGVyYWN0aXZlLWF2YXRhcl9fbGluaycpLmNsaWNrKGUgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgY29uc3QgY3VycmVudExpbmsgPSAkKGUuY3VycmVudFRhcmdldCk7XG4gIGNvbnN0IHRhcmdldFJldmlldyA9IGN1cnJlbnRMaW5rLmF0dHIoJ2RhdGEtbGluaycpO1xuICBjb25zdCBzbGlkZXRvU2hvdyA9IGZpbmRCbG9jayh0YXJnZXRSZXZpZXcpO1xuICBjb25zdCBjdXJyZW50QXZhdGFyID0gY3VycmVudExpbmsuY2xvc2VzdCgnLmludGVyYWN0aXZlLWF2YXRhcicpO1xuXG4gIHNsaWRldG9TaG93LmFkZENsYXNzKCdyZXZpZXctLWFjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ3Jldmlldy0tYWN0aXZlJyk7XG4gIGN1cnJlbnRBdmF0YXIuYWRkQ2xhc3MoJ2ludGVyYWN0aXZlLWF2YXRhci0tYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnaW50ZXJhY3RpdmUtYXZhdGFyLS1hY3RpdmUnKTtcbn0pXG59KSgpXG5cblxuXG5cbiIsIi8vINCh0JvQkNCZ0JTQldCgIFxuKGZ1bmN0aW9uKCkge1xuXG5jb25zdCBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19saXN0Jyk7XG5jb25zdCBzbGlkZXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYXJyb3cnKTtcbmNvbnN0IHNsaWRlckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlcl9faXRlbScpO1xuXG5jb25zdCBzbGlkZXJTd2lwZSA9IChkaXJlY3Rpb24pID0+IHtcbiAgY29uc3Qgc2xpZGVyV2lkdGggPSBzbGlkZXIub2Zmc2V0V2lkdGg7XG5cbiAgbGV0IGkgPSAwO1xuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzbGlkZXJJdGVtcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gc2xpZGVySXRlbXNbaW5kZXhdO1xuXG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXJfX2l0ZW0tLWFjdGl2ZScpKSB7XG4gICAgICBpID0gaW5kZXg7XG4gICAgfVxuICAgIFxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX19pdGVtLS1hY3RpdmUnKTtcbiAgfVxuXG4gIGNvbnN0IGl0ZW1zQ291bnRlciA9IHNsaWRlckl0ZW1zLmxlbmd0aDtcblxuICBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICBpLT0xO1xuXG4gICAgaWYgKGk8MCkge1xuICAgICAgaSA9IGl0ZW1zQ291bnRlciAtIDE7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICBpKz0xO1xuXG4gICBpZiAoaSA+IGl0ZW1zQ291bnRlciAtIDEpIHtcbiAgICBpID0gMDtcbiAgICB9XG4gIH1cblxuICBzbGlkZXIuc3R5bGUubGVmdCA9IGAtJHtzbGlkZXJXaWR0aCAqIGl9cHhgO1xuICBzbGlkZXJJdGVtc1tpXS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2l0ZW0tLWFjdGl2ZScpOyBcbn1cblxuZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXJCdG4ubGVuZ3RoOyBpKyspIHtcbiAgY29uc3QgZWxlbWVudCA9IHNsaWRlckJ0bltpXTtcblxuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnYXJyb3ctLWxlZnQnKSkge1xuICAgICAgc2xpZGVyU3dpcGUoJ2xlZnQnKVxuICAgIH0gZWxzZSB7XG4gICAgICBzbGlkZXJTd2lwZSgncmlnaHQnKVxuICAgIH1cbiAgfSk7XG59XG5cbiQoJy5zbGlkZXJfX2J0bicpLmNsaWNrKGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKVxuXG59KSgpXG4iLCIvL9Ca0J7QnNCQ0J3QlNCQICjQstGL0L/QsNC00LDRjtGJ0LjQuSDRgtC10LrRgdGCIC0g0LTQtdGB0LrRgtC+0L8pXG5cbihmdW5jdGlvbigpIHtcblxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuICBjb25zdCB0ZWFtQnRuID0gJCgnLnRlYW1fX25hbWUnKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRlYW1CdG4ubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGVhbUJ0bltpXTtcblxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBmb3IgKGxldCBpbmRleD0gMDsgaW5kZXggPCB0ZWFtQnRuLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0ZWFtQnRuW2luZGV4XTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gZS5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsb3Nlc3QoJy50ZWFtX19pdGVtJykuY2xhc3NMaXN0LnJlbW92ZSgndGVhbV9faXRlbS0tYWN0aXZlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBlbGVtZW50LmNsb3Nlc3QoJy50ZWFtX19pdGVtJykuY2xhc3NMaXN0LnRvZ2dsZSgndGVhbV9faXRlbS0tYWN0aXZlJyk7XG4gICAgfSlcbiAgfVxufSlcbn0pKClcblxuIiwiKGZ1bmN0aW9uKCkge1xuXG5sZXQgaW50ZXJ2YWxJZDtcbmxldCBzb3VuZENvbnRyb2w7XG5sZXQgZHVyYXRpb25Db250cm9sO1xuXG5jb25zdCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlbycpO1xuY29uc3QgcGxheUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19fcGxheS1idG4nKTtcbmNvbnN0IHBsYXlCdG5CID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvX19idG4tcGxheUInKTtcbmNvbnN0IHNvdW5kQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvX19zb3VuZC1idG4nKTtcblxuLy9wbGF5L3BhdXNlINGB0L7QsdGL0YLQuNGPICjQtNC70Y8g0LzQvtCx0LjQu9GM0L3Ri9GFINC/0LvQtdC10YDQvtCyKVxudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCBpbnZlcnRWaWRlb0J0bnMpO1xudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIGludmVydFZpZGVvQnRucyk7XG5cbi8v0L3QsNC20LDRgtC40LUg0L3QsCDQutC70Y7Rh9C10LLRi9C1INGC0L7Rh9C60Lgg0LLQuNC00LXQvlxudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5U3RvcCk7XG5wbGF5QnRuQi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXlTdG9wKTtcbnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5U3RvcCk7XG5cbi8v0LjQt9C80LXQvdC10L3QuNC1INC/0L7Qu9C30YPQvdC60LAg0L/RgNC+0LjQs9GA0YvQstCw0L3QuNGPINCy0LjQtNC10L5cbmR1cmF0aW9uQ29udHJvbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdXJhdGlvbkxldmVsJyk7XG5kdXJhdGlvbkNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBzZXRWaWRlb0R1cmF0aW9uKTtcblxuZHVyYXRpb25Db250cm9sLm1pbiA9IDA7XG52aWRlby5vbmxvYWRlZG1ldGFkYXRhID0gZnVuY3Rpb24oKSB7XG4gIGR1cmF0aW9uQ29udHJvbC5tYXggPSB2aWRlby5kdXJhdGlvbiAqIDEwMDA7XG59XG5kdXJhdGlvbkNvbnRyb2wudmFsdWUgPSAwO1xuXG4vL9C90LDQttCw0YLQuNC1INC60L3QvtC/0LrQuCDQstC60Lsv0LLRi9C60Lsg0LfQstGD0LrQsFxubGV0IG1pY0NvbnRyb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNvdW5kT2ZmL09uXCIpO1xubWljQ29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNvdW5kT2ZmKTtcblxuLy/QuNC30LzQtdC90LXQvdC40LUg0L/QvtC70LfRg9C90LrQsCDQt9Cy0YPQutCwXG5zb3VuZENvbnRyb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291bmQtbGV2ZWwnKTtcbnNvdW5kQ29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNoYW5nZVNvdW5kVm9sdW1lKTtcbnNvdW5kQ29udHJvbC5taW4gPSAwO1xuc291bmRDb250cm9sLm1heCA9IDEwO1xuXG4vL9C30L3QsNGH0LXQvdC40Y8g0LfQstGD0LrQsCDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxuc291bmRDb250cm9sLnZhbHVlID0gc291bmRDb250cm9sLm1heDtcbmxldCBzdGVwID0gc291bmRDb250cm9sLm1heCAvIDEwMDA7XG5sZXQgcGVyY2VudCA9IHZpZGVvLnZvbHVtZSAvIHN0ZXA7XG5zb3VuZENvbnRyb2wuc3R5bGUuYmFja2dyb3VuZCA9IGBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNFMDFGM0QgMCUsICNFMDFGM0QgJHtwZXJjZW50fSUsICM4Njg2ODYgJHtwZXJjZW50fSUpYDtcblxuLy/QvtC60L7QvdGH0LDQvdC40LUg0LLQuNC00LXQvlxudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBlbmRPZlZpZGVvKTtcblxuXG5cbmZ1bmN0aW9uIHBsYXlTdG9wKCkge1xuXG4gIGlmICh2aWRlby5wYXVzZWQpIHtcbiAgICB2aWRlby5wbGF5KCk7XG4gICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHVwZGF0ZUR1cmF0aW9uLCAxMCk7XG5cbiAgfSBlbHNlIHtcbiAgICB2aWRlby5wYXVzZSgpO1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZClcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnZlcnRWaWRlb0J0bnMoKSB7XG4gIHBsYXlCdG5CLmNsYXNzTGlzdC50b2dnbGUoXCJ2aWRlb19fYnRuLXBsYXlCLS1hY3RpdmVcIik7XG4gIHBsYXlCdG4uY2xhc3NMaXN0LnRvZ2dsZSgndmlkZW9fX3BsYXktYnRuLS1hY3RpdmUnKTtcbn1cblxuZnVuY3Rpb24gc2V0VmlkZW9EdXJhdGlvbigpIHtcbiAgdmlkZW8uY3VycmVudFRpbWUgPSBkdXJhdGlvbkNvbnRyb2wudmFsdWUgLyAxMDAwO1xuICB1cGRhdGVEdXJhdGlvbigpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVEdXJhdGlvbigpIHtcbiAgZHVyYXRpb25Db250cm9sLnZhbHVlID0gdmlkZW8uY3VycmVudFRpbWUgKiAxMDAwO1xuXG4gIGxldCBzdGVwID0gdmlkZW8uZHVyYXRpb24gLyAxMDA7XG4gIGxldCBwZXJjZW50ID0gdmlkZW8uY3VycmVudFRpbWUgLyBzdGVwO1xuICBkdXJhdGlvbkNvbnRyb2wuc3R5bGUuYmFja2dyb3VuZCA9IGBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNFMDFGM0QgMCUsICNFMDFGM0QgJHtwZXJjZW50fSUsICM4Njg2ODYgJHtwZXJjZW50fSUpYDtcbn1cblxuXG5mdW5jdGlvbiBzb3VuZE9mZigpIHtcblxuICBpZiAodmlkZW8udm9sdW1lID09PSAwKSB7XG4gICAgdmlkZW8udm9sdW1lID0gc291bmRMZXZlbDtcbiAgICBzb3VuZENvbnRyb2wudmFsdWUgPSBzb3VuZExldmVsICogMTA7XG4gICAgc291bmRCdG4uY2xhc3NMaXN0LnJlbW92ZSgndmlkZW9fX3NvdW5kLWJ0bi0tYWN0aXZlJyk7XG5cbiAgICBsZXQgc3RlcCA9IHNvdW5kQ29udHJvbC5tYXggLyAxMDAwO1xuICAgIGxldCBwZXJjZW50ID0gdmlkZW8udm9sdW1lIC8gc3RlcDtcbiAgICBzb3VuZENvbnRyb2wuc3R5bGUuYmFja2dyb3VuZCA9IGBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNFMDFGM0QgMCUsICNFMDFGM0QgJHtwZXJjZW50fSUsICM4Njg2ODYgJHtwZXJjZW50fSUpYDtcblxuICB9IGVsc2Uge1xuICAgIHNvdW5kTGV2ZWwgPSB2aWRlby52b2x1bWU7XG4gICAgdmlkZW8udm9sdW1lID0gMDtcbiAgICBzb3VuZENvbnRyb2wudmFsdWUgPSAwO1xuICAgIHNvdW5kQnRuLmNsYXNzTGlzdC5hZGQoJ3ZpZGVvX19zb3VuZC1idG4tLWFjdGl2ZScpO1xuICAgIHNvdW5kQ29udHJvbC5zdHlsZS5iYWNrZ3JvdW5kID0gYCM4Njg2ODZgO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoYW5nZVNvdW5kVm9sdW1lKCkge1xuICB2aWRlby52b2x1bWUgPSBzb3VuZENvbnRyb2wudmFsdWUgLyAxMDtcbiAgbGV0IHN0ZXAgPSBzb3VuZENvbnRyb2wubWF4IC8gMTAwMDtcbiAgbGV0IHBlcmNlbnQgPSB2aWRlby52b2x1bWUgLyBzdGVwO1xuICBzb3VuZENvbnRyb2wuc3R5bGUuYmFja2dyb3VuZCA9IGBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNFMDFGM0QgMCUsICNFMDFGM0QgJHtwZXJjZW50fSUsICM4Njg2ODYgJHtwZXJjZW50fSUpYDtcblxuICBpZiAodmlkZW8udm9sdW1lID09IDApIHtcbiAgICBzb3VuZEJ0bi5jbGFzc0xpc3QuYWRkKCd2aWRlb19fc291bmQtYnRuLS1hY3RpdmUnKTtcbiAgfSBlbHNlIHtcbiAgICBzb3VuZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCd2aWRlb19fc291bmQtYnRuLS1hY3RpdmUnKTtcbiAgICBsZXQgc3RlcCA9IHNvdW5kQ29udHJvbC5tYXggLyAxMDAwO1xuICAgIGxldCBwZXJjZW50ID0gdmlkZW8udm9sdW1lIC8gc3RlcDtcbiAgICBzb3VuZENvbnRyb2wuc3R5bGUuYmFja2dyb3VuZCA9IGBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNFMDFGM0QgMCUsICNFMDFGM0QgJHtwZXJjZW50fSUsICM4Njg2ODYgJHtwZXJjZW50fSUpYDtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbmRPZlZpZGVvKCkge1xuICB2aWRlby5jdXJyZW50VGltZSA9IDA7XG4gIGR1cmF0aW9uQ29udHJvbC52YWx1ZSA9IDA7XG4gIGR1cmF0aW9uQ29udHJvbC5zdHlsZS5iYWNrZ3JvdW5kID0gYCM4Njg2ODZgO1xuICBcbiAgcGxheUJ0bkIuY2xhc3NMaXN0LnJlbW92ZSgndmlkZW9fX2J0bi1wbGF5Qi0tYWN0aXZlJyk7XG4gIHBsYXlCdG4uY2xhc3NMaXN0LnJlbW92ZSgndmlkZW9fX3BsYXktYnRuLS1hY3RpdmUnKTtcbiAgdmlkZW8ubG9hZCgpO1xufVxuXG59KSgpIl19
