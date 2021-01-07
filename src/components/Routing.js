import React from 'react';
import '../App.css';
import {Router,Route,Switch,Redirect} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Home from './Pages/Home'
import NotFound from './Pages/NotFound'



const customHistory = createBrowserHistory()

//Routing de l'application web
const Routing =()=> (
        <Router history={customHistory} >
            <Switch>
                <Route component={Home} path="/" exact />

                <Route component={NotFound} path='*'/>
            </Switch>
        </Router>
)
export default Routing
