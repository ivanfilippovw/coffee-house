// Находим шаблон карточки и в шаблоне находим нужный элемент
const cardTemplate = document.querySelector('#card').content.querySelector('.card');

// Функция создания (клонирования) одной карточки по шаблону
const createCard = ({ name, description, price, category }, index) => {
  const card = cardTemplate.cloneNode(true);

  const START_TEA_INDEX = 8;
  const START_DESSERT_INDEX = 12
  let cardNumber = index + 1;

  card.dataset.cardId = cardNumber; // Используем индекс массива как идентификатор
  card.dataset.cardCategory = category;

  card.querySelector('.card__img').src = `assets/menu/${category}/${category}-${ category === 'tea' ? cardNumber -= START_TEA_INDEX :
  category === 'dessert' ? cardNumber -= START_DESSERT_INDEX :
  cardNumber}@1x.jpg`;

  card.querySelector('.card__img').alt = name;
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__text').textContent = description;
  card.querySelector('.card__price-count').textContent = price;

  return card;
};

// Функция создания фрагмента, наполнения фрагмента карточками и добавления наполненного фрагмента в элемент-контейнер
const renderCards = (data, container, categoryParam = 'coffee') => {
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

  container.append(fragment);
  console.log('Карты сгенерировались заново');
};

export { renderCards };
