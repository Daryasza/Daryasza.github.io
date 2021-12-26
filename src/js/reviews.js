(function() {

const findBlock = (target) => {
  return $('.review').filter((ndx, item) => {
    return $(item).attr('data-slide') === target;
  });
};

$('.interactive-avatar__link').click(e => {
  e.preventDefault();

  const currentLink = $(e.currentTarget);
  const targetReview = currentLink.attr('data-link');
  const slidetoShow = findBlock(targetReview);
  const currentAvatar = currentLink.closest('.interactive-avatar');

  slidetoShow.addClass('review--active').siblings().removeClass('review--active');
  currentAvatar.addClass('interactive-avatar--active').siblings().removeClass('interactive-avatar--active');
});
})();





