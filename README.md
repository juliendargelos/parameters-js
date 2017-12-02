# Parameters JS 🎚

Simply manage url parameters.

## Install

```
npm install parameters-js
```

## Usage

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
```

## Parameters
**Kind**: global class  

* [Parameters](#Parameters)
    * [new Parameters(...parameters)](#new_Parameters_new)
    * [.keys](#Parameters+keys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.flattened](#Parameters+flattened)
    * [.string](#Parameters+string) ⇒ <code>string</code>
    * [.inputs](#Parameters+inputs) ⇒ <code>FragmentDocument</code> \| <code>NodeList</code> \| <code>Array</code>
    * [.formData](#Parameters+formData) ⇒ <code>FormData</code>
    * [.form](#Parameters+form) ⇒ <code>HTMLFormElement</code> \| <code>Element</code>
    * [.json](#Parameters+json) ⇒ <code>string</code>
    * [.clone](#Parameters+clone) ⇒ [<code>Parameters</code>](#Parameters)
    * [.empty](#Parameters+empty) ⇒ <code>boolean</code>
    * [.any](#Parameters+any) ⇒ <code>boolean</code>
    * [.toString()](#Parameters+toString) ⇒ <code>string</code>
    * [.set(...parameters)](#Parameters+set) ⇒ [<code>Parameters</code>](#Parameters)
    * [.unset(...keys)](#Parameters+unset) ⇒ [<code>Parameters</code>](#Parameters)
    * [.reset()](#Parameters+reset) ⇒ [<code>Parameters</code>](#Parameters)
    * [.clear()](#Parameters+clear) ⇒ [<code>Parameters</code>](#Parameters)

### new Parameters(...parameters)
Create a Parameters object.


| Param | Type | Description |
| --- | --- | --- |
| ...parameters | <code>Object</code> | Same value as [set](#Parameters+set)'s parameters. |

### parameters.keys ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>Array.&lt;string&gt;</code> - The parameters keys.  
**Read only**: true  
### parameters.flattened
//@returns {{key: string, value: (string|number|boolean)?}[]} A flat array corresponding to the parameters.

**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
### parameters.string ⇒ <code>string</code>
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>string</code> - A string corresponding to the parameters, ready to be used in a url.  
### parameters.inputs ⇒ <code>FragmentDocument</code> \| <code>NodeList</code> \| <code>Array</code>
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>FragmentDocument</code> \| <code>NodeList</code> \| <code>Array</code> - A set of inputs corresponding the parameters.  
### parameters.formData ⇒ <code>FormData</code>
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>FormData</code> - A FormData corresponding to the parameters.  
**Read only**: true  
### parameters.form ⇒ <code>HTMLFormElement</code> \| <code>Element</code>
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>HTMLFormElement</code> \| <code>Element</code> - A Form corresponding to the parameters.  
### parameters.json ⇒ <code>string</code>
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>string</code> - A json string corresponding to the parameters.  
### parameters.clone ⇒ [<code>Parameters</code>](#Parameters)
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - A clone of the current parameters.  
**Read only**: true  
### parameters.empty ⇒ <code>boolean</code>
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>boolean</code> - True if no value different from null can be found in the parameters, false in the other case.  
**Read only**: true  
### parameters.any ⇒ <code>boolean</code>
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>boolean</code> - Opposite of [empty](#Parameters+empty)  
**Read only**: true  
### parameters.toString() ⇒ <code>string</code>
**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>string</code> - Value of [string](#Parameters+string)  
### parameters.set(...parameters) ⇒ [<code>Parameters</code>](#Parameters)
Set parameters.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself.  

| Param | Type | Description |
| --- | --- | --- |
| ...parameters | <code>Object</code> | The parameters to set. If string given the assumed value will be null. |

### parameters.unset(...keys) ⇒ [<code>Parameters</code>](#Parameters)
Unset parameters.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself.  

| Param | Type | Description |
| --- | --- | --- |
| ...keys | <code>Object</code> | The parameter keys to unset. |

### parameters.reset() ⇒ [<code>Parameters</code>](#Parameters)
Set all parameter values to null.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself  
### parameters.clear() ⇒ [<code>Parameters</code>](#Parameters)
Removes all the parameters.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself  
## indexCallback ⇒ <code>number</code>
Looks for the index of the given key and call callback if it was found.

**Kind**: global typedef  
**Returns**: <code>number</code> - The index of the given key if it exists, null in the other case.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The parameter key whose index your looking for |
| callback | [<code>indexCallback</code>](#indexCallback) | The function to call if an index has been found for this ket. |
| index | <code>number</code> | The index of the key. |

## haveCallback ⇒ <code>boolean</code>
Checks that the given key exists and call a callback if it exists.

**Kind**: global typedef  
**Returns**: <code>boolean</code> - True if the key exists, false in the other case.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The parameter key you want to check the existence. |
| callback | [<code>haveCallback</code>](#haveCallback) | The function to call if the key exists. |

## eachCallback ⇒ [<code>Parameters</code>](#Parameters) \| <code>boolean</code>
Iterates through parameters.

**Kind**: global typedef  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself.<code>boolean</code> - If strictly equal to false, will stop iterating.  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>eachCallback</code>](#eachCallback) | The function to call for each parameter. |
| key | <code>string</code> | The current key. |
| value |  | The current value. |

## mapCallback ⇒ [<code>Parameters</code>](#Parameters)
Iterates through parameters and replaces values.

**Kind**: global typedef  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself.The value that will replace the current value.  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>mapCallback</code>](#mapCallback) | The function to call for each parameter. |
| key | <code>string</code> | The current key. |
| value |  | The current value. |

## Typedefs

<dl>
<dt><a href="#indexCallback">indexCallback</a> ⇒ <code>number</code></dt>
<dd><p>Looks for the index of the given key and call callback if it was found.</p>
</dd>
<dt><a href="#haveCallback">haveCallback</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks that the given key exists and call a callback if it exists.</p>
</dd>
<dt><a href="#eachCallback">eachCallback</a> ⇒ <code><a href="#Parameters">Parameters</a></code> | <code>boolean</code></dt>
<dd><p>Iterates through parameters.</p>
</dd>
<dt><a href="#mapCallback">mapCallback</a> ⇒ <code><a href="#Parameters">Parameters</a></code></dt>
<dd><p>Iterates through parameters and replaces values.</p>
</dd>
</dl>

