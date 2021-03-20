import React from 'react'
import './custom.scss'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Eras } from './pages/Eras'
import { Battle } from './pages/Battle'
import { Battles } from './pages/Battles'
import { CreateBattle } from './pages/CreateBattle'
import { UpdateBattle } from './pages/UpdateBattle'
import { Route, Switch } from 'react-router-dom'

export function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Eras />
        </Route>
        <Route exact path="/battles">
          <Battles />
        </Route>
        <Route exact path="/battle/:id">
          <Battle />
        </Route>
        <Route exact path="/create">
          <CreateBattle />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/battles/:id/update">
          <UpdateBattle />
        </Route>
        <Route path="*">
          <p>Not Found</p>
        </Route>
      </Switch>
    </div>
  )
}
