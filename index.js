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

  static deepen(object, key, value) {
    var match = key.match(/^[\[\]]*([^\[\]]+)\]*/);
    var after = key.substring(match[0].length) || ''
    var key = match[1] || ''
    value = decodeURIComponent(value);

    if(key === '') return;

    if(after === '') object[key] = value;
    else if(after === '[]') {
      if(!object[key]) object[key] = [];
      object[key].push(value);
    }
    else {
      match = [after.match(/^\[\]\[([^\[\]]+)\]$/), after.match(/^\[\](.+)$/)].find(match => !!match);

      if(match) {
        var childKey = match[1];
        if(!object[key]) object[key] = [];

        var last = object[key].length - 1;
        if(last < 0) last = 0;

        if(typeof object[key][last] === 'object' && object[key][last] !== null && !Object.keys(object[key][last]).includes(childKey)) {
          this.deepen(object[key][last], childKey, value);
        }
        else object[key].push(this.deepen(new object.constructor(), childKey, value));
      }
      else {
        if(!object[key]) object[key] = new object.constructor();
        object[key] = this.deepen(object[key], after, value);
      }
    }

    return object;
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

  set flattened(v) {
    this.clear();

    v.forEach(parameter => {
      this.constructor.deepen(this, parameter.key, parameter.value);
    });
  }

  get string() {
    var parameters = [];

    this.flattened.forEach(parameter => {
      if(parameter.value !== null) parameters.push(parameter.key + '=' + encodeURIComponent(parameter.value));
    });

    return parameters.join('&');
  }

  set string(v) {
    this.flattened = v.split('&').map(parameter => {
      parameter = parameter.split('=');
      return {key: parameter[0], value: parameter[1]};
    });
  }

  get inputs() {
    var inputs = document.createDocumentFragment();

    this.flattened.forEach(parameter => {
      var input = document.createElement('input');
      var value = [null, undefined].includes(parameter.value) ? '' : parameter.value;
      input.name = parameter.key;

      if(typeof parameter.value === 'boolean') {
        input.type = 'checkbox';
        inputs.checked = value;
      }
      else {
        if(typeof parameter.value === 'number') input.type = 'number';
        else input.type = 'hidden';

        input.setAttribute('value', value);
        inputs.value = value;
      }

      inputs.appendChild(input);
    });

    return inputs;
  }

  set inputs(v) {
    if(v instanceof DocumentFragment) v = v.querySelector('input, textarea, select');
    this.flattened = Array.prototype.map.call(v, input => {
      var value;
      if(input.type === 'file') value = input.multiple ? input.files : input.files[0];
      else if(input.type === 'checkbox') value = input.checked;
      else if(input.type === 'number') value = parseFloat(input.value);
      else value = input.value;

      return {key: input.name, value: value};
    });
  }

  get formData() {
    var formData = new FormData();
    this.flattened.forEach(parameter => formData.append(parameter.key, parameter.value));

    return formData;
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
