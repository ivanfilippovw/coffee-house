const sliderContainer = document.querySelector('.slider')
const sliderElements = sliderContainer.querySelectorAll('.slider__item');
const leftButtonSliderElement = sliderContainer.querySelector('.slider__button--prev');
const rightButtonSliderElement = sliderContainer.querySelector('.slider__button--next');
const sliderPaginationItemElements = sliderContainer.querySelectorAll('.slider__pagination-item')
const sliderPaginationLineElements = sliderContainer.querySelectorAll('.slider__pagination-line');

let currentSliderElement = 0;
let isEnabled = true;
// let currentPaginationLineNumber = 0;

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

function shadePaginationLine() {
  sliderPaginationItemElements[currentSliderElement].classList.add('slider__pagination-item--active');
}

function stopShadePaginationLine() {
  sliderPaginationItemElements[currentSliderElement].classList.remove('slider__pagination-item--active');
}

function previousSliderElement(scrollIndex) {
  // currentPaginationLineNumber--;
  stopShadePaginationLine();
  hideSliderElement('to-right');
  changeCurrentSliderElement(scrollIndex - 1);
  showSliderElement('from-left');
  shadePaginationLine();
}

function nextSliderElement(scrollIndex) {
  // console.log("NEXT", currentPaginationLineNumber);
  // if (currentPaginationLineNumber < 2) {
  //   currentPaginationLineNumber++;
  // } else {
  //   currentPaginationLineNumber = 0;
  // }
  stopShadePaginationLine();
  hideSliderElement('to-left');
  changeCurrentSliderElement(scrollIndex + 1);
  showSliderElement('from-right');
  shadePaginationLine();
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
      if (Math.abs(distY) > RESTRAINT) {
        window.scrollBy({ top: (-distY * 2), behavior: 'smooth' });
      }
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

const handleAnimationEnd = () => {
  nextSliderElement(currentSliderElement);
};

sliderPaginationLineElements.forEach((line) => {
  line.addEventListener("animationend", handleAnimationEnd);
});

function pauseShadePaginationLine() {
  let activeLine = sliderPaginationLineElements[currentSliderElement];
  activeLine.style.animationPlayState = 'paused';
}

function resumeShadePaginationLine() {
  let activeLine = sliderPaginationLineElements[currentSliderElement];
  activeLine.style.animationPlayState = 'running';
}

sliderElements.forEach((item) => {
  item.addEventListener('mouseover', pauseShadePaginationLine);
  item.addEventListener('mouseout', resumeShadePaginationLine);
});

sliderElements.forEach((item) => {
  item.addEventListener('touchstart', pauseShadePaginationLine);
  item.addEventListener('touchend', resumeShadePaginationLine);
});

const sliderActivation = () => {
  sliderButtonsActivation();
  swipeDetect(sliderContainer);
};

export { sliderActivation };
