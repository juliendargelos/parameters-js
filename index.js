class Parameters {
  constructor(...parameters) {
    this.keys = [];
    this.define(...parameters);
  }

  static flatten(object, current, flattened) {
    if(!current) current = '';
    if(!flattened) flattened = [];

    if(['boolean', 'number', 'string'].includes(typeof object) || object === null) {
      flattened.push({key: current, value: object});
    }
    else if(Array.isArray(object)) {
      object.forEach(value => this.flatten(value, this.key(current, ''), flattened));
    }
    else if(typeof object === 'object') {
      for(var key in object) this.flatten(object[key], this.key(current, key), flattened);
    }

    return flattened;
  }

  static key(current, key) {
    return current ? current + '[' + key + ']' : key;
  }

  get flattened() {
    return this.constructor.flatten(this.object);
  }

  get string() {
    var parameters = [];

    this.flattened.forEach(parameter => {
      if(parameter.value !== null) parameters.push(parameter.key + '=' + encodeURIComponent(parameter.value));
    });

    return parameters.join('&');
  }

  get object() {
    var object = {};
    this.each((key, value) => { object[key] = value });

    return object;
  }

  get clone() {
    return new this.constructor(this.object);
  }

  get empty() {
    var empty = true;
    this.each((key, value) => {
      if(value !== null) empty = false;
    });

    return empty;
  }

  get any() {
    return !this.empty;
  }

  toString() {
    return this.string;
  }

  add(...parameters) {
    parameters.forEach(parameters => {
      if(typeof parameters === 'string') parameters = {[parameters]: null};
      if(typeof parameters === 'object' && parameters !== null) {
        for(var key in parameters) {
          if(!this.have(key)) {
            this.keys.push(key);
            this[key] = parameters[key];
          }
        }
      }
    });

    return this;
  }

  define(...parameters) {
    this.clear().add(...parameters);

    return this;
  }

  remove(...keys) {
    keys.forEach(key => {
      this.index(key, index => {
        this.keys.splice(index, 1);
        delete this[key];
      });
    });

    return this;
  }

  index(key, callback) {
    var index = this.keys.indexOf(key);
    if(index === -1) index = null;
    if(typeof callback === 'function' && index !== null) callback.call(this, index);

    return index;
  }

  have(key, callback) {
    return this.index(key, typeof callback === 'function' ? () => callback.call(this) : null) !== null;
  }

  each(callback) {
    this.keys.forEach(key => {
      if(callback.call(this, key, this[key]) === false) return false;
    });

    return this;
  }

  map(callback) {
    this.each((key, value) => { this[key] = callback.call(this, key, value) });

    return this;
  }

  reset() {
    this.map(() => null);

    return this;
  }

  clear() {
    this.remove(...this.keys);

    return this;
  }
}
