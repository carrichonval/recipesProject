import React, { useState } from 'react';
import { withRouter,Link } from "react-router-dom";
import { isAuthenticated,getUserAuth,deconnexion,isAdmin } from '../functions/auth'

import Logo from '../svg/Logo'

export default withRouter((props)=>{

    const [isOpenMobile,setIsOpenMobile] = useState(false)
    
    //Header qui s'affiche seulement quand on est connecté    
        return (
            <>
            <nav id="navbar" className="bg-primary border-b border-gray-200 z-50 mb-4 sticky top-0 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <div onClick={()=>setIsOpenMobile(!isOpenMobile)} className="h-12 w-12 lg:hidden block">
                                    <Logo/>
                                </div>
                                <div className="h-12 w-12 lg:block hidden">
                                    <Logo/>
                                </div>
                            </div>
                            <div className="hidden sm:-my-px sm:ml-6 sm:flex">
                                <Link  to="/" className={(props.location.pathname === "/" ? "border-second " : "border-transparent ") + "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-500 focus:outline-none hover:border-red-400 transition duration-150 ease-in-out"}>
                                    Accueil
                                </Link>
                                <Link  to="/search" className={(props.location.pathname === "/search" ? "border-primary " : "border-transparent ") +"ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-red-400 transition duration-150 ease-in-out"}>
                                    Recherche
                                </Link>
                                <Link  to="/dashboard" className={(props.location.pathname === "/dashboard" ? "border-primary " : "border-transparent ") +"ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-red-400 transition duration-150 ease-in-out"}>
                                    Statistiques
                                </Link>
                                <Link  to="/recipes" className={(props.location.pathname === "/recipes" ? "border-primary " : "border-transparent ") +"ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-red-400  transition duration-150 ease-in-out"}>
                                    Mes recettes
                                </Link>
                                <Link  to="/cook" className={(props.location.pathname === "/cook" ? "border-primary " : "border-transparent ") +"ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-red-400  transition duration-150 ease-in-out"}>
                                    En cuisine
                                </Link>
                                <Link  to="/users" className={(props.location.pathname === "/users" ? "border-primary " : "border-transparent ") +"ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-red-400  transition duration-150 ease-in-out"}>
                                    Utilisateurs
                                </Link>
                                <Link  to="/profil" className={(props.location.pathname === "/profil" ? "border-primary " : "border-transparent ") +"ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-red-400  transition duration-150 ease-in-out"}>
                                    Mon profil
                                </Link>

                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            {isAdmin() &&
                                <Link  to="/parametres" className="mx-2">
                                    <svg className={(props.location.pathname === "/parametres" ? "text-primary " : "text-gray-500 ")+"h-5 w-5 "}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"> 
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                    </svg>
                                </Link>
                            }

                            {/*<!-- Profile dropdown -->*/}
                            {isAuthenticated() ?
                                <div className="ml-3 relative">
                                    <div>
                                        <button data-target="#userMenu" className="dropdown-btn flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out" id="user-menu" aria-label="User menu" aria-haspopup="true">
                                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                                        </button>
                                    </div>
                        
                                    <div id="userMenu" className="invisible dropdown-autoclose dropdown-menu origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                                        <div className="py-1 rounded-md bg-white shadow-xs">
                                            <Link to="/profil" className="cursor-pointer block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out">
                                                Mon profil
                                            </Link>
                                            
                                            <div onClick={()=>deconnexion(props)} className="cursor-pointer block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out">
                                                Se déconnecter
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            :
                                <Link  to="/login" className="mx-2">
                                    <button class="bg-fourth hover:bg-blue-700 text-white py-2 px-4 rounded">
                                        Se connecter
                                    </button>
                                </Link>
                                
                            }

                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button onClick={()=>setIsOpenMobile(!isOpenMobile)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* menu dropdown mobile */}
                <div className={(isOpenMobile ? " block " :" hidden ") +"sm:hidden"}>
                    
                    <div className="pt-2 pb-3 border-b border-gray-300">
                        <Link onClick={()=>setIsOpenMobile(!isOpenMobile)} to="/" className={(props.location.pathname === "/" ? "border-primary bg-fourth text-gray-900 " : "border-transparent ") +" block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 transition hover:text-gray-700 hover:border-fourth duration-150 ease-in-out"}>
                            Accueil
                        </Link>
                        <Link onClick={()=>setIsOpenMobile(!isOpenMobile)} to="/search" className={(props.location.pathname === "/search" ? "border-primary bg-fourth text-gray-900 " : "border-transparent ") +" mt-1 block pl-3 pr-4 py-2 border-l-4  text-base font-medium text-gray-600 hover:text-gray-700 hover:border-fourth transition duration-150 ease-in-out"}>
                            Recherche
                        </Link>
                        <Link onClick={()=>setIsOpenMobile(!isOpenMobile)} to="/dashboard" className={(props.location.pathname === "/dashboard" ? "border-primary bg-fourth text-gray-900 " : "border-transparent ") +" mt-1 block pl-3 pr-4 py-2 border-l-4  text-base font-medium text-gray-600 hover:text-gray-700 hover:border-fourth transition duration-150 ease-in-out"}>
                            Statistiques
                        </Link>
                        <Link onClick={()=>setIsOpenMobile(!isOpenMobile)} to="/recipes" className={(props.location.pathname === "/recipes" ? "border-primary bg-fourth text-gray-900 " : "border-transparent ") +" mt-1 block pl-3 pr-4 py-2 border-l-4  text-base font-medium text-gray-600 hover:text-gray-700 hover:border-fourth transition duration-150 ease-in-out"}>
                            Mes recettes
                        </Link>
                        <Link onClick={()=>setIsOpenMobile(!isOpenMobile)} to="/cook" className={(props.location.pathname === "/cook" ? "border-primary bg-fourth text-gray-900 " : "border-transparent ") +" mt-1 block pl-3 pr-4 py-2 border-l-4  text-base font-medium text-gray-600 hover:text-gray-700 hover:border-fourth transition duration-150 ease-in-out"}>
                            En cuisine
                        </Link>
                        <Link onClick={()=>setIsOpenMobile(!isOpenMobile)} to="/users" className={(props.location.pathname === "/users" ? "border-primary bg-fourth text-gray-900 " : "border-transparent ") +" mt-1 block pl-3 pr-4 py-2 border-l-4  text-base font-medium text-gray-600 hover:text-gray-700 hover:border-fourth transition duration-150 ease-in-out"}>
                            Utilisateurs
                        </Link>
                        {isAdmin() && 
                            <Link onClick={()=>setIsOpenMobile(!isOpenMobile)} to="/parametres" className={(props.location.pathname === "/parametres" ? "border-primary bg-fourth text-gray-900 " : "border-transparent ") +" mt-1 block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-gray-700 hover:border-fourth transition duration-150 ease-in-out"}>
                                Parametres
                            </Link>
                        }
                    </div>
                    <div className="pt-4 pb-3 border-b border-primary">
                        {isAuthenticated() ?
                            <>
                                <div className="flex items-center px-4">
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-6 text-gray-800">
                                            {getUserAuth()}
                                        </div>
                                        <div className="text-sm font-medium leading-5 text-gray-500">
                                            Valentin
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                    <Link to="/profil" onClick={()=>setIsOpenMobile(!isOpenMobile)} className={(props.location.pathname === "/profil" ? "border-primary bg-red-200 text-gray-900 " : "border-transparent ") +"border-l-4 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"} >
                                        Mon profil
                                    </Link>
                                    <div onClick={()=>deconnexion(props)} className="border-l-4 border-transparent mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out">
                                        Se déconnecter
                                    </div>
                                </div>
                            </>
                    : 
                        <div>
                            <Link to="/login" onClick={()=>setIsOpenMobile(!isOpenMobile)} className={(props.location.pathname === "/profil" ? "border-primary bg-fourth text-gray-900 " : "border-transparent ") +" border-l-4 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-fourth focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"} >
                                Se connecter
                            </Link>
                        </div>
                    }
                    </div>

                </div>

            </nav>


            </>
        )
})