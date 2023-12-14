import { renderCards } from './render-cards.js';
import { showModal } from './modal.js';

// Находим элемент-контейнер, куда будем добавлять сгенерированные по шаблону карточки
const cardsContainer = document.querySelector('.menu__products-list');

// Помещаем карточки в элемент-контейнер
const renderModal = (data) => {
  if (!data) {
    return;
  }

  renderCards(data, cardsContainer);

  cardsContainer.addEventListener('click', (evt) => {
    const card = evt.target.closest('[data-card-id]');

    if(!card) {
      return;
    }

    evt.preventDefault();

    const cardId = +card.dataset.cardId;
    const cardData = data.find((element, index) => index === (cardId - 1));
    console.log(cardData)
    showModal(cardData, cardId);
  });
};

export { renderModal };
