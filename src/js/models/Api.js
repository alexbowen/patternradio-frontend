const Api = class {

  constructor(params = {}) {
    this.params = params;
  }

  async request (url, responseType = 'json') {
    const request = await fetch(`${url}?${new URLSearchParams(this.params)}`);
    return await request[responseType]();
  }
};

export default Api;
