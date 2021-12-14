//ПОЛНОЭКРАННОЕ МЕНЮ 

const openFullscreenMenu = document.querySelector('#hamburger')
const closeFullscreenMenu = document.querySelector('#FSmenuClose');
const FullscreenMenu = document.querySelector('#FSmenu');

openFullscreenMenu.addEventListener('click', function(element){
  FullscreenMenu.style.display = 'block';

  closeFullscreenMenu.addEventListener('click', function(element){
  element.preventDefault();
  FullscreenMenu.style.display = 'none';
  });
});

// ФОРМА

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
const successMessage = createModal('Сообщение отправлено'); 

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
    sectionForm.removeChild(overlay);
    });

    overlay.addEventListener('click', function(element) {
      if (element.target === overlay) {
        close.click();
      }
    })
  return overlay;
}


form.addEventListener('submit', e => {
  e.preventDefault();

  const input = {
    name: form.elements.name,
    phone: form.elements.phone,
    comment: form.comment,
  }

  if (validateForm(input)) {
    
    sectionForm.appendChild(successMessage);
    form.reset();

  } else {
    console.log('нет');
  }
});

// СЛАЙДЕР 

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




  



 
