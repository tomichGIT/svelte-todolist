# TODOLIST Component
Componente en SVELTE de un todo List básico para aprender a implementar componentes svelte en tu sitio normal.

## Para crear un proyecto nuevo:

```js
pnpm create vite@latest
```

## Para cargarlo en github:

```js
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tomichGIT/svelte-todolist.git
git push -u origin main
```

## Tailwind
run `pnpm i -D tailwindcss postcss autoprefixer svelte-preprocess` in console, then `pnpx tailwindcss init`

```css (app.css)
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```js (tailwind.config.js)
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
```

## DaisyUI
run `pnpm i -D tailwindcss` in console

## FontAwesome
run `npm i -D @fortawesome/fontawesome-free` in console

import in your component:
```html
<style>
  @import '@fortawesome/fontawesome-free/css/all.css';
</style>
```

## Crear la Librería en NPM (compatible con PNPM)
run `pnpx svelte-kit package` 