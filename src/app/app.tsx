import React from "react"

export const App: React.FC = () => {
  const [st, setSt] = React.useState("new")
  return (
    <div>
      <h1>Hello World</h1>
      state is {st}
    </div>
  )
}
