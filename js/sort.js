import { debounce } from './util.js';
import { renderCards } from './render-cards.js';

const RERENDER_DELAY = 500;

// Находим элемент-контейнер, куда будем добавлять сгенерированные по шаблону карточки
const cardsContainer = document.querySelector('.menu__products-list');

const filtersContainer = document.querySelector('.menu__navigation-list');
const coffeeFilterElement = filtersContainer.querySelector('#filter-coffee');
const teaFilterElement = filtersContainer.querySelector('#filter-tea');
const dessertFilterElement = filtersContainer.querySelector('#filter-dessert');

const Categories = {
  COFFEE: 'coffee',
  TEA: 'tea',
  DESSERT: 'dessert',
};

let currentFilterElement = coffeeFilterElement;

const sortCards = (cards) => {
  if (currentFilterElement === teaFilterElement) {
    renderCards(cards, cardsContainer, Categories.TEA);
    return;
  }

  if (currentFilterElement === dessertFilterElement) {
    renderCards(cards, cardsContainer, Categories.DESSERT);
    return;
  }

  if (currentFilterElement === coffeeFilterElement) {
    renderCards(cards, cardsContainer);
  }
};

const changeFilterElementState = (evt) => {
  currentFilterElement.classList.remove('menu__navigation-button--current');
  currentFilterElement = evt.target;
  currentFilterElement.classList.add('menu__navigation-button--current');
};

const activateFilterButtons = (cards) => {
  const debouncedSortCards = debounce(() => sortCards(cards), RERENDER_DELAY);
  const filterElementClickHandler = (evt) => {
    changeFilterElementState(evt); // было changeFilterElementState(evt, cards);
    debouncedSortCards();
  };

  coffeeFilterElement.addEventListener('click', filterElementClickHandler);
  teaFilterElement.addEventListener('click', filterElementClickHandler);
  dessertFilterElement.addEventListener('click', filterElementClickHandler);
};

export { activateFilterButtons };
