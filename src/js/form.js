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
