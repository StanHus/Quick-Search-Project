import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
import NavBar from './components/NavBar'

ReactDOM.render(
  <React.StrictMode>
    <div className="container-navbar">
      <NavBar />
    </div>
    <div className="container-app">
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
)
