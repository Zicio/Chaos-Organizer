export default class Dom {
  static start(name) {
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
    const chat = document.querySelector('.chat');
    welcomeText.textContent = name;
    welcome.classList.add('active');
    Dom.showChat(welcome, chat, name);
  }

  static showChat(welcome, chat) {
    welcome.addEventListener('animationend', () => {
      welcome.style.display = 'none';
      chat.style.display = 'grid';
    });
    const list = chat.querySelector('.users__list');
    const user = document.createElement('li');
    user.classList.add('list__card');
    user.textContent = '✯You';
    list.append(user);
  }
}
