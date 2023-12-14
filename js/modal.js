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
const cardModalContentBlock = document.querySelector('.modal__preview');
// Находим элемент-кнопку закрытия модального окна
const cardModalCloseElement = cardModalBlock.querySelector('.modal__close-button');
const cardModalFormElement = cardModalBlock.querySelector('.modal__form');
// Находим элементы,с которыми будем работать
const cardModalPriceElement = cardModalBlock.querySelector('.modal__price-count');
const cardModalInputElements = cardModalBlock.querySelectorAll('input');

const hideModal = () => {
  cardModalBlock.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cardModalFormElement.reset();
};

const onCardModalCloseElementClick = () => {
  hideModal();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
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

const updatePrice = (data) => {
  console.log('updatePriceс сработала');

  let totalPrice = parseFloat(data.price);
  console.log(totalPrice);

  setTimeout(() => {

    const checkedInputs = cardModalBlock.querySelectorAll("input:checked");

    for (let i = 0; i < checkedInputs.length; i++) {
      let current = parseFloat(checkedInputs[i].value);
      totalPrice += current;
    }

    // Обновляем значение в элементе .modal__price-count
    cardModalPriceElement.textContent = totalPrice.toFixed(2); // Форматируем до двух знаков после запятой
    console.log(totalPrice);
  }, 1);
};

const onCardModalInputElementsClick = (data) => {
  return () => {
    updatePrice(data);
  }
};

const onCardModalBlockOutsideClick = (event) => {
  // Если клик был выполнен вне модального окна, закрываем его
  if (!(cardModalContentBlock.contains(event.target))) {
    hideModal();
    console.log('клик был выполнен ВНЕ на дочернем элементе')
  }
};

const activateModalListeners = (data) => {
  cardModalInputElements.forEach(input => {
    input.addEventListener('click', onCardModalInputElementsClick(data));
  });
  cardModalCloseElement.addEventListener('click', onCardModalCloseElementClick);
  cardModalBlock.addEventListener('click', onCardModalBlockOutsideClick);
};

const showModal = (data, id) => {
  cardModalBlock.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPicture(data, id);
  activateModalListeners(data);
};

export { showModal };
