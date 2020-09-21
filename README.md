# Webpack React Typescript minimal starter setup from Scratch

## 1. Project Initialization - Create a Base setup with Webpack

Initialize the project with

```sh

npm init

```

- First create your workspace

- create 3 new folders `src/` ,`dist/` and `config/`

- `src/` files corresponds to the source

Now install Basic development dependencies webpack, webpack cli and webpack-dev-server

[webpack](https://webpack.js.org/) is a bundling tool, used for bundling javascript files for browser usage.
webpack-dev-server - for running the application locally

```sh

npm i webpack webpack-cli webpack-dev-server typescript -D

```

Create a new config file `webpack.dev.js` in `config/` folder

```js
const path = require("path")
module.exports = {
  entry: "./src/index.js", // the main file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
  devServer: {
    port: 8081, // which port to open in localhost
    contentBase: "dist",
  },
}
```

`index.html` in `dist/` folder

```html
<!DOCTYPE html>

<html>
  <head>
    <title>Webpack React Typescript</title>
  </head>

  <body>
    <div id="app"></div>

    <script src="bundle.js"></script>
  </body>
</html>
```

create `index.js` in `src/` folder

```javascript
document.getElementById("app").innerHTML = `<h1>hello world </h1>`
```

now we create a script and place it in `package.json`
this when run will start the development server in the port 8081

```json

"scripts": {

"start": "webpack-dev-server --config=config/webpack.dev.js"

},

```

create a new file `styles.css` in src folder

```css
body {
  background-color: #dedede;
}
```

Now in `index.js` we import the stylesheet

```javascript
import "./styles.css"
```

Now in package.json

```json

"start": "webpack-dev-server --hot --config=config/webpack.dev.js --mode development",

```

It is now ready for us to test the development server setup

now when we start the dev server,

```sh

npm run start

```

it will throw an error, because we need an appropriate loader to handle css files

```sh

npm i style-loader css-loader -D

```

```javascript

module: {

rules: [

{

test: /\.css$/,

use: ["style-loader", "css-loader"],

},

],

},

```

Till here we have a working setup for basic HTML, Javascript and CSS. This setup can be used for basic sites bundling.

### 2. Extending the Base Setup, for React, Typescript

Our aim is to extend this base setup and make it more extensible for a production ready, react- typescript setup.

now we extend our webpack setup, we will add one more property module

Now when you restart the server, you will get the styles applied to your html

Wonder where this style goes? it gets injected to the html in the head tag.

Till now we have created a basic setup, now we add React as a dependency, and load appropriate compiler to compile react code. For that first add react and react-dom as a dependency

```sh

npm i react react-dom

```

Install other dev dependencies

set 1 - webpack plugins

```sh

npm i clean-webpack-plugin html-webpack-plugin copy-webpack-plugin -D

```

set 2 - babel, loaders

```sh

npm i @babel/cli @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-plugin-transform-class-properties babel-loader source-map-loader url-loader @types/react @types/react-dom -D

```

set 3 - react refresh for hot reloading capabilities [React-Refresh-Webpack-Plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)

```sh

npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh

```

set 4 - jest for testing

```sh

npm i jest @types/jest -D

```

Now copy index.html from the dist folder to src folder, we will set this as a template for the final html

create .babelrc

```javascript

{

"presets": ["@babel/preset-typescript", "@babel/preset-react", "@babel/preset-env"]

}



```

Now the final webpack.dev.js will be :

```javascript
const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

module.exports = (env, { mode }) => {
  const isDev = mode === "development"

  return {
    entry: "./src/index.tsx",

    output: {
      filename: "[name].[hash].js",

      path: path.resolve(__dirname, "../dist"),
    },

    devServer: {
      port: 8081,

      contentBase: "dist",
    },

    devtool: isDev && "cheap-eval-module-source-map",

    module: {
      rules: [
        {
          test: /\.(tsx|ts|js)?$/,

          exclude: /node_modules/,

          use: {
            loader: "babel-loader",

            options: {
              envName: mode,

              cacheDirectory: true,

              plugins: [isDev && require.resolve("react-refresh/babel")].filter(Boolean),
            },
          },
        },

        {
          test: /\.css$/,

          use: ["style-loader", "css-loader"],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: true, // Inject all files that are generated by webpack, e.g. bundle.js

        template: "./src/index.html",
      }),

      isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),

    resolve: {
      extensions: [".mjs", ".js", ".jsx", ".tsx", ".ts"],
    },
  }
}
```

### 3. Linting - Eslint with Prettier

ESLint supports both typescript and javascript, therefore for linting, we will use the eslint

```sh

npm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D

```

Adding prettier

```sh

npm i prettier eslint-config-prettier eslint-plugin-prettier -D



```

Create .eslintrc.js file at the root

```javascript
module.exports = {
  parser: "@typescript-eslint/parser",

  plugins: ["prettier", "react", "react-hooks", "jsx-a11y"],

  extends: [
    "plugin:react/recommended",

    "plugin:@typescript-eslint/recommended",

    "prettier/@typescript-eslint",

    "plugin:prettier/recommended",

    "plugin:import/errors",

    "plugin:import/warnings",

    "plugin:import/typescript",

    "plugin:jsx-a11y/recommended",

    "plugin:eslint-comments/recommended",
  ],

  parserOptions: {
    ecmaVersion: 6,

    sourceType: "module",
  },
}
```

Create prettier.config.js at the root of the folder

```javascript
module.exports = {
  jsxSingleQuote: false,

  printWidth: 120,

  semi: false,

  singleQuote: false,

  tabWidth: 2,

  trailingComma: "es5",
}
```

It is good to add a command in the package.json scripts that will run ESLint

```json

"lint": "eslint './src/**/*.{ts,tsx}' --fix"

```

[ESLint in Typescript Project](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project)

### 4. Commit Hooks with lint-staged

Linting makes the codebase less error prone, as it enforces a recommended code style, you may only need to lint files based on which you have performed a commit rather than running it on whole codebase, lint-staged is package that comes in handy for achieving this.

```sh

npx mrm lint-staged

```

this will add lint-staged and husky properties to your package.json

we can configure commads to run on pre-commit and pre-push

```json

"code-quality": "npm run lint --fix && npm run tsc"

```

the above command, when run will do the linting and also run the typescript, so it throws errors if it doesn't comply according to the reccommended eslint rules OR if it comes across any type errors

[Linst Staged](https://github.com/okonet/lint-staged)

TODO: Documentation

### 5. Test setup with Jest

> Written with [StackEdit](https://stackedit.io/).
