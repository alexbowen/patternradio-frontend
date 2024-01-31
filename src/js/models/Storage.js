export const getItem = (name, supported, ms) => {
  console.log('real gi')
  if (supported) {
    return localStorage.getItem(name);
  }
  if (ms.hasOwn(name)) {
    return ms[name];
  }
  return null;
}

const Storage = class {
  inMemoryStorage = {};

  constructor() {
    try {
      const testKey = '__storage_support_test_key__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      this.isSupported = true;
    } catch (e) {
      this.isSupported = false;
    }
  }

  clear() {
    if (this.isSupported) {
      localStorage.clear();
    } else {
      this.inMemoryStorage = {};
    }
  }

  getItem(name) {
    return getItem(name, this.isSupported, this.inMemoryStorage);
  }

  key(index) {
    if (this.isSupported) {
      return localStorage(index);
    } else {
      return Object.keys(this.inMemoryStorage)[index] || null;
    }
  }

  removeItem(name) {
    if (this.isSupported) {
      localStorage.removeItem(name);
    } else {
      delete this.inMemoryStorage[name];
    }
  }

  setItem(name, value) {
    if (this.isSupported) {
      localStorage.setItem(name, value);
    } else {
      this.inMemoryStorage[name] = value;
    }
  }

  length() {
    if (this.isSupported) {
      return localStorage.length;
    } else {
      return Object.keys(this.inMemoryStorage).length;
    }
  }
};

export default Storage;
