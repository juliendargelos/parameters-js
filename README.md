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
    * [.flattened](#Parameters+flattened) ⇒ [<code>Array.&lt;FlatParameter&gt;</code>](#FlatParameter)
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
    * [.index(key, callback)](#Parameters+index) ⇒ <code>number</code>
    * [.have(key, callback)](#Parameters+have) ⇒ <code>boolean</code>
    * [.each(callback)](#Parameters+each) ⇒ [<code>Parameters</code>](#Parameters)
    * [.map(callback)](#Parameters+map) ⇒ [<code>Parameters</code>](#Parameters)
    * [.reset()](#Parameters+reset) ⇒ [<code>Parameters</code>](#Parameters)
    * [.clear()](#Parameters+clear) ⇒ [<code>Parameters</code>](#Parameters)

### new Parameters(...parameters)
Create a [Parameters](#Parameters) object.


| Param | Type | Description |
| --- | --- | --- |
| ...parameters | <code>Object</code> | Same value as [set](#Parameters+set)'s parameters. |

### parameters.keys ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>Array.&lt;string&gt;</code> - The parameters keys.  
**Read only**: true  
### parameters.flattened ⇒ [<code>Array.&lt;FlatParameter&gt;</code>](#FlatParameter)
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Array.&lt;FlatParameter&gt;</code>](#FlatParameter) - A flat array corresponding to the parameters.  
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
**Returns**: <code>boolean</code> - <code>true</code> if no value different from <code>null</code> can be found in the parameters, <code>false</code> in the other case.  
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
| ...parameters | <code>string</code> \| <code>Object</code> | The parameters to set. If string given the assumed value will be <code>null</code>. |

### parameters.unset(...keys) ⇒ [<code>Parameters</code>](#Parameters)
Unset parameters.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself.  

| Param | Type | Description |
| --- | --- | --- |
| ...keys | <code>Object</code> | The parameter keys to unset. |

### parameters.index(key, callback) ⇒ <code>number</code>
Looks for the index of the given key and call callback if it was found.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>number</code> - The index of the given key if it exists, null in the other case.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The parameter key whose index your looking for |
| callback | [<code>indexCallback</code>](#indexCallback) | The function to call if an index has been found for this ket. |

### parameters.have(key, callback) ⇒ <code>boolean</code>
Checks that the given key exists and call a callback if it exists.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>boolean</code> - <code>true</code> if the key exists, false in the other case.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The parameter key you want to check the existence. |
| callback | [<code>haveCallback</code>](#haveCallback) | The function to call if the key exists. |

### parameters.each(callback) ⇒ [<code>Parameters</code>](#Parameters)
Iterates through parameters.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself.  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>eachCallback</code>](#eachCallback) | The function to call for each parameter. |

### parameters.map(callback) ⇒ [<code>Parameters</code>](#Parameters)
Iterates through parameters and replaces values.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself.  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>mapCallback</code>](#mapCallback) | The function to call for each parameter. |

### parameters.reset() ⇒ [<code>Parameters</code>](#Parameters)
Set all parameter values to <code>null</code>.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself  
### parameters.clear() ⇒ [<code>Parameters</code>](#Parameters)
Removes all the parameters.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself  
## FlatParameter : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The flattened key of the parameter. |
| value | <code>string</code> \| <code>number</code> \| <code>boolean</code> | The value of the parameter |

## indexCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the key. |

## haveCallback : <code>function</code>
**Kind**: global typedef  
## eachCallback ⇒ <code>boolean</code>
**Kind**: global typedef  
**Returns**: <code>boolean</code> - If strictly equal to <code>false</code>, will stop iterating.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The current key. |
| value |  | The current value. |

## mapCallback ⇒
**Kind**: global typedef  
**Returns**: The value that will replace the current value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The current key. |
| value |  | The current value. |

## Typedefs

<dl>
<dt><a href="#FlatParameter">FlatParameter</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#indexCallback">indexCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#haveCallback">haveCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#eachCallback">eachCallback</a> ⇒ <code>boolean</code></dt>
<dd></dd>
<dt><a href="#mapCallback">mapCallback</a> ⇒</dt>
<dd></dd>
</dl>

