import { renderCards } from './render-cards.js';

// Находим элемент-контейнер, куда будем добавлять сгенерированные по шаблону карточки
const cardsContainer = document.querySelector('.menu__products-list');

// Помещаем карточки в элемент-контейнер
const renderModal = (data) => {
  if (!data) {
    return;
  }

  renderCards(data, cardsContainer);

  // thumbnailsContainer.addEventListener('click', (evt) => {
  //   const thumbnail = evt.target.closest('[data-thumbnail-id]');

  //   if(!thumbnail) {
  //     return;
  //   }

  //   evt.preventDefault();

  //   const thumbnailId = +thumbnail.dataset.thumbnailId;
  //   const pictureData = pictures.find(({ id }) => id === thumbnailId);

  //   showPicture(pictureData);
  // });
};

export { renderModal };
