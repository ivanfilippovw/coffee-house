const bodyElement = document.querySelector('body');

const REMOVE_MESSAGE_TIMEOUT = 5000;

let currentTypeMessage = null;

const isEscapeKey = (evt) => evt.key === 'Escape';

const hideMessage = (message) => {
  bodyElement.querySelector(`.${message}`).remove();
  document.body.removeEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  if (message === 'error') {
    showModal();
  }
};

function onBodyClick(evt) {
  if (evt.target.closest(`.${currentTypeMessage}__inner`)) {
    return;
  }

  hideMessage(currentTypeMessage);
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage(currentTypeMessage);
  }
}

// Функция для создания элементов вывода сообщений при успешных действиях пользователя или ошибках
const showMessage = (typeResultMessage) => {
  currentTypeMessage = typeResultMessage;

  const template = document.querySelector(`#${typeResultMessage}`).content.querySelector(`.${typeResultMessage}`);
  const messageClone = template.cloneNode(true);
  bodyElement.append(messageClone);

  const message = document.querySelector(`.${typeResultMessage}`);

  if (typeResultMessage === 'data-error') {
    setTimeout(() => {
      message.remove();
    },
    REMOVE_MESSAGE_TIMEOUT);
    return;
  }

  const onCloseMessageElementClick = () => {
    hideMessage(typeResultMessage);
  };

  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);

  const closeMessageElement = message.querySelector(`.${typeResultMessage}__button`);
  closeMessageElement.addEventListener('click', onCloseMessageElementClick);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, showMessage, debounce };
