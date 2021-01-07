import React from 'react';
import '../App.css';
import {Router,Route,Switch,Redirect} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Header from './composants/Header'



const customHistory = createBrowserHistory()

//Routing de l'application web
const Routing =()=> (
        <Router history={customHistory} >
            <Header/>
            <Switch>
                <Route component={Home} path="/" exact />
                <Route component={Home} path="/search" exact />
                <Route component={Home} path="/dashboard" exact />
                <Route component={Home} path="/recipes" exact />
                <Route component={Home} path="/cook" exact />
                <Route component={Home} path="/users" exact />
                <Route component={Home} path="/profil" exact />

                <Route component={NotFound} path='*'/>
            </Switch>
        </Router>
)
export default Routing
