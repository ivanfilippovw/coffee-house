
import './burger.js';
import { getData } from './api.js';
import { renderModal } from './render-modal.js'
import { activateFilterButtons } from './sort.js';

const bootstrap = async () => {
  const data = await getData();
  renderModal(data);
  activateFilterButtons(data);
};

bootstrap();
