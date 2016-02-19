/* global reviews*/
'use strict';
(function() {
  // Прячется блок с фильтрами
  var filterBlock = document.querySelector('.reviews-filter');
  filterBlock.classList.add('invisible');

  var container = document.querySelector('.reviews-list');
  var template = document.querySelector('#review-template');

  /**
   * Шаблон заполняется данными и отрисовывается на странице.
   * P.S. Элемет ".review-rating" удалил, так как его на картинке в задании
   * нет, да и смотрится он кривовато, если его оставить и подставить значние.
   */
  reviews.forEach(function(data) {
    var element = template.content.children[0].cloneNode(true);
    var defaultImage = element.querySelector('.review-author');

    var image = new Image(124, 124);
    image.onload = function() {
      element.replaceChild(image, defaultImage);
      image.alt = data.author.name;
      image.className = 'review-author';
      image.title = data.author.name;
    };
    image.onerror = function() {
      defaultImage.alt = data.author.name;
      defaultImage.title = data.author.name;
      element.classList.add('review-load-failure');
    };
    image.src = data.author.picture;

    element.removeChild(element.querySelector('.review-rating'));
    element.querySelector('.review-text').textContent = data.description;

    container.appendChild(element);
  });

  // Показывается блок с фильтрами
  filterBlock.classList.remove('invisible');
})();
