import Dom from './dom';

export default class Request {
  constructor() {
    this.url = new URL('http://localhost:7000/'); // 'https://zicio-chat0.herokuapp.com/'
    this.ws = null;
  }

  async post(user) {
    const response = await fetch(`${this.url}login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    }
    const error = await response.text();
    return error;
  }

  getWS() {
    const { url } = this;
    const host = url.href.replace(/^https/, 'wss'); // /^http/, 'ws'
    const ws = new WebSocket(host);
    this.ws = ws;
    this.ws.onopen = console.log('ONLINE');
    this.ws.onmessage = (response) => Request.responseHandler(JSON.parse(response.data));
  }

  firstSendWS(msg) {
    this.ws.onopen = () => this.ws.send(JSON.stringify(msg));
  }

  sendWS(msg) {
    this.ws.send(JSON.stringify(msg));
  }

  static responseHandler(response) {
    // Показ онлайн пользователей
    if (Object.prototype.hasOwnProperty.call(response, 'users')) {
      Dom.showUsers(response.users);
      Dom.showMessages(response.messages);
      return;
    }
    // Удаление оффлайн пользователя
    if (response.id) {
      Dom.deleteUserOffline(response);
      return;
    }
    // if (response[0].id) {
    //   Dom.showUsers(response);
    //   return;
    // }
    // Показ сообщений
    Dom.showMessages(response);
  }
}
