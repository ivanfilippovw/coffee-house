import { isEscapeKey } from './util.js';

const Categories = {
  COFFEE: 'coffee',
  TEA: 'tea',
  DESSERT: 'dessert',
};

// Находим тег body
const bodyElement = document.querySelector('body');

// Находим модальное окно, элемент куда будем добавлять данные
const cardModalBlock = document.querySelector('.modal');
// Находим элемент-кнопку закрытия модального окна
const cardModalCloseElement = cardModalBlock.querySelector('.modal__close-button');

const hidePicture = () => {
  cardModalBlock.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onCardModalCloseElementClick = () => {
  hidePicture();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hidePicture();
  }
}

const renderPicture = ({ name, description, price, category }, id) => {
  const START_TEA_INDEX = 8;
  const START_DESSERT_INDEX = 12;
  let cardNumber = id;
  let imagePath;

  if (category === Categories.TEA) {
    cardNumber -= START_TEA_INDEX;
  } else if (category === Categories.DESSERT) {
    cardNumber -= START_DESSERT_INDEX;
  }

  imagePath = `assets/menu/${category}/${category}-${cardNumber}@1x.jpg`;
  cardModalBlock.querySelector('.modal__img-wrapper .modal__img').src = imagePath;

  cardModalBlock.querySelector('.modal__img-wrapper .modal__img').alt = name;
  cardModalBlock.querySelector('.modal__meta .modal__title').textContent = name;
  cardModalBlock.querySelector('.modal__text').textContent = description;
  cardModalBlock.querySelector('.modal__price-wrapper .modal__price-count').textContent = price;
};

const showModal = (data, id) => {
  cardModalBlock.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPicture(data, id);
};

cardModalCloseElement.addEventListener('click', onCardModalCloseElementClick);

export { showModal };
