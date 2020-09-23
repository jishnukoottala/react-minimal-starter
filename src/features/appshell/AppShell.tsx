import React from "react"
import { Header } from "Features/appshell/Header"
import { Footer } from "Features/appshell/Footer"

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
