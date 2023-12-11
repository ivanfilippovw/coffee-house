// Находим шаблон карточки и в шаблоне находим нужный элемент
const cardTemplate = document.querySelector('#card').content.querySelector('.card');

// Функция создания (клонирования) одной карточки по шаблону
const createCard = ({ name, description, price, category }, index) => {
  const card = cardTemplate.cloneNode(true);

  const cardNumber = index + 1;

  card.dataset.cardId = cardNumber; // Используем индекс массива как идентификатор
  card.querySelector('.card__img').src = `assets/menu/${category}/${category}-${cardNumber}@1x.jpg`;
  card.querySelector('.card__img').alt = name;
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__text').textContent = description;
  card.querySelector('.card__price-count').textContent = price;

  return card;
};

// Функция создания фрагмента, наполнения фрагмента карточками и добавления наполненного фрагмента в элемент-контейнер
const renderCards = (data, container) => {
  const cardsToRemove = document.querySelectorAll('.card');
  cardsToRemove.forEach((card) => {
    card.remove();
  });

  const fragment = document.createDocumentFragment();

  data.forEach((card, index) => {
    const cardExemplar = createCard(card, index);
    fragment.append(cardExemplar);
  });

  container.append(fragment);
  console.log('h1');
};

export { renderCards };
