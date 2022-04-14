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
    welcome.classList.add('start');
    Dom.showChat(welcome, chat);
  }

  static showChat(welcome, chat) {
    welcome.addEventListener('animationend', () => {
      welcome.classList.remove('start');
      welcome.style.display = 'none';
      chat.style.display = 'grid';
    });
    const list = chat.querySelector('.users__list');
    const user = document.createElement('li');
    user.classList.add('list__card', 'you');
    user.textContent = '✯You';
    list.append(user);
  }

  static showMessages(messages, yourName) {
    const chatTape = document.querySelector('.chat__tape');
    for (const msg of messages) {
      const newMessage = Dom.setEl('li', 'chat__message');
      chatTape.appendChild(newMessage);
      const messageInfo = Dom.setEl('span', 'message__info');
      const you = document.querySelector('.you');
      if (msg.name === yourName) {
        messageInfo.textContent = 'You';
        messageInfo.dataset.myName = yourName;
      } else {
        messageInfo.textContent = msg.name;
      }
      // if (msg.name.includes(you.dataset.myName, 0)) {
      //   newMessage.classList.add('your-message');
      //   messageInfo.textContent = messageInfo.textContent.replace(you.dataset.myName, 'You');
      // }
      const messageText = Dom.setEl('span', 'message__text');
      messageText.textContent = `${msg.date} ${msg.text}`;
      newMessage.appendChild(messageInfo);
      newMessage.appendChild(messageText);
    }
  }

  static showHint(text) {
    const hint = document.querySelector('.form__hint');
    if (text) {
      hint.textContent = text;
      hint.style.display = 'block';
      return;
    }
    hint.style.display = null;
  }

  static setEl(type, ...selector) {
    const el = document.createElement(type);
    el.classList.add(...selector);
    return el;
  }
}
