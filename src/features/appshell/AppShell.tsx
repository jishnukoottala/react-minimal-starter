import React from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"

export const AppShell: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="main" style={{ minHeight: "100%" }}>
        {children}
      </div>
      <Footer />
    </div>
  )
}
