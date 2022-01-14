import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Faq from './pages/Faq'
import About from './pages/About'
import Contact from './pages/Contact'
import Results from './pages/Results'
import Homepage from './pages/Homepage'
import reportWebVitals from './test/reportWebVitals'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/results/:query" element={<Results />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
