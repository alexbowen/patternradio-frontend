const Registry = class {

  registry = {};

  add(key, data) {
    this.registry[key] = data;
  }

  get(key, offset, limit) {
    return this.registry[key].slice(offset, offset + limit);
  }

  exists(key) {
    return !!this.registry[key];
  }
};

export default Registry;
