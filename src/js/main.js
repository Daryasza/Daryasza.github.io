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
};

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
};

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
    };

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
})();
//ПОЛНОЭКРАННОЕ МЕНЮ 
//Логика перехода от ссылки к нужной секции страницы прописана в файле one-page-scroll.js и подтянута через data-атрибуты html.
(function() {
const hamburgerFullScreenMenu = document.querySelector('#hamburger');
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
  });
});

const closeFullScreenMenu = () => {
  FullScreenMenu.style.display = 'none';
  document.body.style.overflow = "scroll";
};

const openFullScreenMenu = () => {
  FullScreenMenu.style.display = 'block';
  document.body.style.overflow = "hidden";
};
})();
(function() {
  
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

})();
(function() {

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
    });
  }
});
})();

(function() {

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
    resetActiveClassForItem(sideBarItem, sectionNumber, 'sidebar__item--active');

  }, sectionTransitionTime + mouseInertiaTime);    
};

const countSectionPosition = (sectionNumber) => {

  sectionPosition = sectionNumber * -100;

  if (isNaN(sectionPosition)) {
    console.error('не верное значение в countSectionPosition');
    return 0;
  }

  return sectionPosition;
};

const resetActiveClassForItem = (item, itemEq, activeClass) => {
  item.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const changeSidebarColor = (sectionNumber) => {
  const currentSection = section.eq(sectionNumber);
  const sideBarColor = currentSection.attr('data-sidebar-color');

  if (sideBarColor === 'grey') {

    sideBar.addClass('sidebar--color--grey')
  } else {

    sideBar.removeClass('sidebar--color--grey')
  }
};

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
};

$(window).on('wheel', (e) => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = newPositionDetector();
  
  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
});

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
});

$('[data-scroll-to]').click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const targetSection = $(`[data-section-id=${target}]`);

  scrollFunc(targetSection.index());
});


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
})();








(function() {

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
});
})();





// СЛАЙДЕР 
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

$('.slider__btn').click(e => e.preventDefault());

})();
//КОМАНДА (выпадающий текст - десктоп)

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
    });
  }
});
})();


(function() {

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
};
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
    clearInterval(intervalId);
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

})();
