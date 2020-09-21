## Webpack React Typescript minimal starter setup from Scratch

### 1. Project Initialization - Create a Base setup with Webpack

Initialize the project with

```sh
 npm init
```

- First create your workspace
- create 3 new folders src ,dist and config
- src files corresponds to the source

Now install Basic development dependencies webpack, webpack cli and webpack-dev-server

```sh
 npm i webpack webpack-cli webpack-dev-server typescript -D
```

Create a new config file webpack.dev.js in config folder

```js
const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
  devServer: {
    port: 8081,
    contentBase: "dist",
  },
}
```

index.html in dist folder

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Webpack Basics</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

create index.js in src folder

```javascript
document.getElementById("app").innerHTML = `<h1>hello world </h1>`
```

now we create a script and place it in package.json

```json
 "scripts": {
    "start": "webpack-dev-server --config=config/webpack.dev.js"
  },
```

create a new file styles.css

```css
body {
  background-color: #dedede;
}
```

Now in index.js we import the stylesheet

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
npm i  style-loader css-loader -D
```

### 2. Extending the Base Setup, for React, Typescript

now we extend our webpack setup, we will add one more property module

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

Now when you restart the server, you will get the styles applied to your html

Wonder where this style goes? it gets injected to the html in the head tag.

Till now we have created a basic setup, now we add React as a dependency, and load appropriate compiler to compile react code. For that first add react and react-dom as a dependency

```sh
npm i  react react-dom
```

Install other dev dependencies

set 1 - webpack plugins

```sh
npm i  clean-webpack-plugin html-webpack-plugin copy-webpack-plugin -D
```

set 2 - babel, loaders

```sh
npm i  @babel/cli @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-plugin-transform-class-properties babel-loader source-map-loader url-loader @types/react @types/react-dom -D
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

TODO: Documentation

### 3. Linting - Eslint with Prettier

### 4. Commit Hooks with lint-staged
