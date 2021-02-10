import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../../functions/auth'
import Logo from '../../svg/Logo'
import lodash from 'lodash'



export default function Signup(props) {

    const [user,setUser] = useState(
        {
            "login": "",
            "first_name": "",
            "last_name": "",
            "email": "",
            "password": "",
            "confirmPassword": "",
            "description": "",
            "achieve":0
        }
    )

    const [emails,setEmails] = useState([])
    const [logins,setLogins] = useState([])
    const [availableEmail,setAvailableEmail] = useState(true)
    const [availableLogin,setAvailableLogin] = useState(true)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [isValid,setIsValid] = useState(false)

//Empeche d'afficher la page de login quand on est déja connecté
    useEffect(() => {
        fetchLogins()
        fetchEmails()
        if (isAuthenticated()) {
            props.history.push('/')
        }
    }, [])

    //Permet de verifier si toutes les infos de l'user sont corrects avant d'enregistrer
    useEffect(() => {
        if(checkAvailableEmail(user.email) && checkAvailableLogin(user.login) && isValidEmail(user.email) && isValidPassword(user.password,user.confirmPassword) && user.first_name != "" && user.last_name != "" && user.login != ""){
            setIsValid(true)
        }else{
            setIsValid(false) 
        }
    }, [user])

    //Permet de verifier si l'adresse mail et le login ne sont pas déjà existant
    useEffect(() => {
        checkAvailableEmail(user.email)
        checkAvailableLogin(user.login)
    }, [user])


    const fetchEmails = () =>{
        fetch(process.env.REACT_APP_API_URL+'/users/emails', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((json) => {
          console.log(json)
          setEmails(json)
        })
        .catch((error) => {
            
        });
    }

    const fetchLogins = () =>{
        fetch(process.env.REACT_APP_API_URL+'/users/logins', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((json) => {
          console.log(json)
          setLogins(json)
        })
        .catch((error) => {
            
        });
    }


    function isValidEmail(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    };

    const checkAvailableEmail = (email) =>{
        let find = lodash.find(emails,(mail)=>{
            return mail.email == email
        })
        if(find){
            setAvailableEmail(false)
            return false
        }else{
            setAvailableEmail(true)
            return true
        }
    }

    const checkAvailableLogin = (login) =>{
        let find = lodash.find(logins,(l)=>{
            return l.login == login
        })
        console.log(find)
        if(find){
            setAvailableLogin(false)
            return false
        }else{
            setAvailableLogin(true)
            return true
        }
    }

    function isValidPassword(password, confirmPassword) {
        if(password == "" || confirmPassword == ""){
            return false
        }

        if (password == confirmPassword) {
            return true
        } else {
            return false
        }
    }

    //Connexion
    const enregistrement = (props) => {

        fetch(process.env.REACT_APP_API_URL + '/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((json) => {
            console.log(json)
            if(json.id){
                setSuccess(true)
            }else{
                setError("Une erreur s'est produite lors de l'enregistrement")
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }


return (
<>
{success ?
    <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>


            <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div>
                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-200">
                        <svg class="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div class="mt-3 text-center sm:mt-5">
                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                            Compte créé avec succès !
                        </h3>
                    </div>
                </div>
                <div class="mt-5 sm:mt-6">
                    <span class="flex w-full rounded-md shadow-sm">
                        <button onClick={() => { props.history.push('/login') }} type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-primary text-base leading-6 font-medium text-white shadow-sm hover:bg-fourth focus:outline-none focus:border-trf-700 focus:shadow-outline-res transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Aller au menu de connexion
                        </button>
                    </span>
                </div>
            </div>
        </div>
    </div> 
: null}

<div className=" bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto h-40 w-40">
            <Logo color="primary" />
        </div>
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Enregistre toi
        </h2>

    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {error &&
            <div className="rounded-md bg-red-200 p-4 mt-4 mx-4">
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
        {!availableEmail &&
            <div className="rounded-md bg-red-200 p-4 mt-4 mx-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm leading-5 font-medium text-red-800">
                            Cette adresse mail est déjà utilisée
                        </h3>
                    </div>
                </div>
            </div>
        }
        {!availableLogin &&
            <div className="rounded-md bg-red-200 p-4 mt-4 mx-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm leading-5 font-medium text-red-800">
                            Ce login est déjà utilisé
                        </h3>
                    </div>
                </div>
            </div>
        }
        <div className="bg-gray-100 py-2 px-4 sm:rounded-lg sm:px-10">
            <div>


                <div>
                    <label htmlFor="first_name" className="m block text-sm font-medium leading-5 text-gray-700">
                        First name
                    </label>
                    <div className="my-1 rounded-md shadow-sm">
                        <input placeholder="Nom d'utilisateur" autoComplete="off" onChange={(e)=>setUser({...user,first_name:e.target.value})} id="first_name" type="text" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>
                </div>

                <div>
                    <label htmlFor="last_name" className="block text-sm font-medium leading-5 text-gray-700">
                        Last name
                    </label>
                    <div className="my-1 rounded-md shadow-sm">
                        <input placeholder="Nom d'utilisateur" autoComplete="off" onChange={(e)=>setUser({...user,last_name:e.target.value})} id="last_name" type="text" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>
                </div>

                <div>
                    <label htmlFor="login" className="block text-sm font-medium leading-5 text-gray-700">
                        Login
                    </label>
                    <div className="my-1 rounded-md shadow-sm">
                        <input placeholder="Login" autoComplete="off" onChange={(e)=>setUser({...user,login:e.target.value})} id="login" type="text" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                        Adresse mail
                    </label>
                    <div className="my-1 rounded-md shadow-sm">
                        <input placeholder="Adresse email" autoComplete="off" onChange={(e)=>setUser({...user,email:e.target.value})} id="email" type="email" className={(isValidEmail(user.email) ? " border-green-300  " : " border-red-500 ") + " outline-none appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5"} />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium leading-5 text-gray-700">
                        Description
                    </label>
                    <div className="my-1 rounded-md shadow-sm">
                        <input placeholder="Description" autoComplete="off" onChange={(e)=>setUser({...user,description:e.target.value})} id="description" type="text" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                        Mot de passe
                    </label>
                    <div className="my-1 rounded-md shadow-sm">
                        <div class="relative ">
                            <input autoComplete="off" onChange={(e)=>setUser({...user,password:e.target.value})} aria-label="Password" name="password" type={passwordVisible ? "text" : "password"} required className={(isValidPassword(user.password,user.confirmPassword) ? "border-green-300 " : " border-red-500 ")+" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5"} placeholder="Mot de passe" />
                            <div class="absolute inset-y-0 right-0 pr-3 flex items-center ">
                                <span onClick={() => setPasswordVisible(!passwordVisible)} class="cursor-pointer text-gray-500 sm:text-sm sm:leading-5" id="price-currency">
                                    <svg class="  h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                        Confirmation mot de passe
                    </label>
                    <div className="my-1 rounded-md shadow-sm">
                        <div class="relative ">
                            <input autoComplete="off" onChange={(e)=>setUser({...user,confirmPassword:e.target.value})} aria-label="Password" name="password" type={passwordVisible ? "text" : "password"} required className={(isValidPassword(user.password,user.confirmPassword) ? "border-green-300 " : " border-red-500 ")+" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5"} placeholder="Confirmation mot de passe" />
                            <div class="absolute inset-y-0 right-0 pr-3 flex items-center ">
                                <span onClick={() => setPasswordVisible(!passwordVisible)} class="cursor-pointer text-gray-500 sm:text-sm sm:leading-5" id="price-currency">
                                    <svg class="  h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="mt-6">
                    <span className="block w-full rounded-md shadow-sm">
                        <button disabled={isValid ? false : true} onClick={() => enregistrement(props)} className={(isValid ? " bg-primary hover:bg-indigo-500 " : " bg-gray-400 ")+" w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white   transition duration-150 ease-in-out"}>
                            Valider mon inscription
                        </button>
                    </span>
                </div>
            </div>

        </div>
    </div>
</div>

</>
)
}