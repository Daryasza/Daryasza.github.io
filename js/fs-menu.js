//ПОЛНОЭКРАННОЕ МЕНЮ 

const openFullscreenMenu = document.querySelector('#hamburger')
const closeFullscreenMenu = document.querySelector('#FSmenuClose');
const FullscreenMenu = document.querySelector('#FSmenu');

openFullscreenMenu.addEventListener('click', function(element){
  FullscreenMenu.style.display = 'block';
  document.body.style.overflow="hidden";


  closeFullscreenMenu.addEventListener('click', function(element){
  element.preventDefault();
  FullscreenMenu.style.display = 'none';
  document.body.style.overflow="scroll"
  });
});