# Data Table

A [Vue 3](https://vuejs.org/) table to analyze CSV data.

It uses PrimeVue's [DataTable](https://primevue.org/datatable/).

The `Format` column tries to give a hint about the meaning of the data in the column based on [`validator.js`](https://github.com/validatorjs/validator.js).  
Since the result is not very convincing, a better approach might be to use custom code and only give a hint if a treshold of the values in a given column conform.

## Pre-requisites

## Development

The project structure is based on the [`primevue-quickstart-create-vue` template](https://github.com/primefaces/primevue-examples/tree/main/vite-quickstart).

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
