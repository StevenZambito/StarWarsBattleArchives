import React from 'react'
import './custom.scss'
import { SignIn } from './pages/SignIn'
import { Eras } from './pages/Eras'
import { Battle } from './pages/Battle'
import { Battles } from './pages/Battles'
import { CreateBattle } from './pages/CreateBattle'
import { Route, Switch } from 'react-router-dom'

export function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Eras />
        </Route>
        <Route exact path="/">
          <Battles />
        </Route>
        <Route exact path="/">
          <Battles />
        </Route>
        <Route exact path="/home">
          <Eras />
        </Route>
        <Route path="*">
          <p>Not Found</p>
        </Route>
      </Switch>
    </div>
  )
}
