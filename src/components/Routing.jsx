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
import Result from './Pages/Feed/Result'
import MyRecipes from './Pages/Recette/MyRecipes'
import MyFeed from './Pages/Feed/MyFeed'
import Creation from './Pages/Recette/Creation'
import Visualisation from './Pages/Recette/Visualisation'
import Edition from './Pages/Recette/Edition'
import Support from './Pages/Support'

import PrivateRoute from './SpecialRoutes/PrivateRoute'

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
                <Route component={Creation} path="/addRecipe" exact />
                <Route component={RecipesList} path="/recipes" exact />
                <Route component={Visualisation} path="/recipes/:id" exact />
                <Route component={Edition} path="/recipes/edit/:id" exact />
                <Route component={Result} path="/results/:id" exact />
                <Route component={UserList} path="/users" exact />
                <Route component={Infos} path="/users/:id" exact />

                <PrivateRoute component={Cook} path="/cook" exact />
                <PrivateRoute component={MyFeed} path="/myFeed" exact />
                <PrivateRoute component={Support} path="/support" exact />
                <PrivateRoute component={MyRecipes} path="/myRecipes" exact />
                <PrivateRoute component={Profil} path="/profil" exact />

                <Route component={NotFound} path='*'/>
            </Switch>
        </Router>
)
export default Routing
