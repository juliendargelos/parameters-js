# Parameters JS 🎚

Simply manage url parameters.

## Install

```
npm install parameters-js
```

## Usage

#### Basic

```javascript
var parameters = new Parameters();

parameters.post = 2;
parameters.string;
// => "post=2"

parameters.date = '10/12/1997';
parameters.string;
// => "post=2&date=10%2F12%2F1997"

parameters.authors = [
    {name: 'Marie', country: 'England'},
    {name: 'Marc', country: 'France'}
];
parameters.string;
// => "post=2&date=10%2F12%2F1997&authors[][name]=Marie&authors[][country]=England&authors[][name]=Marc&authors[][country]=France"

parameters.json;
// => '{
//       "post": 2,
//       "date": "10/12/1997",
//       "authors": [
//         {"name": "Marie", "country": "England"},
//         {"name": "Marc", "country": "France"}
//       ]
//     }'

parameters.inputs
// => DocumentFragment
//      <input type="hidden" name="post" value="2">
//      <input type="hidden" name="date" value="10/12/1997">
//      <input type="hidden" name="authors[][name]" value="Marie">
//      <input type="hidden" name="authors[][country]" value="England">
//      <input type="hidden" name="authors[][name]" value="Marc">
//      <input type="hidden" name="authors[][country]" value="France">

parameters.form
// => <form>
//      <input type="hidden" name="post" value="2">
//      <input type="hidden" name="date" value="10/12/1997">
//      <input type="hidden" name="authors[][name]" value="Marie">
//      <input type="hidden" name="authors[][country]" value="England">
//      <input type="hidden" name="authors[][name]" value="Marc">
//      <input type="hidden" name="authors[][country]" value="France">
//    </form>

parameters.formData
// => FormData
```

```javascript
"https://www.google.com?" + (new Parameters({q: 'keyword'}));
// => "https://www.google.com?q=keyword"
```

#### Parsing

```javascript
var parameters = new Parameters();
parameters.string = "post=2&date=10%2F12%2F1997&authors[][name]=Marie&authors[][country]=England&authors[][name]=Marc&authors[][country]=France";
parameters;
// => Parameters {
//      post: '2',
//      date: '10/12/1997',
//      authors: [
//        {name: 'Marie', country: 'England'},
//        {name: 'Marc', country: 'France'}
//      ]
//    }

parameters.json = '{"post": 2,"date": "10/12/1997","authors": [{"name": "Marie", "country": "England"},{"name": "Marc", "country": "France"}]}';
// => ...

parameters.inputs = document.querySelectorAll('form input');
parameters;
// <form>
//   <input type="email" name="user[email]" value="lucie@mail.com">
//   <input type="text" name="user[name]" value="Lucie">
//   <input type="number" name="user[age]" value="22">
//   <input type="checkbox" name="likes_coffee" checked>
// </form>
//
// => Parameters {
//      user: {
//        email: 'lucie@mail.com'
//        name: 'Lucie',
//        age: 22
//      },
//      likes_coffee: true

parameters.form = document.querySelector('form');
// => ...
```

## Constructor

The constructor take the same parameters as the [`set()`](#set--parameters) method and does the same thing.

## Instance properties

#### `keys` (Array)

An Array containing parameters keys:

```javascript
['post', 'date', 'authors']
```

---

#### `flattened` (Array)

A flat array of objects corresponding to the parameters:

```javascript
[
    {key: 'post',               value: 2},
    {key: 'date',               value: '10/12/1997'},
    {key: 'authors[][name]',    value: 'Marie'},
    {key: 'authors[][country]', value: 'England'},
    {key: 'authors[][name]',    value: 'Marc'},
    {key: 'authors[][country]', value: 'France'}
]
```

---

#### `string` (String)

A string corresponding to the parameters, ready to be used in a url:

```
"post=2&date=10%2F12%2F1997&authors[][name]=Marie&authors[][country]=England&authors[][name]=Marc&authors[][country]=France"
```

Null values or *deep* empty arrays/objects will be ignored.

*Note: By "deep" I mean which doesn't contain any scalar value, nested or not.*

---

#### `clone` (Parameters)

A new clone of the current Parameters object.

---

#### `empty` (Boolean)

True if no value different from null can be found in the parameters, false in the other case.

---

#### `any` (Boolean)

Opposite of `empty`.

---

#### `inputs` (DocumentFragment)

A set of inputs corresponding the parameters.

**Be careful:** Parameters with a value of type `File` will not be transformed into input type file because this is not possible. The usual `toString()` method will be called on it.

---

#### `form` (HTMLFormElement)

A form corresponding the parameters, containing [`inputs`](#inputs-documentfragement).

---

#### `formData` (FormData)

A FormData instance corresponding to the parameters. Here, `File` instance values will be handled.

---

#### `json` (String)

A JSON serialized string corresponding to the parameters.

## Instance methods

#### `toString()` → String

Same thing as getting the [`string`](#string-string) property.

**Parameters:** None

**Return value:**  The value of the [`string`](#string-string) property.

---

#### `unset()` → Parameters

Unset parameters from the object.

**Parameters:**
- `...keys` ([String]):
A list of parameters keys to unset.

**Return value:**  `this`

---

#### `index()` → Number|null

Returns the index of the given key in the object. And call the given callback if the index is not null.

**Parameters:**
- `key` (String):
The parameter key for which you want to get the index.

- `callback` (Function) *optional*:
The function you want to be called if the index is not null.

**Return value:** The index of the given key in the object.

---

#### `have()` → Boolean

Returns `true` if the object contains the given key, `false` in the other case, and call the given callback if the result is true.

**Parameters:**
 - `key` (String):
The parameter key you want to test.

- `callback` (Function) *optional*:
The function you want to be called if parameter exists.

**Return value:** `true` if the object contains the given key, `false` in the other case.

---

#### `each()` → Parameters

Iterate through parameters and call the given callback each time. It will stop if the callback strictly returns `false`.

**Parameters:**
- `callback` (Function):
The function you want to be called. For each parameter, a `key` and a `value` parameters will be passed. `key` is the key of the current parameter, `value` is its value.

**Return value:**  `this`

---

#### `map()` → Parameters

Iterate through parameters and call the given callback each time. The callback return will set the current parameter value.

**Parameters:**
- `callback` (Function):
The function you want to be called. For each parameter, a `key` and a `value` parameters will be passed. `key` is the key of the current parameter, `value` is its value. This callback return will set the value of the current parameter.

**Return value:**  `this`

---

#### `reset()` → Parameters

Set all parameter values to null.

**Parameters:** None

**Return value:**  `this`

---

#### `clear()` → Parameters

Remove all the parameters of the object.

**Parameters:** None

**Return value:**  `this`

## Static methods

#### `flatten()` → Parameters

Flatten a value (usually an Array or an Object) to an array.

**Parameters:**
- `object` (Any):
The value to flatten.

- `current` (String) *optional*:
The current key.

- `flattened` (Array) *optional*:
The flattened array.

**Return value:** The flattened array.

---

#### `key()` → String

Returns the key corresponding to the current key and the new key given.

**Parameters:**
- `current` (String) *optional*:
The current key.

- `key` (String) *optional*:
The new key.

**Return value:** The new key.
