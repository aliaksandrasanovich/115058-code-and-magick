'use strict';
(function() {
  var reviews = [];
  var activeFilter = 'reviews-all';
  getReviews();

  var filters = document.querySelectorAll('.reviews-filter input[name="reviews"]');
  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function(evt) {
      setActiveFilter(evt.target.id);
    };
  }

  /**
   * Загрузка списка отзывов
   */
  function getReviews() {
    var reviewElement = document.querySelector('.reviews');
    // Показываем прелоадер, пока идёт загрузке данных.
    reviewElement.classList.add('reviews-list-loading');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://o0.github.io/assets/json/reviews.json');
    xhr.onload = function(evt) {
      var loadedReviews = JSON.parse(evt.target.response);
      reviews = loadedReviews;
      renderReviews(loadedReviews);
      // Прячем прелоадер
      reviewElement.classList.remove('reviews-list-loading');
    };
    xhr.onerror = function() {
      // Прячем прелоадер
      reviewElement.classList.remove('reviews-list-loading');
      // Показываем сообщение об ошибке
      reviewElement.classList.add('reviews-load-failure');
    };
    xhr.send();
  }

  /**
   * Отрисовка списка отзывов на странице.
   * @param {Array} reviewsToRender
   */
  function renderReviews(reviewsToRender) {
    // Прячется блок с фильтрами
    var filterBlock = document.querySelector('.reviews-filter');
    filterBlock.classList.add('invisible');

    // Очищаем контейнер
    var container = document.querySelector('.reviews-list');
    container.innerHTML = '';

    var template = document.querySelector('#review-template');
    var docfragment = document.createDocumentFragment();
    /**
     * Шаблон заполняется данными. Созданные DOM-элементы с данными
     * помещаются в узел DocumentFragment.
     */
    reviewsToRender.forEach(function(data) {
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

      docfragment.appendChild(element);
    });

    // Все собранные в DocumentFragment DOM-элементы с данными помещаем на страницу.
    container.appendChild(docfragment);

    // Показывается блок с фильтрами
    filterBlock.classList.remove('invisible');
  }

  /**
   * Сортировка
   * @param {string} id
   */
  function setActiveFilter(id) {
    // Предотвращение повторной установки одного и того же фильтра
    if (activeFilter === id) {
      return;
    }
    // Устанавливаем текущий активный фильтр
    activeFilter = id;

    var filteredReviews = reviews.slice(0);

    switch (id) {
      case 'reviews-all':
        /**
         * Показывается не отфильтрованный список отзывов. В переменной
         * filteredReviews как раз и находится не отфильтрованный список.
         * Можно case и удалить, но тогда может возникнуть вопрос, а не
         * пропущена ли сортировка.
         */
        break;
      case 'reviews-recent':
        /**
         * Фильтруем список отзывов, оставленных за указанное количество дней
         * и сортируем по убыванию даты.
         */
        var days = 14;
        var filterDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() - days);
        filteredReviews = filteredReviews.filter(function(review) {
          return new Date(review.date) >= filterDate;
        });
        filteredReviews = filteredReviews.sort(function(a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        break;
      case 'reviews-good':
        /**
         * Фильтруем список отзывов, с рейтингом не ниже 3 и
         * сортируем по убыванию рейтинга.
         */
        filteredReviews = filteredReviews.filter(function(review) {
          return review.rating >= 3;
        });
        filteredReviews = filteredReviews.sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;
      case 'reviews-bad':
      /**
       * Фильтруем список отзывов, с рейтингом не выше 2 и
       * сортируем по возрастанию рейтинга.
       */
        filteredReviews = filteredReviews.filter(function(review) {
          return review.rating <= 2;
        });
        filteredReviews = filteredReviews.sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;
      case 'reviews-popular':
      /**
       * Сортируем список отзывов по убыванию оценки
       */
        filteredReviews = filteredReviews.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        break;
    }
    renderReviews(filteredReviews);
  }
})();
