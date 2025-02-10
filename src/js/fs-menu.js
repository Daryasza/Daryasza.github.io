// FULLSCREEN MENU
// The logic for navigating from a link to the corresponding section of the page 
// is written in the file one-page-scroll.js and retrieved via data attributes in HTML.
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
