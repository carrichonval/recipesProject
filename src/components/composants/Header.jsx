import React, { useEffect, useState } from 'react';
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
                                    <Logo color="white" />
                                </div>
                                <div className="h-12 w-12 lg:block hidden">
                                    <Link to="/">
                                        <Logo color="white"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden sm:-my-px sm:ml-6 lg:flex">
                                <Link  to="/" className={(props.location.pathname === "/" ? "border-second " : "border-transparent ") + "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-500 focus:outline-none hover:text-gray-600 hover:border-fourth transition duration-150 ease-in-out"}>
                                    Accueil
                                </Link>
                                <Link  to="/dashboard" className={(props.location.pathname === "/dashboard" ? "border-primary " : "border-transparent ") +"ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-500 hover:text-gray-600 hover:border-fourth transition duration-150 ease-in-out"}>
                                    Statistiques
                                </Link>
                                <Link  to="/recipes" className={(props.location.pathname === "/recipes" ? "border-primary " : "border-transparent ") +"ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-500 hover:text-gray-600 hover:border-fourth  transition duration-150 ease-in-out"}>
                                    Recettes
                                </Link>
                                <Link  to="/cook" className={(props.location.pathname === "/cook" ? "border-primary " : "border-transparent ") +"ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-500 hover:text-gray-600 hover:border-fourth  transition duration-150 ease-in-out"}>
                                    En cuisine
                                </Link>
                                <Link  to="/users" className={(props.location.pathname === "/users" ? "border-primary " : "border-transparent ") +"ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-500 hover:text-gray-600 hover:border-fourth  transition duration-150 ease-in-out"}>
                                    Utilisateurs
                                </Link>
                                {isAuthenticated() && 
                                    <Link  to="/profil" className={(props.location.pathname === "/profil" ? "border-primary " : "border-transparent ") +"ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-500 hover:text-gray-600 hover:border-fourth  transition duration-150 ease-in-out"}>
                                        Mon profil
                                    </Link>
                                }

                            </div>
                        </div>
                        <div className="hidden sm:ml-6 lg:flex sm:items-center">
                           

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

                        <div className="-mr-2 flex items-center lg:hidden">
                            <button onClick={()=>setIsOpenMobile(!isOpenMobile)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* menu dropdown mobile */}
                <div className={(isOpenMobile ? " block " :" hidden ") +"lg:hidden "}>
                    
                    <div className="pt-2 pb-3 border-b border-gray-300">
                        <Link onClick={()=>setIsOpenMobile(!isOpenMobile)} to="/" className={(props.location.pathname === "/" ? "border-primary bg-fourth text-gray-900 " : "border-transparent ") +" block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 transition hover:text-gray-700 hover:border-fourth duration-150 ease-in-out"}>
                            Accueil
                        </Link>
                        <Link onClick={()=>setIsOpenMobile(!isOpenMobile)} to="/dashboard" className={(props.location.pathname === "/dashboard" ? "border-primary bg-fourth text-gray-900 " : "border-transparent ") +" mt-1 block pl-3 pr-4 py-2 border-l-4  text-base font-medium text-gray-600 hover:text-gray-700 hover:border-fourth transition duration-150 ease-in-out"}>
                            Statistiques
                        </Link>
                        <Link onClick={()=>setIsOpenMobile(!isOpenMobile)} to="/recipes" className={(props.location.pathname === "/recipes" ? "border-primary bg-fourth text-gray-900 " : "border-transparent ") +" mt-1 block pl-3 pr-4 py-2 border-l-4  text-base font-medium text-gray-600 hover:text-gray-700 hover:border-fourth transition duration-150 ease-in-out"}>
                            Recettes
                        </Link>
                        <Link onClick={()=>setIsOpenMobile(!isOpenMobile)} to="/cook" className={(props.location.pathname === "/cook" ? "border-primary bg-fourth text-gray-900 " : "border-transparent ") +" mt-1 block pl-3 pr-4 py-2 border-l-4  text-base font-medium text-gray-600 hover:text-gray-700 hover:border-fourth transition duration-150 ease-in-out"}>
                            En cuisine
                        </Link>
                        <Link onClick={()=>setIsOpenMobile(!isOpenMobile)} to="/users" className={(props.location.pathname === "/users" ? "border-primary bg-fourth text-gray-900 " : "border-transparent ") +" mt-1 block pl-3 pr-4 py-2 border-l-4  text-base font-medium text-gray-600 hover:text-gray-700 hover:border-fourth transition duration-150 ease-in-out"}>
                            Utilisateurs
                        </Link>

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