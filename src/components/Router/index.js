import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux' 

import App from '../../layouts/App'
import Home from '../../views/Home'
import TVShow from '../../views/TVShow'
import TVShows from '../../views/TVShows'
import Movies from '../../views/Movies'
import NotFound from '../../views/NotFound'

const Router = ({history}) => (
    <ConnectedRouter history={history}>
        <App>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/movies/:id" component={TVShow} />
                <Route path="/movies" component={Movies} />
                <Route path="/tv-shows/:id" component={TVShow} />
                <Route path="/tv-shows" component={TVShows} />
                <Route component={NotFound} />
            </Switch>
        </App>
    </ConnectedRouter>
)

export default Router