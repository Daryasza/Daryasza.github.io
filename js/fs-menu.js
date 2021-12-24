//ПОЛНОЭКРАННОЕ МЕНЮ 
//Логика перехода от ссылки к нужной секции страницы прописана в файле one-page-scroll.js и подтянута через data-атрибуты html.

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