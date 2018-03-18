module.exports = class Parameters {

  /**
   * Create a {@link Parameters} object.
   * @param {...{(string|Object)}} parameters Same value as {@link Parameters#set}'s parameters.
   */
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

  /**
   * The parameters keys.
   * @readonly
   * @type {string[]}
   */
  get keys() {
    return Object.getOwnPropertyNames(this);
  }

  /**
   * @typedef {Object} FlatParameter
   * @property {string} key The flattened key of the parameter.
   * @property {(string|number|boolean)?} value The value of the parameter
   */

  /**
   * A flat array corresponding to the parameters. When set, the given flattened parameters array will be parsed to replace the current parameters.
   * @type {FlatParameter[]}
   */
  get flattened() {
    return this.constructor.flatten(this);
  }

  set flattened(v) {
    this.clear();

    v.forEach(parameter => {
      this.constructor.deepen(this, parameter.key, parameter.value);
    });
  }

  /**
   * A string corresponding to the parameters, ready to be used in a url.  When set, the given string will be parsed to replace the current parameters.
   * @type {string}
   */
  get string() {
    var parameters = [];

    this.flattened.forEach(parameter => {
      if(parameter.value !== null) parameters.push(parameter.key + '=' + encodeURIComponent(parameter.value));
    });

    return parameters.join('&');
  }

  set string(v) {
    this.flattened = (v + '').split('&').map(parameter => {
      parameter = parameter.split('=');
      return {key: parameter[0], value: parameter[1]};
    });
  }

  /**
   * A set of inputs corresponding the parameters. When set, the given inputs will be parsed to replace the current parameters.
   * @type {(FragmentDocument|NodeList|Array)}
   */
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

  /**
   * A FormData corresponding to the parameters.
   * @readonly
   * @type {FormData}
   */
  get formData() {
    var formData = new FormData();
    this.flattened.forEach(parameter => formData.append(parameter.key, parameter.value));

    return formData;
  }

  /**
   * A Form corresponding to the parameters. When set, the given form inputs be parsed to replace the current parameters.
   * @type {(HTMLFormElement|Element)}
   */
  get form() {
    var form = document.createElement('form');
    form.appendChild(this.inputs);

    return form;
  }

  set form(v) {
    try {
      this.inputs = v.querySelector('input, textarea, select');
      if(v.id) this.inputs = this.inputs.concat(Array.prototype.slice.call(document.querySelector('input[form="' + v.id + '"], textarea[form="' + v.id + '"], select[form="' + v.id + '"]')))
    }
    catch(e) {
      throw e;
    }
  }

  /**
   * A json string corresponding to the parameters.  When set, the given json string will be parsed to replace the current parameters.
   * @type {string}
   */
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

  /**
   * A clone of the current parameters.
   * @readonly
   * @type {Parameters}
   */
  get clone() {
    return new this.constructor(this);
  }

  /**
   * <code>true</code> if no value different from <code>null</code> can be found in the parameters, <code>false</code> in the other case.
   * @readonly
   * @type {boolean}
   */
  get empty() {
    var empty = true;
    this.each((key, value) => {
      if(value !== null) empty = false;
    });

    return empty;
  }

  /**
   * Opposite of {@link Parameters#empty}.
   * @readonly
   * @type {boolean}
   */
  get any() {
    return !this.empty;
  }

  /**
   * @returns {string} Value of {@link Parameters#string}
   */
  toString() {
    return this.string;
  }

  /**
   * Set parameters.
   * @param {...(string|Object)} parameters The parameters to set. If string given the assumed value will be <code>null</code>.
   * @returns {Parameters} Itself.
   */
  set(...parameters) {
    parameters.forEach(parameters => {
      if(typeof parameters === 'string') parameters = {[parameters]: null};
      if(typeof parameters === 'object' && parameters !== null) {
        for(var key in parameters) this[key] = parameters[key];
      }
    });

    return this;
  }

  /**
   * Unset parameters.
   * @param {...{(string)}} keys The parameter keys to unset.
   * @returns {Parameters} Itself.
   */
  unset(...keys) {
    keys.forEach(key => { this.index(key, index => delete this[key]) });

    return this;
  }

  /**
   * @callback indexCallback
   * @param {number} index The index of the key.
   */

  /**
   * Looks for the index of the given key and call callback if it was found.
   * @param {string} key The parameter key whose index your looking for
   * @param {indexCallback=} callback The function to call if an index has been found for this key.
   * @returns {number?} The index of the given key if it exists, null in the other case.
   */
  index(key, callback) {
    var index = this.keys.indexOf(key);
    if(index === -1) index = null;
    if(typeof callback === 'function' && index !== null) callback.call(this, index);

    return index;
  }

  /**
   * @callback haveCallback
   */

  /**
   * Checks that the given key exists and call a callback if it exists.
   * @param {string} key The parameter key you want to check the existence.
   * @param {haveCallback=} callback The function to call if the key exists.
   * @returns {boolean} <code>true</code> if the key exists, false in the other case.
   */
  have(key, callback) {
    return this.keys.includes(key) && (callback.call(this) || true);
  }

  /**
   * @callback eachCallback
   * @param {string} key The current key.
   * @param {*} value The current value.
   * @returns {boolean?} If strictly equal to <code>false</code>, will stop iterating.
   */

  /**
   * Iterates through parameters.
   * @param {eachCallback} callback The function to call for each parameter.
   * @returns {Parameters} Itself.
   */
  each(callback) {
    this.keys.forEach(key => {
      if(callback.call(this, key, this[key]) === false) return false;
    });

    return this;
  }

  /**
   * @callback mapCallback
   * @param {string} key The current key.
   * @param {*} value The current value.
   * @returns {*} The value that will replace the current value.
   */

  /**
   * Iterates through parameters and replaces values.
   * @param {mapCallback} callback The function to call for each parameter.
   * @returns {Parameters} Itself.
   */
  map(callback) {
    this.each((key, value) => { this[key] = callback.call(this, key, value) });

    return this;
  }

  /**
   * Set all parameter values to <code>null</code>.
   * @returns {Parameters} Itself
   */
  reset() {
    this.map(() => null);

    return this;
  }

  /**
   * Removes all the parameters.
   * @returns {Parameters} Itself
   */
  clear() {
    this.unset(...this.keys);

    return this;
  }
}
