export default class Request {
  static async post(url, user) {
    const response = await fetch(`${url}login/`, {
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
}
