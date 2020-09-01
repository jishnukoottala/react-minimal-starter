## Webpack basics setup

- First create your workspace
- create 3 new folders src ,dist and config
- src files corresponds to the source

First install webpack, webpack cli and webpack-dev-server

```sh
 npm i webpack webpack-cli webpack-dev-server -D
```

Create a new config file webpack.dev.js

```js
const path = require("path");

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
};
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
document.getElementById("app").innerHTML = `<h1>hello world </h1>`;
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
import "./styles.css";
```

now when we restart the dev server, it will throw an error, because we need an appropriate loader to handle css files

```sh
npm i  style-loader css-loader -D
```

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
