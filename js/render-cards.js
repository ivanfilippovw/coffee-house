const Categories = {
  COFFEE: 'coffee',
  TEA: 'tea',
  DESSERT: 'dessert',
};

const CARDS_COUNT_SHOW = 4;
let cardsCountShown = 0;

// Находим шаблон карточки и в шаблоне находим нужный элемент
const cardTemplate = document.querySelector('#card').content.querySelector('.card');

const loaderCardsElement = document.querySelector('.menu__button');

// Функция создания (клонирования) одной карточки по шаблону
const createCard = ({ name, description, price, category }, index) => {
  const card = cardTemplate.cloneNode(true);

  const START_TEA_INDEX = 8;
  const START_DESSERT_INDEX = 12
  let cardNumber = index + 1;

  card.dataset.cardId = cardNumber; // Используем индекс массива как идентификатор
  card.dataset.cardCategory = category;
  card.dataset.cardPrice = price;

  card.querySelector('.card__img').src = `assets/menu/${category}/${category}-${ category === Categories.TEA ? cardNumber -= START_TEA_INDEX :
  category === Categories.DESSERT ? cardNumber -= START_DESSERT_INDEX :
  cardNumber}@1x.jpg`;

  card.querySelector('.card__img').alt = name;
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__text').textContent = description;
  card.querySelector('.card__price-count').textContent = price;

  return card;
};

// Функция создания фрагмента, наполнения фрагмента карточками и добавления наполненного фрагмента в элемент-контейнер
const renderCards = (data, container, categoryParam = 'coffee') => {
  cardsCountShown = 0;
  cardsCountShown += CARDS_COUNT_SHOW;

  const cardsToRemove = document.querySelectorAll('.card');
  cardsToRemove.forEach((card) => {
    card.remove();
  });

  const fragment = document.createDocumentFragment();

  data.forEach((card, index) => {
    const { category } = card;
    const cardExemplar = createCard(card, index);
    if (category === categoryParam) {
      fragment.append(cardExemplar);
    }
  });

  const fragmentLength = fragment.childNodes.length;
  console.log(fragmentLength);

  fragment.childNodes.forEach((node, index) => {
    if (index >= cardsCountShown) {
      node.classList.add('card--hidden');
    }
  });

  if (cardsCountShown >= fragmentLength) {
    loaderCardsElement.classList.add('hidden');
    cardsCountShown = fragmentLength;
  } else {
    loaderCardsElement.classList.remove('hidden');
  }

  container.append(fragment);
  console.log('Карточки сгенерировались заново');
  console.log(`Показано карточек: ${cardsCountShown}`);
};

const loadCards = () => {
  const allCards = document.querySelectorAll('.card')
  allCards.forEach(card => {
    if (card.classList.contains('card--hidden')) {
      card.classList.remove('card--hidden');
    }
  });
  loaderCardsElement.classList.add('hidden');
  cardsCountShown += 4;
  console.log(`Показано карточек: ${cardsCountShown}`);
};

const onLoaderCardsElementClick = () => {
  loadCards();
};

loaderCardsElement.addEventListener('click', onLoaderCardsElementClick)

export { renderCards };
