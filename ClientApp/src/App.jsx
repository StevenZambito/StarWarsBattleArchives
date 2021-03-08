import React from 'react'
import './custom.scss'
import { SignIn } from './pages/SignIn'
import { Route, Switch } from 'react-router-dom'

export function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        {/* <Route exact path="/home">
        <Home />
      </Route> */}
        <Route path="*">
          <p>Not Found</p>
        </Route>
      </Switch>
    </div>
  )
}
