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