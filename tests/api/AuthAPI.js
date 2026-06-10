export class AuthAPI {

  constructor(request) {
    this.request = request;
  }

  async getToken() {

    const response = await this.request.post(`${process.env.API_URL}/users/login`, {
      data: {
        email: process.env.CUSTOMER_EMAIL,
        password: process.env.CUSTOMER_PASSWORD
      }
    });

    if (!response.ok()) {
      throw new Error(`Login failed: ${response.status()}`);
    }

    const body = await response.json();

    return body.access_token;
  }

}