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

<a name="Parameters"></a>

## Parameters
**Kind**: global class  

* [Parameters](#Parameters)
    * [new Parameters(...parameters)](#new_Parameters_new)
    * [.keys](#Parameters+keys)
    * [.flattened](#Parameters+flattened)
    * [.string](#Parameters+string)
    * [.inputs](#Parameters+inputs)
    * [.formData](#Parameters+formData)
    * [.form](#Parameters+form)
    * [.json](#Parameters+json)
    * [.clone](#Parameters+clone) ⇒ [<code>Parameters</code>](#Parameters)
    * [.empty](#Parameters+empty)
    * [.any](#Parameters+any)
    * [.toString()](#Parameters+toString) ⇒ <code>string</code>
    * [.set(...parameters)](#Parameters+set) ⇒ [<code>Parameters</code>](#Parameters)
    * [.unset(...keys)](#Parameters+unset) ⇒ [<code>Parameters</code>](#Parameters)
    * [.index(key, [callback])](#Parameters+index) ⇒ <code>number</code>
    * [.have(key, [callback])](#Parameters+have) ⇒ <code>boolean</code>
    * [.each(callback)](#Parameters+each) ⇒ [<code>Parameters</code>](#Parameters)
    * [.map(callback)](#Parameters+map) ⇒ [<code>Parameters</code>](#Parameters)
    * [.reset()](#Parameters+reset) ⇒ [<code>Parameters</code>](#Parameters)
    * [.clear()](#Parameters+clear) ⇒ [<code>Parameters</code>](#Parameters)

<a name="new_Parameters_new"></a>

### new Parameters(...parameters)
Create a [Parameters](#Parameters) object.


| Param | Type | Description |
| --- | --- | --- |
| ...parameters | <code>Object</code> | Same value as [set](#Parameters+set)'s parameters. |

<a name="Parameters+keys"></a>

### parameters.keys
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| The | <code>Array.&lt;string&gt;</code> | parameters keys. |

<a name="Parameters+flattened"></a>

### parameters.flattened
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| A | [<code>Array.&lt;FlatParameter&gt;</code>](#FlatParameter) | flat array corresponding to the parameters. When set, the given flattened parameters array will be parsed to replace the current parameters. |

<a name="Parameters+string"></a>

### parameters.string
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| A | <code>string</code> | string corresponding to the parameters, ready to be used in a url.  When set, the given string will be parsed to replace the current parameters. |

<a name="Parameters+inputs"></a>

### parameters.inputs
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| A | <code>FragmentDocument</code> \| <code>NodeList</code> \| <code>Array</code> | set of inputs corresponding the parameters.  When set, the given inputs will be parsed to replace the current parameters. |

<a name="Parameters+formData"></a>

### parameters.formData
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| A | <code>FormData</code> | FormData corresponding to the parameters. |

<a name="Parameters+form"></a>

### parameters.form
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| A | <code>HTMLFormElement</code> \| <code>Element</code> | Form corresponding to the parameters. When set, the given form inputs be parsed to replace the current parameters. |

<a name="Parameters+json"></a>

### parameters.json
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| A | <code>string</code> | json string corresponding to the parameters.  When set, the given json string will be parsed to replace the current parameters. |

<a name="Parameters+clone"></a>

### parameters.clone ⇒ [<code>Parameters</code>](#Parameters)
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - A clone of the current parameters.  
**Read only**: true  
<a name="Parameters+empty"></a>

### parameters.empty
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| &lt;code&gt;true&lt;/code&gt; | <code>boolean</code> | if no value different from <code>null</code> can be found in the parameters, <code>false</code> in the other case. |

<a name="Parameters+any"></a>

### parameters.any
**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Opposite | <code>boolean</code> | of [empty](#Parameters+empty) |

<a name="Parameters+toString"></a>

### parameters.toString() ⇒ <code>string</code>
**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>string</code> - Value of [string](#Parameters+string)  
<a name="Parameters+set"></a>

### parameters.set(...parameters) ⇒ [<code>Parameters</code>](#Parameters)
Set parameters.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself.  

| Param | Type | Description |
| --- | --- | --- |
| ...parameters | <code>string</code> \| <code>Object</code> | The parameters to set. If string given the assumed value will be <code>null</code>. |

<a name="Parameters+unset"></a>

### parameters.unset(...keys) ⇒ [<code>Parameters</code>](#Parameters)
Unset parameters.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself.  

| Param | Type | Description |
| --- | --- | --- |
| ...keys | <code>Object</code> | The parameter keys to unset. |

<a name="Parameters+index"></a>

### parameters.index(key, [callback]) ⇒ <code>number</code>
Looks for the index of the given key and call callback if it was found.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>number</code> - The index of the given key if it exists, null in the other case.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The parameter key whose index your looking for |
| [callback] | [<code>indexCallback</code>](#indexCallback) | The function to call if an index has been found for this ket. |

<a name="Parameters+have"></a>

### parameters.have(key, [callback]) ⇒ <code>boolean</code>
Checks that the given key exists and call a callback if it exists.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>boolean</code> - <code>true</code> if the key exists, false in the other case.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The parameter key you want to check the existence. |
| [callback] | [<code>haveCallback</code>](#haveCallback) | The function to call if the key exists. |

<a name="Parameters+each"></a>

### parameters.each(callback) ⇒ [<code>Parameters</code>](#Parameters)
Iterates through parameters.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself.  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>eachCallback</code>](#eachCallback) | The function to call for each parameter. |

<a name="Parameters+map"></a>

### parameters.map(callback) ⇒ [<code>Parameters</code>](#Parameters)
Iterates through parameters and replaces values.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself.  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>mapCallback</code>](#mapCallback) | The function to call for each parameter. |

<a name="Parameters+reset"></a>

### parameters.reset() ⇒ [<code>Parameters</code>](#Parameters)
Set all parameter values to <code>null</code>.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself  
<a name="Parameters+clear"></a>

### parameters.clear() ⇒ [<code>Parameters</code>](#Parameters)
Removes all the parameters.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself  
<a name="FlatParameter"></a>

## FlatParameter : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The flattened key of the parameter. |
| value | <code>string</code> \| <code>number</code> \| <code>boolean</code> | The value of the parameter |

<a name="indexCallback"></a>

## indexCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the key. |

<a name="haveCallback"></a>

## haveCallback : <code>function</code>
**Kind**: global typedef  
<a name="eachCallback"></a>

## eachCallback ⇒ <code>boolean</code>
**Kind**: global typedef  
**Returns**: <code>boolean</code> - If strictly equal to <code>false</code>, will stop iterating.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The current key. |
| value | <code>\*</code> | The current value. |

<a name="mapCallback"></a>

## mapCallback ⇒ <code>\*</code>
**Kind**: global typedef  
**Returns**: <code>\*</code> - The value that will replace the current value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The current key. |
| value | <code>\*</code> | The current value. |

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
<dt><a href="#mapCallback">mapCallback</a> ⇒ <code>*</code></dt>
<dd></dd>
</dl>

