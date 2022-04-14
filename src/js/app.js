import Request from './request';
import Dom from './dom';

export default class App {
  constructor(element) {
    this.element = element;
    this.request = new Request();

    this.login();
  }

  login() {
    this.element.addEventListener('submit', (e) => this.clickHandler(e));
  }

  clickHandler(e) {
    if (e.target.classList.contains('popup__form')) {
      this.checkForm(e);
    }
  }

  async checkForm(e) {
    e.preventDefault();
    const first = [...e.target.elements].find((o) => !o.validity.valid);
    if (!first) {
      const user = {
        nickname: e.target.elements[0].value,
        password: e.target.elements[1].value,
      };
      const result = await this.request.post(user);
      if (typeof result === 'object') {
        Dom.showHint();
        Dom.start(e.target.elements[0].value);
        Dom.showMessages(result, e.target.elements[0].value);
        // this.request.getWS();
      } else {
        Dom.showHint(result);
      }
    }
  }
}

const app = new App(document);
