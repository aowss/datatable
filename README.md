# Data Table

A [Vue 3](https://vuejs.org/) table to analyze CSV data.

It uses PrimeVue's [DataTable](https://primevue.org/datatable/).  

* A theme switcher is added as in [this example](https://primevue.org/datatable/#basic_filter).

* The tooltip on the `Type` column tries to give a hint about the meaning of the data in the column based on [`validator.js`](https://github.com/validatorjs/validator.js).  
Since the result is not very convincing, a better approach might be to use custom code and only give a hint if a treshold of the values in a given column conform.

## Pre-requisites

* [`npm`](https://docs.npmjs.com/cli/v10/commands/npm) as a package manager

## Development

The project structure is based on the [`primevue-quickstart-create-vue` template](https://github.com/primefaces/primevue-examples/tree/main/vite-quickstart).

We use [Husky](https://typicode.github.io/husky/) for pre-commit hooks.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Usage

The `Validation Code` column allows the user to enter a validation function.  

* The signature of that function is `async function(value: string): boolean`,
* The `value` parameter refers to the value held by a row for the given column,
* The type of the `value` parameter is based on the value specified in the `Type` column,
* The function returns a `boolean` specifying if the value is valid or not,
* The function is [`async`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) which allows the user to use the [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) keyword,

Here are sample validation functions to illustrate the points above:

* The function doesn't have to be asynchronous  
* The function returns a boolean  
* The `value` argument contains the value of the cell

```javascript
return typeof value === 'string' && value.startsWith('f1')
```

* The function doesn't have to be a single line

```javascript
const isString = typeof value === 'string'
const isF1 = value.startsWith('f1')
return isString && isF1
```

* The function can be asynchronous  

```javascript
return fetch('https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch', { mode: 'cors' })
    .then((response) => !response.ok)
    .catch((e) => true)
```

* The function can use `await`

```javascript
try {
	const response = await fetch('https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch', { mode: 'cors' })
	return false
} catch (e) {
	return true
}
```

The `Valid` column will be updated asynchronously with the result of evaluating this function for every single unique value ( See `Unique values` column ).
