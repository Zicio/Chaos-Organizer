export default class Dom {
  static showPopup(name) {
    const popup = document.querySelector('.popup');
    popup.classList.add('close');
    popup.addEventListener('transitionend', () => {
      popup.style.display = 'none';
    });
    Dom.showWelcome(name);
  }

  static showWelcome(name) {
    const welcome = document.querySelector('.welcome');
    const welcomeText = welcome.querySelector('tspan');
    welcomeText.textContent = name;
    welcome.classList.add('active');
  }
}
