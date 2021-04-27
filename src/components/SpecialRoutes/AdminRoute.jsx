import React from 'react'
import {isAdmin} from '../functions/auth'
import {Route,Redirect} from 'react-router-dom'

//Route necessitant d'etre admin
export default function AdminRoute  ({component: Component, ...rest}) {
    return (

        // Affiche le composant seulement si l'utilisateur est un admin
        // Sinon redirige vers la page /

        <Route {...rest} render={props => (
            isAdmin() ?
                <Component {...props} {...rest} />
            : <Redirect to="/" />
        )} />
    );
};