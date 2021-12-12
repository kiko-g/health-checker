import React from "react"
import ReactDOM from "react-dom"
import Homepage from "./pages/Homepage"
import About from "./pages/About"
import Results from "./pages/Results"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import reportWebVitals from "./test/reportWebVitals"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/results/:query" element={<Results />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
