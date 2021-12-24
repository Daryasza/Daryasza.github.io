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

$('.slider__btn').click(e => e.preventDefault())

