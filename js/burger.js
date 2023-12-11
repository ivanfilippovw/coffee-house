document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("hamburger__button").addEventListener("click", function() {
    document.querySelector("body").classList.toggle("open")
  })
})

window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
      document.querySelector(".page__body").classList.remove("open")
  }
});

document.getElementById("menu").addEventListener('click', event => {
  event._isClickWithInMenu = true;
});
document.getElementById("hamburger__button").addEventListener('click', event => {
  event._isClickWithInMenu = true;
});
document.body.addEventListener('click', event => {
  if (event._isClickWithInMenu) return;
  document.querySelector(".page__body").classList.remove("open")
});

document.querySelectorAll('.navigation__link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.page__body').classList.remove('open');
  });
});

document.querySelector('.menu-link').addEventListener('click', () => {
  document.querySelector('.page__body').classList.remove('open');
});
