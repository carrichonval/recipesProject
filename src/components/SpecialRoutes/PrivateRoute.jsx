import React from 'react'
import {isAuthenticated} from '../functions/auth'
import {Route,Redirect} from 'react-router-dom'

//Route necessitant d'etre connecte
export default function PrivateRoute  ({component: Component, ...rest}) {
    
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page

        <Route {...rest} render={props => (
            isAuthenticated() ?
                <Component {...props} {...rest} />
            : <Redirect to="/login" />
        )} />
    );
};