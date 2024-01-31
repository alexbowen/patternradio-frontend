const ApiModel = class {

  constructor(params = {}) {
    this.params = params;
  }

  async request(url, responseType = 'json') {
    const response = await fetch(`${url}?${new URLSearchParams(this.params)}`);
    return await response[responseType]();
  }
};

export default ApiModel;
