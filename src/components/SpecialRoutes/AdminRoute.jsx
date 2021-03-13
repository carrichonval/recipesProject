import React from 'react'
import {isAdmin} from '../functions/auth'
import {Route,Redirect} from 'react-router-dom'

//Route necessitant d'etre admin
export default function AdminRoute  ({component: Component, ...rest}) {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to / page

        <Route {...rest} render={props => (
            isAdmin() ?
                <Component {...props} {...rest} />
            : <Redirect to="/" />
        )} />
    );
};