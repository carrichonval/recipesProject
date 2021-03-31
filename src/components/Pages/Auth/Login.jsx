import React, { useEffect, useState } from 'react';
import {isAuthenticated} from '../../functions/auth'
import Logo from '../../svg/Logo'

export default function Login (props){

    const [user,setUser] = useState(
        {
            "login": "",
            "password": ""
        }
    )
    const [error,setError] = useState('')
    const [passwordVisible,setPasswordVisible] = useState(false)

    //Empeche d'afficher la page de login quand on est déja connecté
    useEffect(()=>{
        if(isAuthenticated()){
            props.history.push('/')
        }
        document.addEventListener('keypress',checkEnterPress)
        return function cleanup() {
            document.removeEventListener('keypress',checkEnterPress)
          };

    },[])

    const checkEnterPress = (e) => {
        if(e.key == "Enter"){
            document.getElementById("login").click()
        }
    }


    //Connexion
    const connexion = (props) => {

        fetch(process.env.REACT_APP_API_URL+'/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(user)
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((json) => {
            if(json.access_token){
                localStorage.setItem('token',json.access_token)
                //Redirige vers la page d'accueil
                props.history.push('/')
            }else{
                setError(json.message)
            }
           
        })
        .catch((error) => {
            setError("Identifiant ou mot de passe incorrect")
        });
    }

    return(
        <>
            <div className="h-full mt-12 lg:mt-24 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
                <div className="max-w-md w-full">
                    <div>
                        
                        <div className="mx-auto h-40 w-40">
                            <Logo color="primary" />
                        </div>
                        <h2 className="my-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                            Connecte toi
                        </h2>
                    </div>
                    <div className="rounded-md shadow-sm">
                        <div>
                            <input autoComplete="off" onChange={(e)=>setUser({...user,login:e.target.value})} value={user.login} name="login" type="text" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Login"/>
                        </div>
                        <div className="-mt-px">
                            <div>
                                <div class="relative ">
                                    <input autoComplete="off" onChange={(e)=>setUser({...user,password:e.target.value})} aria-label="Password" name="password" type={passwordVisible ? "text" : "password"} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Mot de passe"/>
                                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center ">
                                        <span onClick={()=>setPasswordVisible(!passwordVisible)} class="cursor-pointer text-gray-500 sm:text-sm sm:leading-5" id="price-currency">
                                            <svg class="  h-5 w-5 text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {error && 
                        <div className="rounded-md bg-red-200 p-4 mt-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm leading-5 font-medium text-red-800">
                                        {error}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    }

                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center text-sm leading-5">
                            <div onClick={()=>props.history.push('/signup')} className="cursor-pointer font-medium text-secondary hover:text-fourth focus:outline-none focus:underline transition ease-in-out duration-150">
                                Pas encore inscrit ?
                            </div>
                        </div>

                        <div className="text-sm leading-5">
                            <div className="cursor-pointer font-medium text-secondary hover:text-fourth focus:outline-none focus:underline transition ease-in-out duration-150">
                                Mot de passe oublié ?
                            </div>
                        </div>
                    </div>

                    

                    <div className="mt-6">
                        <button id="login" onClick={()=>connexion(props)} className="w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary hover:bg-fourth focus:outline-none focus:border-red-800 focus:shadow-outline-red active:bg-red-800 transition duration-150 ease-in-out">
                            Se connecter
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}