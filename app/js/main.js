$(function() {

  // collapsed amenities by def
  $('.filter__list').each(function(i, item) {
    $(item).find('.filter__item:gt(5)').hide()
  });

  // collapse show amenities list
  $('.filter__title').on('click', function() {
    if ($(this).hasClass('filter__title--collapsed')) {
      $(this)
        .removeClass('filter__title--collapsed')
        .addClass('filter__title--shown')
        .parent().find('.filter__list > .filter__item').show()
    } else if ($(this).hasClass('filter__title--shown')) {
      $(this)
        .removeClass('filter__title--shown')
        .addClass('filter__title--collapsed')
        .parent().find('.filter__list > .filter__item:gt(5)').hide()
    }
  });

  // off category btn
  $('.filter__categories').find('.filter__title').off('click');

  // input filtering
  $('.search-input').on('keyup', function() {
    var $allItems = $('.filter__amenities').find('.filter__item');
    var val = $(this).val().toLowerCase();

    $allItems.each(function(i, item) {
      if ($(item).find('label').text().toLowerCase().indexOf(val) < 0) {
        $(item).hide();
      } else {
        $(item).show();
      }
    })
  });

  // tab click
  $('.results__tabs').on('click', '.results__tab', function() {
    var $resultsAccomods = $('.results__accomodations');
    var $resultsMap = $('.results__map');

    $(this)
      .siblings().removeClass('results__tab--active').end()
      .addClass('results__tab--active')

    if ($(this).data('title') === 'map') {
      $resultsAccomods.hide();
      $resultsMap.show();
    } else if ($(this).data('title') === 'accomodations') {
      $resultsMap.hide();
      $resultsAccomods.show();
    }
  });

});
