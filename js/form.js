// global docCookies
'use strict';
(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  // Форма и поля ввода
  var formElement = document.forms['review-form'];
  var mark = formElement['review-mark'];
  var name = formElement['review-name'];
  var text = formElement['review-text'];
  var submit = formElement['review-submit'];

  // html-элементы, сообщающие об ошибках
  var labelContainer = document.querySelector('.review-fields');
  var labelText = document.querySelector('.review-fields-text');
  var labelName = document.querySelector('.review-fields-name');

  // Установка начальных значений из cookies
  name.value = docCookies.getItem('name') || '';
  text.value = docCookies.getItem('text') || '';

  // Проверка на заполнение обязательных полей формы
  validate();

  for (var i = 0; i < mark.length; i++) {
    mark[i].onclick = function() {
      validate();
    };
  }

  name.oninput = function() {
    validate();
  };

  text.oninput = function() {
    validate();
  };

  formElement.onchange = function(evt) {
    evt.preventDefault();

    // получение количества дней, в течении которых будут существовать cookies
    var expirationDays = geNumberOfDaysBeforeExpiration();

    // запись в cookies значений формы
    docCookies.setItem('name', name.value, new Date() + expirationDays);
    docCookies.setItem('text', text.value, new Date() + expirationDays);

    formElement.onchange();
  };


  /**
   * Проверка на заполнение обязательных полей формы и
   * показ сообшения пользователю о необходимости их заполнить.
   */
  function validate() {
    // Проверка поля "Имя".
    // Показывается(прячется) сообщение об ошибке.
    if (name.value.trim().length === 0) {
      labelName.classList.remove('hide');
    } else {
      labelName.classList.add('hide');
    }

    // Проверка поля "Отзыв". Поле обязательно, если поле "Оценка" < 3.
    // Показывается(прячется) сообщение об ошибке.
    if (mark.value < 3) {
      if (text.value.trim().length === 0) {
        labelText.classList.remove('hide');
      } else {
        labelText.classList.add('hide');
      }
    } else {
      labelText.classList.add('hide');
    }

    // Показывается(прячется) контейнер для сообщений об ошибках
    if (labelName.classList.contains('hide') && labelText.classList.contains('hide')) {
      labelContainer.classList.add('hide');
      submit.removeAttribute('disabled');
    } else {
      labelContainer.classList.remove('hide');
      submit.setAttribute('disabled', 'disabled');
    }
  }

  /**
   * Получение количества дней, прошедших с ближайшего дня рождения
   */
  function geNumberOfDaysBeforeExpiration() {
    var currentDate = new Date();
    var birthday = new Date(currentDate.getFullYear(), 11, 23);

    /**
     * Если дня рождения в этом году еще не было, то берём
     * прошлогодний день рождения
     */
    if (currentDate - birthday < 0) {
      birthday = new Date(currentDate.getFullYear() - 1, 11, 23);
    }

    return (currentDate - birthday) / 1000 / 60 / 60 / 24;
  }
})();
