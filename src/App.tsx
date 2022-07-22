import React from 'react'
import './css/style.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
