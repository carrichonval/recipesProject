import jwt from 'jsonwebtoken'

//Verifie si on est admin
export const isAdmin = () => {
    try {
        const decoded = jwt.verify(localStorage.getItem('token'), process.env.REACT_APP_TOKEN_KEY);
        if(decoded){
            if(decoded.role === process.env.REACT_APP_ROLE_ADMIN){
                return true
            }else{
                return false
            }
        }else{   
            return false
        }
    } catch (error) {
        return false
    }
}


//Vérifie si l'utilisateur est connecté
export const isAuthenticated = () => {

    try {
        const decoded = jwt.verify(localStorage.getItem('token'), process.env.REACT_APP_TOKEN_KEY);
        if(decoded){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

export const getToken = () =>{
    return "Bearer "+localStorage.getItem('token')
}

//Renvoie l'utilisateur  connecté
export const getUserAuth = () => {
    try {
        const decoded = jwt.verify(localStorage.getItem('token'), process.env.REACT_APP_TOKEN_KEY);
        if(decoded){
            return decoded.user
        }else{   
            return ""
        }
    } catch (error) {
        return ""
    }
}


//Déconnexion
export const deconnexion = (props) => {
    //Supprime le token d'authentification
    localStorage.removeItem('token')
    
    //Redirige vers la page login
    props.history.push('/login')
}


