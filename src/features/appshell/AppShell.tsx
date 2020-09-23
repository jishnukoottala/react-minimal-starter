import React from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"

export const AppShell: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="main" style={{ minHeight: "90vh" }}>
        {children}
      </div>
      <Footer />
    </div>
  )
}
