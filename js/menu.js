import { getData } from './api.js';
import { renderModal } from './render-modal.js'

const bootstrap = async () => {
  const data = await getData();
  console.log(data);
  renderModal(data);
};

bootstrap();
