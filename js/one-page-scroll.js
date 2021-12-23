const section = $('.section');
const maincontent = $('.maincontent');

section.first().addClass('active');

let inMove = false;

const scrollFunc = (sectionNumber) => {
  if (inMove === false) {
    inMove = true;

    const newPosition = sectionNumber * -100;
    const sideBar = $('.sidebar');
    const currentSection = section.eq(sectionNumber);
    const sideBarColor = currentSection.attr('data-sidebar-color');

    if (sideBarColor === 'grey') {

      console.log('да');
      sideBar.addClass('sidebar--color--grey')
    } else {
      console.log('нет');

      sideBar.removeClass('sidebar--color--grey')
    }
    maincontent.css({
    transform: `translateY(${newPosition}%)`
    });

    section
    .eq(sectionNumber)
    .addClass('active')
    .siblings()
    .removeClass('active');

    setTimeout(() => {
      inMove = false

      sideBar
      .find('.sidebar__item')
      .eq(sectionNumber)
      .addClass('sidebar__item--active')
      .siblings()
      .removeClass('sidebar__item--active');

    }, 900)
  }
}

const newPositionDetect = (direction) => {
  const activeSection = section.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === 'next' && nextSection.length) {
    scrollFunc(nextSection.index());
  }

  if (direction === 'prev' && prevSection.length) {
    scrollFunc(prevSection.index());
  }
}

$(window).on('wheel', (e) => {
  const deltaY = e.originalEvent.deltaY;
  
  if (deltaY > 0) {
    newPositionDetect('next');
  }

  if (deltaY < 0) {
    newPositionDetect('prev');
  }
})

$(window).on('keydown', (e) => {

  const tagName = e.target.tagName.toLowerCase();

  if (tagName !== "input" && tagName !== "textarea" ) {

    switch (e.keyCode) {
      case 40:
        newPositionDetect('next');
        break;

      case 38:
        newPositionDetect('prev');
        break;
    }
  }
})

$('[data-scroll-to]').click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const targetSection = $(`[data-section-id=${target}]`);

  scrollFunc(targetSection.index());
})





