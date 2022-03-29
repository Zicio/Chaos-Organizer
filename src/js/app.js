export default class App {
  constructor(element) {
    this.element = element;

    this.login();
  }

  login() {
    this.element.addEventListener('submit', (e) => App.clickHandler(e));
  }

  static clickHandler(e) {
    if (e.target.classList.contains('popup__form')) {
      App.checkForm(e);
    }
  }

  static checkForm(e) {
    e.preventDefault();
    const first = [...e.target.elements].find((o) => !o.validity.valid);
    if (!first) {
      // TODO Отправка формы на сервер
    }
  }
}

const app = new App(document);
