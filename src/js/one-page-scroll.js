(function() {

const section = $('.section');
const maincontent = $('.maincontent');
const sideBar = $('.sidebar');
const sideBarItem = sideBar.find('.sidebar__item');

section.first().addClass('active');
let inMove = false;

const scrollFunc = (sectionNumber) => {
  const newPosition = countSectionPosition(sectionNumber);
  const sectionTransitionTime = 700;
  const mouseInertiaTime = 300;

  if (inMove) return;
  inMove = true;

  maincontent.css({ 
    transform: `translateY(${newPosition}%)`
  });
  resetActiveClassForItem(section, sectionNumber, 'active');
  changeSidebarColor(sectionNumber);

  setTimeout(() => {
    inMove = false
    resetActiveClassForItem(sideBarItem, sectionNumber, 'sidebar__item--active');

  }, sectionTransitionTime + mouseInertiaTime);    
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
})();








