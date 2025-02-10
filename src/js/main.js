// FORM
(function() {
// Name validation (no digits allowed)
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

// Phone validation (only -, +, backspace, arrows, and digits are allowed)
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

// Form verification
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
const successMessage = createModal('Message sent!'); 
const failureMessage = createModal('Failed to send the message, please try again later.');

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
  close.innerHTML = "close";
  
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

// Sending data to the server
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
      // The server expects an email field that is not provided in the form layout, so inserting a default value manually
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
        // In case of a server error, do not clear the form to allow easy re-submission
      }
    });
  }
});
})();

// FULLSCREEN MENU
// The logic for navigating from a link to the corresponding section of the page is written in the file one-page-scroll.js and retrieved via data attributes in HTML.
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
;(function() {
  
let map;

function init() {

  var map = new ymaps.Map("map", {

    center: [55.74882631, 37.59754130],
    zoom: 13,
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
    iconImageHref: 'img/map/marker.svg',
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
;(function() {

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
    const mouseInertiaTime = 400;

    if (inMove === false) {
      inMove = true;
      maincontent.css({ 
        transform: `translateY(${newPosition}%)`
      });
      
      changeSidebarColor(sectionNumber);
      resetActiveClassForItem(sideBarItem, sectionNumber, 'sidebar__item--active');
      resetActiveClassForItem(section, sectionNumber, 'active');
    
      setTimeout(() => {
        inMove = false
      }, sectionTransitionTime + mouseInertiaTime);  
    } else {
      return
    }
  };

  const countSectionPosition = (sectionNumber) => {
  
    const sectionPosition = sectionNumber * -100;
  
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
  })();;(function() {

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





// SLIDER 
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


//TEAM - dropdown text - desktop
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

//VIDEO
;(function() {

let intervalId;
let soundControl;
let durationControl;

const video = document.getElementById('video');
const playBtn = document.querySelector('.video__play-btn');
const playBtnB = document.querySelector('.video__btn-playB');
const soundBtn = document.querySelector('.video__sound-btn');

//play/pause events (for mobile)
video.addEventListener('pause', invertVideoBtns);
video.addEventListener('play', invertVideoBtns);

// Clicking on key points of the video
video.addEventListener('click', playStop);
playBtnB.addEventListener('click', playStop);
playBtn.addEventListener('click', playStop);

// Changing the video playback slider
durationControl = document.getElementById('durationLevel');
durationControl.addEventListener('input', setVideoDuration);

durationControl.min = 0;
video.onloadedmetadata = function() {
  durationControl.max = video.duration * 1000;
};
durationControl.value = 0;

// Clicking the mute/unmute button
let micControl = document.getElementById("soundOff/On");
micControl.addEventListener('click', soundOff);

// Changing the volume slider
soundControl = document.getElementById('sound-level');
soundControl.addEventListener('input', changeSoundVolume);
soundControl.min = 0;
soundControl.max = 10;

// Default volume values
soundControl.value = soundControl.max;
let step = soundControl.max / 1000;
let percent = video.volume / step;
soundControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${percent}%, #868686 ${percent}%)`;

// Variable to store the last volume level
let soundControlBfr = soundControl.value

// Video end event
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
    soundControl.value = soundControlBfr;
    // Not working on iOS (video.volume is read-only and always =1)
    // https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html
    video.volume = soundControlBfr / 10;
    soundBtn.classList.toggle('video__sound-btn--active');
    let step = soundControl.max / 1000;
    let percent = video.volume / step;
    soundControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${percent}%, #868686 ${percent}%)`;

  } else {
    soundControlBfr = soundControl.value;
    video.volume = 0;
    soundControl.value = 0;
    soundBtn.classList.toggle('video__sound-btn--active');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0uanMiLCJmcy1tZW51LmpzIiwibWFwLmpzIiwibWVudS5qcyIsIm9uZS1wYWdlLXNjcm9sbC5qcyIsInJldmlld3MuanMiLCJzbGlkZXIuanMiLCJ0ZWFtLmpzIiwidmlkZW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDeEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0N6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQ3ZKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDQpNCe0KDQnNCQXG4oZnVuY3Rpb24oKSB7XG4vL9Cf0YDQvtCy0LXRgNC60LAg0LjQvNC10L3QuCAo0L3QtdGCINC70Lgg0YbQuNGE0YApXG5jb25zdCBpc05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmFtZScpXG5pc05hbWUuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBpc0RpZ2l0ID0gZmFsc2U7IFxuICBcbiAgaWYgKGV2ZW50LmtleSA+PTAgfHwgZXZlbnQua2V5IDw9OSkge1xuICAgIGlzRGlnaXQgPSB0cnVlOyBcbiAgfVxuICBpZiAoaXNEaWdpdCA9PSB0cnVlKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxufSk7XG5cbi8v0J/RgNC+0LLQtdGA0LrQsCDRgtC10LvQtdGE0L7QvdCwICjQtNC+0YHRgtGD0L/QvdGLINGC0L7Qu9GM0LrQviAtLCArLCBiYWNrc3BhY2UsIGFycm93cyDQuCDRhtC40YTRgNGLKVxuY29uc3QgaW5wdXRQaG9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dFBob25lJyk7XG5pbnB1dFBob25lLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgaXNEaWdpdCA9IGZhbHNlOyBcbiAgbGV0IGlzRGFzaCA9IGZhbHNlO1xuICBsZXQgaXNQbHVzID0gZmFsc2U7XG4gIGxldCBpc0NvbnRyb2wgPSBmYWxzZTtcblxuICBpZiAoZXZlbnQua2V5ID49MCB8fCBldmVudC5rZXkgPD05KSB7XG4gICAgaXNEaWdpdCA9IHRydWU7IFxuICB9XG4gIGlmIChldmVudC5rZXkgPT0gJy0nKSB7XG4gICAgaXNEYXNoID0gdHJ1ZTtcbiAgfVxuICBpZiAoZXZlbnQua2V5ID09ICcrJykge1xuICAgIGlzUGx1cyA9IHRydWU7XG4gIH1cbiAgaWYgKGV2ZW50LmtleSA9PSAnQXJyb3dSaWdodCcgfHwgZXZlbnQua2V5ID09ICdBcnJvd0xlZnQnIHx8IGV2ZW50LmtleSA9PSAnQmFja3NwYWNlJykge1xuICAgIGlzQ29udHJvbCA9IHRydWU7XG4gIH1cblxuICBpZiAoIWlzRGlnaXQgJiYgIWlzQ29udHJvbCAmJiAhaXNEYXNoICYmICFpc1BsdXMpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59KTtcblxuLy/QktC10YDQuNGE0LjQutCw0YbQuNGPINGE0L7RgNC80YtcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXRzJyk7XG5cbmNvbnN0IHZhbGlkYXRlRmllbGQgPSAoZmllbGQpID0+IHtcbiAgaWYgKCFmaWVsZC52YWx1ZS50cmltKCkubGVuZ3RoKSB7XG4gICAgZmllbGQuY2xhc3NMaXN0LmFkZCgnaW5wdXRzX19mb3JtLS1lcnJvcicpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBmaWVsZC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dHNfX2Zvcm0tLWVycm9yJyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbmNvbnN0IHZhbGlkYXRlRm9ybSA9IChpbnB1dCkgPT4ge1xuICBsZXQgaXNWYWxpZCA9IHRydWVcblxuICBmb3IgKGNvbnN0IGtleSBpbiBpbnB1dCkge1xuICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChpbnB1dCwga2V5KSkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGlucHV0W2tleV07XG5cbiAgICAgIGNvbnN0IHZhbGlkID0gdmFsaWRhdGVGaWVsZChlbGVtZW50KTtcbiAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gaXNWYWxpZDtcbn07XG5cbmNvbnN0IHNlY3Rpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tLWZvcm0nKTtcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5OyBcbmNvbnN0IHN1Y2Nlc3NNZXNzYWdlID0gY3JlYXRlTW9kYWwoJ9Ch0L7QvtCx0YnQtdC90LjQtSDQvtGC0L/RgNCw0LLQu9C10L3QviEnKTsgXG5jb25zdCBmYWlsdXJlTWVzc2FnZSA9IGNyZWF0ZU1vZGFsKCfQntGC0L/RgNCw0LLQuNGC0Ywg0L/QuNGB0YzQvNC+INC90LUg0YPQtNCw0LvQvtGB0YwsINC/0L7QstGC0L7RgNC40YLQtSDQt9Cw0L/RgNC+0YEg0L/QvtC30LbQtS4nKTtcblxuZnVuY3Rpb24gY3JlYXRlTW9kYWwoY29udGVudCkge1xuICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheScpO1xuXG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsJyk7XG5cbiAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0ZXh0LmNsYXNzTGlzdC5hZGQoJ3RleHQnKTtcblxuICBjb25zdCBjbG9zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgY2xvc2UuY2xhc3NMaXN0LmFkZCgnYnRuJyk7XG4gIGNsb3NlLmNsYXNzTGlzdC5hZGQoJ2J0bi0tY29sb3ItLXJlZCcpO1xuXG4gIG92ZXJsYXkuYXBwZW5kQ2hpbGQobW9kYWwpO1xuICBtb2RhbC5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgdGV4dC5pbm5lckhUTUwgPSBjb250ZW50O1xuICBtb2RhbC5hcHBlbmRDaGlsZChjbG9zZSk7XG4gIGNsb3NlLmhyZWYgPSBcIiNcIjtcbiAgY2xvc2UuaW5uZXJIVE1MID0gXCLQt9Cw0LrRgNGL0YLRjFwiO1xuICBcblxuICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGJvZHkuc3R5bGUub3ZlcmZsb3c9XCJzY3JvbGxcIjtcbiAgICBib2R5LnJlbW92ZUNoaWxkKG92ZXJsYXkpO1xuICAgIH0pO1xuXG4gICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIFxuICAgICAgaWYgKGVsZW1lbnQudGFyZ2V0ID09PSBvdmVybGF5KSB7XG4gICAgICAgIGNsb3NlLmNsaWNrKCk7XG4gICAgICB9XG4gICAgfSlcbiAgcmV0dXJuIG92ZXJsYXk7XG59XG5cbi8v0J7RgtC/0YDQsNCy0LrQsCDQtNCw0L3QvdGL0YUg0L3QsCDRgdC10YDQstC10YBcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBjb25zdCBpbnB1dCA9IHtcbiAgICBuYW1lOiBmb3JtLmVsZW1lbnRzLm5hbWUsXG4gICAgcGhvbmU6IGZvcm0uZWxlbWVudHMucGhvbmUsXG4gICAgY29tbWVudDogZm9ybS5jb21tZW50LFxuICB9XG5cbiAgaWYgKHZhbGlkYXRlRm9ybShpbnB1dCkpIHtcbiAgICBib2R5LnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCI7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbmFtZTogaW5wdXQubmFtZS52YWx1ZSwgXG4gICAgICBwaG9uZTogaW5wdXQucGhvbmUudmFsdWUsXG4gICAgICBjb21tZW50OiBpbnB1dC5jb21tZW50LnZhbHVlLFxuICAgICAgLy/RgdC10YDQstC10YAg0LbQtNC10YIg0LfQvdCw0YfQtdC90LjRjyDQv9C+0LvRjyBlbWFpbCwg0L3QtSDQv9GA0LXQtNGD0YHQvNC+0YLRgNC10L3QvdC+0LPQviDQvNCw0LrQtdGC0L7QvCwg0L/QvtGN0YLQvtC80YMg0LLRgdGC0LDQstC70Y/RjiDQt9C90LDRh9C10L3QuNC1INCy0YDRg9GH0L3Rg9GOXG4gICAgICB0bzogJ215QGVtYWlsLmNvbSdcbiAgICB9O1xuXG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oJ1BPU1QnLCAnaHR0cHM6Ly93ZWJkZXYtYXBpLmxvZnRzY2hvb2wuY29tL3NlbmRtYWlsJyk7XG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgXG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICBpZiAoKHhoci5yZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoc3VjY2Vzc01lc3NhZ2UpO1xuICAgICAgICBmb3JtLnJlc2V0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2R5LmFwcGVuZENoaWxkKGZhaWx1cmVNZXNzYWdlKTsgIFxuICAgICAgICAvL9CyINGB0LvRg9GH0LDQtSDQvtGI0LjQsdC60Lgg0YHQviDRgdGC0L7RgNC+0L3RiyDRgdC10YDQstC10YDQsCwg0L3QtSDQvtGH0LjRidCw0Y4g0YHQvtC00LXRgNC20LjQvNC+0LUg0YTQvtGA0LzRiyDQtNC70Y8g0YPQtNC+0LHRgdGC0LLQsCDQvtGC0L/RgNCw0LLQutC4INC/0L7QstGC0L7RgNC90L7Qs9C+INC30LDQv9GA0L7RgdCwXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0pO1xufSkoKTtcbiIsIi8v0J/QntCb0J3QntCt0JrQoNCQ0J3QndCe0JUg0JzQldCd0K4gXG4vL9Cb0L7Qs9C40LrQsCDQv9C10YDQtdGF0L7QtNCwINC+0YIg0YHRgdGL0LvQutC4INC6INC90YPQttC90L7QuSDRgdC10LrRhtC40Lgg0YHRgtGA0LDQvdC40YbRiyDQv9GA0L7Qv9C40YHQsNC90LAg0LIg0YTQsNC50LvQtSBvbmUtcGFnZS1zY3JvbGwuanMg0Lgg0L/QvtC00YLRj9C90YPRgtCwINGH0LXRgNC10LcgZGF0YS3QsNGC0YDQuNCx0YPRgtGLIGh0bWwuXG4oZnVuY3Rpb24oKSB7XG5jb25zdCBoYW1idXJnZXJGdWxsU2NyZWVuTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoYW1idXJnZXInKTtcbmNvbnN0IHhGdWxsU2NyZWVuTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNGU21lbnVDbG9zZScpO1xuY29uc3QgRnVsbFNjcmVlbk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjRlNtZW51Jyk7XG5jb25zdCBGU21lbnVJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2xpbmsnKTtcblxuaGFtYnVyZ2VyRnVsbFNjcmVlbk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlbGVtZW50KXtcbiAgb3BlbkZ1bGxTY3JlZW5NZW51KCk7XG4gIFxuICB4RnVsbFNjcmVlbk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlbGVtZW50KXtcbiAgICBlbGVtZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjbG9zZUZ1bGxTY3JlZW5NZW51KCk7XG4gIH0pO1xufSk7XG5cbkZTbWVudUl0ZW0uZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXG4gICAgY2xvc2VGdWxsU2NyZWVuTWVudSgpO1xuICB9KTtcbn0pO1xuXG5jb25zdCBjbG9zZUZ1bGxTY3JlZW5NZW51ID0gKCkgPT4ge1xuICBGdWxsU2NyZWVuTWVudS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJzY3JvbGxcIjtcbn07XG5cbmNvbnN0IG9wZW5GdWxsU2NyZWVuTWVudSA9ICgpID0+IHtcbiAgRnVsbFNjcmVlbk1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xufTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gIFxubGV0IG1hcDtcblxuZnVuY3Rpb24gaW5pdCgpIHtcblxuICB2YXIgbWFwID0gbmV3IHltYXBzLk1hcChcIm1hcFwiLCB7XG5cbiAgICBjZW50ZXI6IFs1NS43NDg4MjYzMSwgMzcuNTk3NTQxMzBdLFxuICAgIHpvb206IDEzLFxuICAgIGNvbnRyb2xzOiBbXVxuICB9KTtcblxuICB2YXIgY29vcmRzID0gW1xuICAgIFs1NS43NTA2NTM5NywgMzcuNjA1MTg0MzVdLFxuICAgIFs1NS43NjEwMzUyOCwgMzcuNTc4ODY5MjBdLFxuICAgIFs1NS43NTUzNDkyOSwgMzcuNjE4NTczOTRdLFxuICAgIFs1NS43NDQxNjY3MywgMzcuNTgwNzIyNjFdXG4gIF07XG5cbiAgdmFyIG15Q29sbGVjdGlvbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKHt9LCB7XG4gICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxuICAgIGljb25JbWFnZUhyZWY6ICdpbWcvbWFwL21hcmtlci5zdmcnLFxuICAgIGljb25JbWFnZVNpemU6IFs0MywgNTVdLFxuICAgIGljb25JbWFnZU9mZnNldDogWy0zNSwgLTUyXSxcbiAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgIGF1dG9GaXRUb1ZpZXdwb3J0OiAnYWx3YXlzJ1xuICB9KTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgIG15Q29sbGVjdGlvbi5hZGQobmV3IHltYXBzLlBsYWNlbWFyayhjb29yZHNbaV0pKTtcbiAgfVxuXG4gIG1hcC5nZW9PYmplY3RzLmFkZChteUNvbGxlY3Rpb24pO1xuICBpZiAobXlDb2xsZWN0aW9uLmdldExlbmd0aCgpID09IDEpIHtcbiAgICBtYXAuc2V0Q2VudGVyKFxuICAgICAgbXlDb2xsZWN0aW9uLmdldCgwKS5nZW9tZXRyeS5nZXRDb29yZGluYXRlcygpXG4gICAgKVxuICB9IGVsc2UgaWYgKG15Q29sbGVjdGlvbi5nZXRMZW5ndGgoKSA+IDEpIHtcbiAgICBtYXAuc2V0Qm91bmRzKG15Q29sbGVjdGlvbi5nZXRCb3VuZHMoKSk7XG4gIH1cblxuICBtYXAuYmVoYXZpb3JzLmRpc2FibGUoJ3Njcm9sbFpvb20nKTtcblxuICBpZiAobmV3IE1vYmlsZURldGVjdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkubW9iaWxlKCkpIHtcbiAgICBtYXAuYmVoYXZpb3JzLmRpc2FibGUoJ2RyYWcnKTtcbiAgfVxufTtcblxueW1hcHMucmVhZHkoaW5pdCk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbmNvbnN0IG1lbnVCdG4gPSAkKCcuc2N0LW1lbnVfX2Jsb2NrJyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcbiAgXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWVudUJ0bi5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBtZW51QnRuW2ldO1xuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbWVudUJ0bi5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IG1lbnVCdG5baW5kZXhdO1xuXG4gICAgICAgIGlmIChlbGVtZW50ICE9PSBlLmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgICBlbGVtZW50LmNsb3Nlc3QoJy5zY3QtbWVudV9faXRlbScpLmNsYXNzTGlzdC5yZW1vdmUoJ3NjdC1tZW51X19pdGVtLS1hY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxlbWVudC5jbG9zZXN0KCcuc2N0LW1lbnVfX2l0ZW0nKS5jbGFzc0xpc3QudG9nZ2xlKCdzY3QtbWVudV9faXRlbS0tYWN0aXZlJyk7XG4gICAgfSk7XG4gIH1cbn0pO1xufSkoKTtcblxuIiwiKGZ1bmN0aW9uKCkge1xuXG4gIGNvbnN0IHNlY3Rpb24gPSAkKCcuc2VjdGlvbicpO1xuICBjb25zdCBtYWluY29udGVudCA9ICQoJy5tYWluY29udGVudCcpO1xuICBjb25zdCBzaWRlQmFyID0gJCgnLnNpZGViYXInKTtcbiAgY29uc3Qgc2lkZUJhckl0ZW0gPSBzaWRlQmFyLmZpbmQoJy5zaWRlYmFyX19pdGVtJyk7XG4gIFxuICBzZWN0aW9uLmZpcnN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICBsZXQgaW5Nb3ZlID0gZmFsc2U7XG4gIFxuICBjb25zdCBzY3JvbGxGdW5jID0gKHNlY3Rpb25OdW1iZXIpID0+IHtcbiAgICBjb25zdCBuZXdQb3NpdGlvbiA9IGNvdW50U2VjdGlvblBvc2l0aW9uKHNlY3Rpb25OdW1iZXIpO1xuICAgIGNvbnN0IHNlY3Rpb25UcmFuc2l0aW9uVGltZSA9IDcwMDtcbiAgICBjb25zdCBtb3VzZUluZXJ0aWFUaW1lID0gNDAwO1xuXG4gICAgaWYgKGluTW92ZSA9PT0gZmFsc2UpIHtcbiAgICAgIGluTW92ZSA9IHRydWU7XG4gICAgICBtYWluY29udGVudC5jc3MoeyBcbiAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgke25ld1Bvc2l0aW9ufSUpYFxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGNoYW5nZVNpZGViYXJDb2xvcihzZWN0aW9uTnVtYmVyKTtcbiAgICAgIHJlc2V0QWN0aXZlQ2xhc3NGb3JJdGVtKHNpZGVCYXJJdGVtLCBzZWN0aW9uTnVtYmVyLCAnc2lkZWJhcl9faXRlbS0tYWN0aXZlJyk7XG4gICAgICByZXNldEFjdGl2ZUNsYXNzRm9ySXRlbShzZWN0aW9uLCBzZWN0aW9uTnVtYmVyLCAnYWN0aXZlJyk7XG4gICAgXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaW5Nb3ZlID0gZmFsc2VcbiAgICAgIH0sIHNlY3Rpb25UcmFuc2l0aW9uVGltZSArIG1vdXNlSW5lcnRpYVRpbWUpOyAgXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfTtcblxuICBjb25zdCBjb3VudFNlY3Rpb25Qb3NpdGlvbiA9IChzZWN0aW9uTnVtYmVyKSA9PiB7XG4gIFxuICAgIGNvbnN0IHNlY3Rpb25Qb3NpdGlvbiA9IHNlY3Rpb25OdW1iZXIgKiAtMTAwO1xuICBcbiAgICBpZiAoaXNOYU4oc2VjdGlvblBvc2l0aW9uKSkge1xuICAgICAgY29uc29sZS5lcnJvcign0L3QtSDQstC10YDQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQsiBjb3VudFNlY3Rpb25Qb3NpdGlvbicpO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICBcbiAgICByZXR1cm4gc2VjdGlvblBvc2l0aW9uO1xuICB9O1xuICBcbiAgY29uc3QgcmVzZXRBY3RpdmVDbGFzc0Zvckl0ZW0gPSAoaXRlbSwgaXRlbUVxLCBhY3RpdmVDbGFzcykgPT4ge1xuICAgIGl0ZW0uZXEoaXRlbUVxKS5hZGRDbGFzcyhhY3RpdmVDbGFzcykuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XG4gIH07XG4gIFxuICBjb25zdCBjaGFuZ2VTaWRlYmFyQ29sb3IgPSAoc2VjdGlvbk51bWJlcikgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRTZWN0aW9uID0gc2VjdGlvbi5lcShzZWN0aW9uTnVtYmVyKTtcbiAgICBjb25zdCBzaWRlQmFyQ29sb3IgPSBjdXJyZW50U2VjdGlvbi5hdHRyKCdkYXRhLXNpZGViYXItY29sb3InKTtcbiAgXG4gICAgaWYgKHNpZGVCYXJDb2xvciA9PT0gJ2dyZXknKSB7XG4gIFxuICAgICAgc2lkZUJhci5hZGRDbGFzcygnc2lkZWJhci0tY29sb3ItLWdyZXknKVxuICAgIH0gZWxzZSB7XG4gIFxuICAgICAgc2lkZUJhci5yZW1vdmVDbGFzcygnc2lkZWJhci0tY29sb3ItLWdyZXknKVxuICAgIH1cbiAgfTtcbiAgXG4gIGNvbnN0IG5ld1Bvc2l0aW9uRGV0ZWN0b3IgPSAoKSA9PiB7XG4gICAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IHNlY3Rpb24uZmlsdGVyKCcuYWN0aXZlJyk7XG4gICAgY29uc3QgbmV4dFNlY3Rpb24gPSBhY3RpdmVTZWN0aW9uLm5leHQoKTtcbiAgICBjb25zdCBwcmV2U2VjdGlvbiA9IGFjdGl2ZVNlY3Rpb24ucHJldigpO1xuICBcbiAgICByZXR1cm4ge1xuICAgICAgbmV4dCgpIHtcbiAgICAgICAgaWYgKG5leHRTZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICAgIHNjcm9sbEZ1bmMobmV4dFNlY3Rpb24uaW5kZXgoKSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwcmV2KCkge1xuICAgICAgICBpZiAocHJldlNlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgc2Nyb2xsRnVuYyhwcmV2U2VjdGlvbi5pbmRleCgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgXG4gICQod2luZG93KS5vbignd2hlZWwnLCAoZSkgPT4ge1xuICAgIGNvbnN0IGRlbHRhWSA9IGUub3JpZ2luYWxFdmVudC5kZWx0YVk7XG4gICAgY29uc3Qgc2Nyb2xsZXIgPSBuZXdQb3NpdGlvbkRldGVjdG9yKCk7XG4gICAgXG4gICAgaWYgKGRlbHRhWSA+IDApIHtcbiAgICAgIHNjcm9sbGVyLm5leHQoKTtcbiAgICB9XG4gIFxuICAgIGlmIChkZWx0YVkgPCAwKSB7XG4gICAgICBzY3JvbGxlci5wcmV2KCk7XG4gICAgfVxuICB9KTtcbiAgXG4gICQod2luZG93KS5vbigna2V5ZG93bicsIChlKSA9PiB7XG4gIFxuICAgIGNvbnN0IHRhZ05hbWUgPSBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgdXNlclR5cGluZ2luSW5wdXRzID0gdGFnTmFtZSA9PSBcImlucHV0XCIgfHwgdGFnTmFtZSA9PSBcInRleHRhcmVhXCI7XG4gICAgY29uc3Qgc2Nyb2xsZXIgPSBuZXdQb3NpdGlvbkRldGVjdG9yKCk7XG4gIFxuICAgIGlmICh1c2VyVHlwaW5naW5JbnB1dHMpIHJldHVybjtcbiAgXG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgNDA6XG4gICAgICAgIHNjcm9sbGVyLm5leHQoKTtcbiAgICAgICAgYnJlYWs7XG4gIFxuICAgICAgY2FzZSAzODpcbiAgICAgICAgc2Nyb2xsZXIucHJldigpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0pO1xuICBcbiAgJCgnW2RhdGEtc2Nyb2xsLXRvXScpLmNsaWNrKGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgXG4gICAgY29uc3QgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XG4gICAgY29uc3QgdGFyZ2V0ID0gJHRoaXMuYXR0cignZGF0YS1zY3JvbGwtdG8nKTtcbiAgICBjb25zdCB0YXJnZXRTZWN0aW9uID0gJChgW2RhdGEtc2VjdGlvbi1pZD0ke3RhcmdldH1dYCk7XG4gIFxuICAgIHNjcm9sbEZ1bmModGFyZ2V0U2VjdGlvbi5pbmRleCgpKTtcbiAgfSk7XG4gIFxuICBcbiAgLy9odHRwczovL2dpdGh1Yi5jb20vbWF0dGJyeXNvbi9Ub3VjaFN3aXBlLUpxdWVyeS1QbHVnaW5cbiAgY29uc3QgbW9iaWxlRGV0ID0gbmV3IE1vYmlsZURldGVjdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gIGNvbnN0IGlzTW9iaWxlID0gbW9iaWxlRGV0Lm1vYmlsZSgpO1xuICBcbiAgaWYgKGlzTW9iaWxlKSB7XG4gICAgLy9odHRwOi8vaGdvZWJsLmdpdGh1Yi5pby9tb2JpbGUtZGV0ZWN0LmpzL1xuICAgIFxuICAgICQoJy53cmFwcGVyJykub24oJ3RvdWNobW92ZScsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcbiAgXG4gICAgJChcImJvZHlcIikuc3dpcGUoIHtcbiAgICAgIFxuICAgICAgc3dpcGU6ZnVuY3Rpb24oZXZlbnQsIGRpcmVjdGlvbikge1xuICAgICAgICBjb25zdCBzY3JvbGxlciA9IG5ld1Bvc2l0aW9uRGV0ZWN0b3IoKTtcbiAgXG4gICAgICAgIGxldCBzY3JvbGxEaXJlY3Rpb247IFxuICBcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3VwJykge1xuICAgICAgICAgIHNjcm9sbERpcmVjdGlvbiA9ICduZXh0JztcbiAgICAgICAgfVxuICBcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2Rvd24nKSB7XG4gICAgICAgICAgc2Nyb2xsRGlyZWN0aW9uID0gJ3ByZXYnO1xuICAgICAgICB9XG4gICAgICAgIHNjcm9sbGVyW3Njcm9sbERpcmVjdGlvbl0oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICB9KSgpOyIsIihmdW5jdGlvbigpIHtcblxuY29uc3QgZmluZEJsb2NrID0gKHRhcmdldCkgPT4ge1xuICByZXR1cm4gJCgnLnJldmlldycpLmZpbHRlcigobmR4LCBpdGVtKSA9PiB7XG4gICAgcmV0dXJuICQoaXRlbSkuYXR0cignZGF0YS1zbGlkZScpID09PSB0YXJnZXQ7XG4gIH0pO1xufTtcblxuJCgnLmludGVyYWN0aXZlLWF2YXRhcl9fbGluaycpLmNsaWNrKGUgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgY29uc3QgY3VycmVudExpbmsgPSAkKGUuY3VycmVudFRhcmdldCk7XG4gIGNvbnN0IHRhcmdldFJldmlldyA9IGN1cnJlbnRMaW5rLmF0dHIoJ2RhdGEtbGluaycpO1xuICBjb25zdCBzbGlkZXRvU2hvdyA9IGZpbmRCbG9jayh0YXJnZXRSZXZpZXcpO1xuICBjb25zdCBjdXJyZW50QXZhdGFyID0gY3VycmVudExpbmsuY2xvc2VzdCgnLmludGVyYWN0aXZlLWF2YXRhcicpO1xuXG4gIHNsaWRldG9TaG93LmFkZENsYXNzKCdyZXZpZXctLWFjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ3Jldmlldy0tYWN0aXZlJyk7XG4gIGN1cnJlbnRBdmF0YXIuYWRkQ2xhc3MoJ2ludGVyYWN0aXZlLWF2YXRhci0tYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnaW50ZXJhY3RpdmUtYXZhdGFyLS1hY3RpdmUnKTtcbn0pO1xufSkoKTtcblxuXG5cblxuXG4iLCIvLyDQodCb0JDQmdCU0JXQoCBcbihmdW5jdGlvbigpIHtcblxuY29uc3Qgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fbGlzdCcpO1xuY29uc3Qgc2xpZGVyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFycm93Jyk7XG5jb25zdCBzbGlkZXJJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZXJfX2l0ZW0nKTtcblxuY29uc3Qgc2xpZGVyU3dpcGUgPSAoZGlyZWN0aW9uKSA9PiB7XG4gIGNvbnN0IHNsaWRlcldpZHRoID0gc2xpZGVyLm9mZnNldFdpZHRoO1xuXG4gIGxldCBpID0gMDtcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2xpZGVySXRlbXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IHNsaWRlckl0ZW1zW2luZGV4XTtcblxuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnc2xpZGVyX19pdGVtLS1hY3RpdmUnKSkge1xuICAgICAgaSA9IGluZGV4O1xuICAgIH1cbiAgICBcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl9faXRlbS0tYWN0aXZlJyk7XG4gIH1cblxuICBjb25zdCBpdGVtc0NvdW50ZXIgPSBzbGlkZXJJdGVtcy5sZW5ndGg7XG5cbiAgaWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgaS09MTtcblxuICAgIGlmIChpPDApIHtcbiAgICAgIGkgPSBpdGVtc0NvdW50ZXIgLSAxO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgaSs9MTtcblxuICAgaWYgKGkgPiBpdGVtc0NvdW50ZXIgLSAxKSB7XG4gICAgaSA9IDA7XG4gICAgfVxuICB9XG5cbiAgc2xpZGVyLnN0eWxlLmxlZnQgPSBgLSR7c2xpZGVyV2lkdGggKiBpfXB4YDtcbiAgc2xpZGVySXRlbXNbaV0uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19pdGVtLS1hY3RpdmUnKTsgXG59XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVyQnRuLmxlbmd0aDsgaSsrKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBzbGlkZXJCdG5baV07XG5cbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2Fycm93LS1sZWZ0JykpIHtcbiAgICAgIHNsaWRlclN3aXBlKCdsZWZ0JylcbiAgICB9IGVsc2Uge1xuICAgICAgc2xpZGVyU3dpcGUoJ3JpZ2h0JylcbiAgICB9XG4gIH0pO1xufVxuXG4kKCcuc2xpZGVyX19idG4nKS5jbGljayhlID0+IGUucHJldmVudERlZmF1bHQoKSk7XG5cbn0pKCk7XG4iLCIvL9Ca0J7QnNCQ0J3QlNCQICjQstGL0L/QsNC00LDRjtGJ0LjQuSDRgtC10LrRgdGCIC0g0LTQtdGB0LrRgtC+0L8pXG5cbihmdW5jdGlvbigpIHtcblxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuICBjb25zdCB0ZWFtQnRuID0gJCgnLnRlYW1fX25hbWUnKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRlYW1CdG4ubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGVhbUJ0bltpXTtcblxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBmb3IgKGxldCBpbmRleD0gMDsgaW5kZXggPCB0ZWFtQnRuLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0ZWFtQnRuW2luZGV4XTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gZS5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsb3Nlc3QoJy50ZWFtX19pdGVtJykuY2xhc3NMaXN0LnJlbW92ZSgndGVhbV9faXRlbS0tYWN0aXZlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBlbGVtZW50LmNsb3Nlc3QoJy50ZWFtX19pdGVtJykuY2xhc3NMaXN0LnRvZ2dsZSgndGVhbV9faXRlbS0tYWN0aXZlJyk7XG4gICAgfSk7XG4gIH1cbn0pO1xufSkoKTtcblxuXG4iLCIoZnVuY3Rpb24oKSB7XG5cbmxldCBpbnRlcnZhbElkO1xubGV0IHNvdW5kQ29udHJvbDtcbmxldCBkdXJhdGlvbkNvbnRyb2w7XG5cbmNvbnN0IHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvJyk7XG5jb25zdCBwbGF5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvX19wbGF5LWJ0bicpO1xuY29uc3QgcGxheUJ0bkIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW9fX2J0bi1wbGF5QicpO1xuY29uc3Qgc291bmRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW9fX3NvdW5kLWJ0bicpO1xuXG4vL3BsYXkvcGF1c2Ug0YHQvtCx0YvRgtC40Y8gKNC00LvRjyDQvNC+0LHQuNC70YzQvdGL0YUg0L/Qu9C10LXRgNC+0LIpXG52aWRlby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIGludmVydFZpZGVvQnRucyk7XG52aWRlby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgaW52ZXJ0VmlkZW9CdG5zKTtcblxuLy/QvdCw0LbQsNGC0LjQtSDQvdCwINC60LvRjtGH0LXQstGL0LUg0YLQvtGH0LrQuCDQstC40LTQtdC+XG52aWRlby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXlTdG9wKTtcbnBsYXlCdG5CLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheVN0b3ApO1xucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXlTdG9wKTtcblxuLy/QuNC30LzQtdC90LXQvdC40LUg0L/QvtC70LfRg9C90LrQsCDQv9GA0L7QuNCz0YDRi9Cy0LDQvdC40Y8g0LLQuNC00LXQvlxuZHVyYXRpb25Db250cm9sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R1cmF0aW9uTGV2ZWwnKTtcbmR1cmF0aW9uQ29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHNldFZpZGVvRHVyYXRpb24pO1xuXG5kdXJhdGlvbkNvbnRyb2wubWluID0gMDtcbnZpZGVvLm9ubG9hZGVkbWV0YWRhdGEgPSBmdW5jdGlvbigpIHtcbiAgZHVyYXRpb25Db250cm9sLm1heCA9IHZpZGVvLmR1cmF0aW9uICogMTAwMDtcbn07XG5kdXJhdGlvbkNvbnRyb2wudmFsdWUgPSAwO1xuXG4vL9C90LDQttCw0YLQuNC1INC60L3QvtC/0LrQuCDQstC60Lsv0LLRi9C60Lsg0LfQstGD0LrQsFxubGV0IG1pY0NvbnRyb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNvdW5kT2ZmL09uXCIpO1xubWljQ29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNvdW5kT2ZmKTtcblxuLy/QuNC30LzQtdC90LXQvdC40LUg0L/QvtC70LfRg9C90LrQsCDQt9Cy0YPQutCwXG5zb3VuZENvbnRyb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291bmQtbGV2ZWwnKTtcbnNvdW5kQ29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNoYW5nZVNvdW5kVm9sdW1lKTtcbnNvdW5kQ29udHJvbC5taW4gPSAwO1xuc291bmRDb250cm9sLm1heCA9IDEwO1xuXG4vL9C30L3QsNGH0LXQvdC40Y8g0LfQstGD0LrQsCDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxuc291bmRDb250cm9sLnZhbHVlID0gc291bmRDb250cm9sLm1heDtcbmxldCBzdGVwID0gc291bmRDb250cm9sLm1heCAvIDEwMDA7XG5sZXQgcGVyY2VudCA9IHZpZGVvLnZvbHVtZSAvIHN0ZXA7XG5zb3VuZENvbnRyb2wuc3R5bGUuYmFja2dyb3VuZCA9IGBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNFMDFGM0QgMCUsICNFMDFGM0QgJHtwZXJjZW50fSUsICM4Njg2ODYgJHtwZXJjZW50fSUpYDtcblxuLy8g0L/QtdGA0LXQvNC10L3QvdCw0Y8g0LTQu9GPINGF0YDQsNC90LXQvdC40Y8g0L/QvtGB0LvQtdC00L3QtdCz0L4g0YHQvtGB0YLQvtGP0L3QuNGPINGD0YDQvtCy0L3RjyDQt9Cy0YPQutCwXG5sZXQgc291bmRDb250cm9sQmZyID0gc291bmRDb250cm9sLnZhbHVlXG5cbi8v0L7QutC+0L3Rh9Cw0L3QuNC1INCy0LjQtNC10L5cbnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgZW5kT2ZWaWRlbyk7XG5cblxuXG5mdW5jdGlvbiBwbGF5U3RvcCgpIHtcblxuICBpZiAodmlkZW8ucGF1c2VkKSB7XG4gICAgdmlkZW8ucGxheSgpO1xuICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCh1cGRhdGVEdXJhdGlvbiwgMTApO1xuXG4gIH0gZWxzZSB7XG4gICAgdmlkZW8ucGF1c2UoKTtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGludmVydFZpZGVvQnRucygpIHtcbiAgcGxheUJ0bkIuY2xhc3NMaXN0LnRvZ2dsZShcInZpZGVvX19idG4tcGxheUItLWFjdGl2ZVwiKTtcbiAgcGxheUJ0bi5jbGFzc0xpc3QudG9nZ2xlKCd2aWRlb19fcGxheS1idG4tLWFjdGl2ZScpO1xufVxuXG5mdW5jdGlvbiBzZXRWaWRlb0R1cmF0aW9uKCkge1xuICB2aWRlby5jdXJyZW50VGltZSA9IGR1cmF0aW9uQ29udHJvbC52YWx1ZSAvIDEwMDA7XG4gIHVwZGF0ZUR1cmF0aW9uKCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUR1cmF0aW9uKCkge1xuICBkdXJhdGlvbkNvbnRyb2wudmFsdWUgPSB2aWRlby5jdXJyZW50VGltZSAqIDEwMDA7XG5cbiAgbGV0IHN0ZXAgPSB2aWRlby5kdXJhdGlvbiAvIDEwMDtcbiAgbGV0IHBlcmNlbnQgPSB2aWRlby5jdXJyZW50VGltZSAvIHN0ZXA7XG4gIGR1cmF0aW9uQ29udHJvbC5zdHlsZS5iYWNrZ3JvdW5kID0gYGxpbmVhci1ncmFkaWVudCg5MGRlZywgI0UwMUYzRCAwJSwgI0UwMUYzRCAke3BlcmNlbnR9JSwgIzg2ODY4NiAke3BlcmNlbnR9JSlgO1xufVxuXG5cbmZ1bmN0aW9uIHNvdW5kT2ZmKCkge1xuICBpZiAodmlkZW8udm9sdW1lID09PSAwKSB7XG4gICAgc291bmRDb250cm9sLnZhbHVlID0gc291bmRDb250cm9sQmZyO1xuICAgIC8vIE5vdCB3b3JraW5nIG9uIGlPUyAodmlkZW8udm9sdW1lIGlzIHJlYWQtb25seSBhbmQgYWx3YXlzID0xKVxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9saWJyYXJ5L2FyY2hpdmUvZG9jdW1lbnRhdGlvbi9BdWRpb1ZpZGVvL0NvbmNlcHR1YWwvVXNpbmdfSFRNTDVfQXVkaW9fVmlkZW8vRGV2aWNlLVNwZWNpZmljQ29uc2lkZXJhdGlvbnMvRGV2aWNlLVNwZWNpZmljQ29uc2lkZXJhdGlvbnMuaHRtbFxuICAgIHZpZGVvLnZvbHVtZSA9IHNvdW5kQ29udHJvbEJmciAvIDEwO1xuICAgIHNvdW5kQnRuLmNsYXNzTGlzdC50b2dnbGUoJ3ZpZGVvX19zb3VuZC1idG4tLWFjdGl2ZScpO1xuICAgIGxldCBzdGVwID0gc291bmRDb250cm9sLm1heCAvIDEwMDA7XG4gICAgbGV0IHBlcmNlbnQgPSB2aWRlby52b2x1bWUgLyBzdGVwO1xuICAgIHNvdW5kQ29udHJvbC5zdHlsZS5iYWNrZ3JvdW5kID0gYGxpbmVhci1ncmFkaWVudCg5MGRlZywgI0UwMUYzRCAwJSwgI0UwMUYzRCAke3BlcmNlbnR9JSwgIzg2ODY4NiAke3BlcmNlbnR9JSlgO1xuXG4gIH0gZWxzZSB7XG4gICAgc291bmRDb250cm9sQmZyID0gc291bmRDb250cm9sLnZhbHVlO1xuICAgIHZpZGVvLnZvbHVtZSA9IDA7XG4gICAgc291bmRDb250cm9sLnZhbHVlID0gMDtcbiAgICBzb3VuZEJ0bi5jbGFzc0xpc3QudG9nZ2xlKCd2aWRlb19fc291bmQtYnRuLS1hY3RpdmUnKTtcbiAgICBzb3VuZENvbnRyb2wuc3R5bGUuYmFja2dyb3VuZCA9IGAjODY4Njg2YDtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGFuZ2VTb3VuZFZvbHVtZSgpIHtcbiAgdmlkZW8udm9sdW1lID0gc291bmRDb250cm9sLnZhbHVlIC8gMTA7XG4gIGxldCBzdGVwID0gc291bmRDb250cm9sLm1heCAvIDEwMDA7XG4gIGxldCBwZXJjZW50ID0gdmlkZW8udm9sdW1lIC8gc3RlcDtcbiAgc291bmRDb250cm9sLnN0eWxlLmJhY2tncm91bmQgPSBgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjRTAxRjNEIDAlLCAjRTAxRjNEICR7cGVyY2VudH0lLCAjODY4Njg2ICR7cGVyY2VudH0lKWA7XG5cbiAgaWYgKHZpZGVvLnZvbHVtZSA9PSAwKSB7XG4gICAgc291bmRCdG4uY2xhc3NMaXN0LmFkZCgndmlkZW9fX3NvdW5kLWJ0bi0tYWN0aXZlJyk7XG4gIH0gZWxzZSB7XG4gICAgc291bmRCdG4uY2xhc3NMaXN0LnJlbW92ZSgndmlkZW9fX3NvdW5kLWJ0bi0tYWN0aXZlJyk7XG4gICAgbGV0IHN0ZXAgPSBzb3VuZENvbnRyb2wubWF4IC8gMTAwMDtcbiAgICBsZXQgcGVyY2VudCA9IHZpZGVvLnZvbHVtZSAvIHN0ZXA7XG4gICAgc291bmRDb250cm9sLnN0eWxlLmJhY2tncm91bmQgPSBgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjRTAxRjNEIDAlLCAjRTAxRjNEICR7cGVyY2VudH0lLCAjODY4Njg2ICR7cGVyY2VudH0lKWA7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5kT2ZWaWRlbygpIHtcbiAgdmlkZW8uY3VycmVudFRpbWUgPSAwO1xuICBkdXJhdGlvbkNvbnRyb2wudmFsdWUgPSAwO1xuICBkdXJhdGlvbkNvbnRyb2wuc3R5bGUuYmFja2dyb3VuZCA9IGAjODY4Njg2YDtcbiAgXG4gIHBsYXlCdG5CLmNsYXNzTGlzdC5yZW1vdmUoJ3ZpZGVvX19idG4tcGxheUItLWFjdGl2ZScpO1xuICBwbGF5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3ZpZGVvX19wbGF5LWJ0bi0tYWN0aXZlJyk7XG4gIHZpZGVvLmxvYWQoKTtcbn1cblxufSkoKTtcbiJdfQ==
