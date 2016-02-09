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

  var labelText = document.querySelector('.review-fields-text');
  var labelName = document.querySelector('.review-fields-name');
  var labelContainer = document.querySelector('.review-fields');

  var formElement = document.forms['review-form'];
  var mark = formElement['review-mark'];
  var name = formElement['review-name'];
  var text = formElement['review-text'];
  var submit = formElement['review-submit'];
  validate();

  for (var i = 0; i < mark.length; i++) {
    mark[i].onclick = function() {
      validate('text');
    };
  }

  name.oninpute = function() {
    validate('name');
  };

  text.onchange = function() {
    validate('text');
  };

  function validate(fieldName) {
    switch (fieldName) {
      case 'name':
        if (name.value.trim().length === 0) {
          labelName.style.visibility = 'visible';
        } else {
          labelName.style.visibility = 'hidden';
        }
        break;

      case 'text':
        if (mark.value < 3) {
          if (text.value.trim().length === 0) {
            labelText.style.visibility = 'visible';
          } else {
            labelText.style.visibility = 'hidden';
          }
        } else {
          labelText.style.visibility = 'hidden';
        }
        break;
    }

    if (labelName.style.visibility === 'hidden' && labelText.style.visibility === 'hidden') {
      labelContainer.style.visibility = 'hidden';
      submit.removeAttribute('disabled');
    } else {
      labelContainer.style.visibility = 'visible';
      submit.setAttribute('disabled', 'disabled');
    }
  }
})();
