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
    })
  }
})
})();

