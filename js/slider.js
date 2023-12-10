const AUTO_SCROLL_TIME = 3000;

const sliderContainer = document.querySelector('.slider')
const sliderElements = sliderContainer.querySelectorAll('.slider__item');
const leftButtonSliderElement = sliderContainer.querySelector('.slider__button--prev');
const rightButtonSliderElement = sliderContainer.querySelector('.slider__button--next');
const sliderPaginationElements = sliderContainer.querySelectorAll('.slider__pagination-item')

let currentSliderElement = 0;
let isEnabled = true;
let autoScrollIntervalId; // Переменная для хранения идентификатора интервала
let isPaused = false;

function changeCurrentSliderElement(scrollIndex) {
  currentSliderElement = (scrollIndex + sliderElements.length) % sliderElements.length;
}

function hideSliderElement(direction) {
  isEnabled = false;
  sliderElements[currentSliderElement].classList.add(direction);
  sliderElements[currentSliderElement].addEventListener('animationend', function() {
    this.classList.remove('slider__item--active', direction);
  });
}

function showSliderElement(direction) {
  sliderElements[currentSliderElement].classList.add('slider__item--next', direction);
  sliderElements[currentSliderElement].addEventListener('animationend', function() {
    this.classList.remove('slider__item--next', direction);
    this.classList.add('slider__item--active');
    isEnabled = true;
  });
}

function automaticSliderUpdate() {
  if (isEnabled) {
    autoScrollIntervalId = setInterval(() => nextSliderElement(currentSliderElement), AUTO_SCROLL_TIME)
  }
}

function shadePaginationLine() {
  sliderPaginationElements[currentSliderElement].classList.add('slider__pagination-item--active');
}

function stopShadePaginationLine() {
  sliderPaginationElements[currentSliderElement].classList.remove('slider__pagination-item--active');
}

function previousSliderElement(scrollIndex) {
  stopShadePaginationLine();
  hideSliderElement('to-right');
  changeCurrentSliderElement(scrollIndex - 1);
  showSliderElement('from-left');
  shadePaginationLine();
  // Сбрасываем интервал, если он был установлен
  if (autoScrollIntervalId) {
    clearInterval(autoScrollIntervalId);
    autoScrollIntervalId = setInterval(() => nextSliderElement(currentSliderElement), AUTO_SCROLL_TIME)
  }
}

function nextSliderElement(scrollIndex) {
  stopShadePaginationLine();
  hideSliderElement('to-left');
  changeCurrentSliderElement(scrollIndex + 1);
  showSliderElement('from-right');
  shadePaginationLine();
  // Сбрасываем интервал, если он был установлен
  if (autoScrollIntervalId) {
    clearInterval(autoScrollIntervalId);
    autoScrollIntervalId = setInterval(() => nextSliderElement(currentSliderElement), AUTO_SCROLL_TIME)
  }
}

const sliderButtonsActivation = () => {
  leftButtonSliderElement.addEventListener('click', function() {
    if (isEnabled) {
      previousSliderElement(currentSliderElement)
    }
  });

  rightButtonSliderElement.addEventListener('click', function() {
    if (isEnabled) {
      nextSliderElement(currentSliderElement)
    }
  });
};

const swipeDetect = (trackElement) => {
  const THRESHOLD = 150; // дистанция, ограничение минимальной длинны по X
  const RESTRAINT = 100; // дистанция, ограничение минимальной длинны по Y
  const ALLOWED_TIME = 300; // ограничитель по времени, за которое нужно успеть отпустить курсор/убрать палец

  const surface = trackElement;

  let startX = 0;
  let startY = 0;
  let distX = 0; // прошедшая дистанция
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0; // истекшее время

  surface.addEventListener('mousedown', function(evt) {
    evt.preventDefault();
    startX = evt.pageX;
    startY = evt.pageY;
    startTime = new Date().getTime();
  });

  surface.addEventListener('mouseup', function(evt) {
    evt.preventDefault();
    distX = evt.pageX - startX;
    distY = evt.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= ALLOWED_TIME) {
      if (Math.abs(distX) >= THRESHOLD && Math.abs(distY) <= RESTRAINT) {
        if (distX > 0) {
          if (isEnabled) {
            previousSliderElement(currentSliderElement)
          }
        } else {
          if (isEnabled) {
            nextSliderElement(currentSliderElement)
          }
        }
      }
    }
  });

  const isSliderButton = (evt) => {
    return (evt.target.classList.contains('slider__buttons-wrapper') ||
    evt.target.classList.contains('slider__button') ||
    evt.target.tagName === 'svg' ||
    evt.target.tagName === 'use')
  }

  surface.addEventListener('touchstart', function(evt) {
    evt.preventDefault();
    if (isSliderButton(evt)) {
      if (evt.target.classList.contains('slider__button--prev') || evt.target.classList.contains('slider__coffee-arrow-left-icon')) {
        if (isEnabled) {
          previousSliderElement(currentSliderElement);
        }
      } else if (evt.target.classList.contains('slider__button--next') || evt.target.classList.contains('slider__coffee-arrow-right-icon')) {
        if (isEnabled) {
          nextSliderElement(currentSliderElement);
        }
      }
    }

    const touchObject = evt.changedTouches[0];

    startX = touchObject.pageX;
    startY = touchObject.pageY;
    startTime = new Date().getTime();
  });

  surface.addEventListener('touchmove', function(evt) {
    evt.preventDefault();
  });

  surface.addEventListener('touchend', function(evt) {
    evt.preventDefault();
    const touchObject = evt.changedTouches[0];
    distX = touchObject.pageX - startX;
    distY = touchObject.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= ALLOWED_TIME) {
      if (Math.abs(distX) >= THRESHOLD && Math.abs(distY) <= RESTRAINT) {
        if (distX > 0) {
          if (isEnabled) {
            previousSliderElement(currentSliderElement);
          }
        } else {
          if (isEnabled) {
            nextSliderElement(currentSliderElement);
          }
        }
      }
    }
  });
};

let pauseTime = 0; // Переменная для хранения времени паузы
let resumeTime = 0; // Переменная для хранения времени возобновления
let elapsedPauseTime = 0; // Переменная для хранения времени паузы

function pauseShadePaginationLine() {
  let activeLine = document.querySelector('.slider__pagination-item--active .slider__pagination-line');
  activeLine.style.animationPlayState = 'paused';
  if (autoScrollIntervalId && !isPaused) {
    clearInterval(autoScrollIntervalId);
    isPaused = true;
    pauseTime = new Date().getTime(); // Сохраняем время паузы
    autoScrollIntervalId = null;
  }
}

function resumeShadePaginationLine() {
  // savedResumeTime = new Date().getTime();
  // let elapsedTime = savedResumeTime - savedPauseTime;
  let activeLine = document.querySelector('.slider__pagination-line');
  activeLine.style.animationPlayState = 'running';
  if (!autoScrollIntervalId && isPaused) {
    resumeTime = new Date().getTime(); // Получаем текущее время
    elapsedPauseTime = resumeTime - pauseTime; // Вычисляем пройденное время с момента паузы

    autoScrollIntervalId = setInterval(() => nextSliderElement(currentSliderElement), AUTO_SCROLL_TIME - elapsedPauseTime);
    isPaused = false;
  }
}



// Добавляем обработчики событий для элемента карусели при наведении и уходе курсора мыши
document.querySelector('.slider__item').addEventListener('mouseover', pauseShadePaginationLine);
document.querySelector('.slider__item').addEventListener('mouseout', resumeShadePaginationLine);

// Добавляем обработчики событий для касания элемента карусели
document.querySelector('.slider__item').addEventListener('touchstart', pauseShadePaginationLine);
document.querySelector('.slider__item').addEventListener('touchend', resumeShadePaginationLine);

const sliderActivation = () => {
  sliderButtonsActivation();
  swipeDetect(sliderContainer);
  automaticSliderUpdate();
};

export { sliderActivation };
