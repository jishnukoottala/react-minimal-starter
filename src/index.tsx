import "./styles.css"
import React from "react"
import { render } from "react-dom"
import { App } from "./app/app"

const Application: React.FC = () => (
  <div>
    <App />
  </div>
)

render(<Application />, document.getElementById("app"))
