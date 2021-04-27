import React from 'react'
import {isAuthenticated} from '../functions/auth'
import {Route,Redirect} from 'react-router-dom'

//Route necessitant d'etre connecte
export default function PrivateRoute  ({component: Component, ...rest}) {
    
    return (

        // Affiche le composant seulement si l'utilisateur est connecté
        // Sinon redirige vers la page /login

        <Route {...rest} render={props => (
            isAuthenticated() ?
                <Component {...props} {...rest} />
            : <Redirect to="/login" />
        )} />
    );
};