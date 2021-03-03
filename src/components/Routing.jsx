import React from 'react';
import '../App.css';
import {Router,Route,Switch,Redirect} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Feed from './Pages/Feed/Index'
import NotFound from './Pages/NotFound'
import Header from './composants/Header'
import Dashboard from './Pages/Dashboard'
import Profil from './Pages/Utilisateur/Profil'
import UserList from './Pages/Utilisateur/UserList';
import RecipesList from './Pages/Recette/RecipesList'
import Cook from './Pages/Recette/Cook'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'
import Infos from './Pages/Utilisateur/Infos'


const customHistory = createBrowserHistory()

//Routing de l'application web
const Routing =()=> (
        <Router history={customHistory} >
            <Header/>
            <Switch>
                <Route component={Feed} path="/" exact />

                <Route path="/login" render={(props) => (<Login {...props} />)} />
                <Route path="/signup" render={(props) => (<Signup {...props} />)} />

                <Route component={Dashboard} path="/dashboard" exact />
                <Route component={RecipesList} path="/recipes" exact />
                <Route component={Cook} path="/cook" exact />
                <Route component={UserList} path="/users" exact />
                <Route component={Profil} path="/users/:id" exact />
                <Route component={Profil} path="/profil" exact />
                <Route component={Infos} path="/profil/infos/:id" exact />

                <Route component={NotFound} path='*'/>
            </Switch>
        </Router>
)
export default Routing
