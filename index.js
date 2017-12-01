class Parameters {
  constructor(...parameters) {
    this.set(...parameters);
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
      for(var key in object) {
        if(object.hasOwnProperty(key)) this.flatten(object[key], this.key(current, key), flattened);
      }
    }

    return flattened;
  }

  static key(current, key) {
    return current ? current + '[' + key + ']' : key;
  }

  get keys() {
    return Object.getOwnPropertyNames(this);
  }

  get flattened() {
    return this.constructor.flatten(this);
  }

  get string() {
    var parameters = [];

    this.flattened.forEach(parameter => {
      if(parameter.value !== null) parameters.push(parameter.key + '=' + encodeURIComponent(parameter.value));
    });

    return parameters.join('&');
  }

  get inputs() {
    var inputs = document.createDocumentFragment();

    this.flattened.forEach(parameter => {
      var input = document.createElement('input');
      var value = [null, undefined].includes(parameter.value) ? '' : parameter.value;
      input.type = 'hidden';
      input.name = parameter.key;
      input.setAttribute('value', value);
      inputs.value = value;

      inputs.appendChild(input);
    });

    return inputs;
  }

  set inputs(v) {
    if(v instanceof DocumentFragment) v = v.querySelector('input, textarea, select');
    Array.prototype.forEach.call(v, input => {

    });
  }

  get formData() {
    var formData = new FormData();
    this.flattened.forEach(parameter => formData.append(parameter.key, parameter.value));

    return formData;
  }

  set formData(v) {

  }

  get form() {
    var form = document.createElement('form');
    form.appendChild(this.inputs);

    return form;
  }

  set form(v) {
    try {
      this.inputs = v.querySelector('input, textarea, select');
    }
    catch(e) {
      throw e;
    }
  }

  get json() {
    return JSON.stringify(this);
  }

  set json(v) {
    try {
      this.set(JSON.parse(v));
    }
    catch(e) {
      throw e;
    }
  }

  get clone() {
    return new this.constructor(this);
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

  set(...parameters) {
    parameters.forEach(parameters => {
      if(typeof parameters === 'string') parameters = {[parameters]: null};
      if(typeof parameters === 'object' && parameters !== null) {
        for(var key in parameters) this[key] = parameters[key];
      }
    });

    return this;
  }

  unset(...keys) {
    keys.forEach(key => { this.index(key, index => delete this[key]) });

    return this;
  }

  index(key, callback) {
    var index = this.keys.indexOf(key);
    if(index === -1) index = null;
    if(typeof callback === 'function' && index !== null) callback.call(this, index);

    return index;
  }

  have(key, callback) {
    return this.keys.includes(key) && (callback.call(this) || true);
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
    this.unset(...this.keys);

    return this;
  }
}
