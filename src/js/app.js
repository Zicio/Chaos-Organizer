import Request from './request';
import Dom from './dom';

export default class App {
  constructor(element) {
    this.element = element;
    this.url = new URL('http://localhost:7000/'); // 'https://zicio-chat0.herokuapp.com/'

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
      const result = await Request.post(this.url, user);
      console.log('RES ', result);
      if (result) {
        Dom.start(e.target.elements[0].value);

      }
    }
  }
}

const app = new App(document);
