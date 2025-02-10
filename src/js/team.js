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


