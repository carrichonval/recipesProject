import React, { useState,useEffect} from 'react';
import Publication from './Publication'
import lodash from 'lodash'
import {getUserAuth,isAuthenticated} from '../../functions/auth'

export default function Home (props){

    const [feed,setFeed] = useState([])
    const [users,setUsers] = useState([])
    const userAuth = getUserAuth()
    const [showModal,setShowModal] = useState(false)

    useEffect(() => {
        fetchFeed()
        fetchUsers()
    }, []);

    //Récupère les résultats
    const fetchFeed = () =>{
        fetch(process.env.REACT_APP_API_URL+'/results', {
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
            //Oragnise les commentaires par user_id
            let orderFeed = lodash.orderBy(json,['id'],['desc'])
            lodash.forEach(orderFeed,(feed)=>{
                let orderResult = lodash.orderBy(feed.result_comments,['user_id'],['asc'])
                feed.result_comments = orderResult
            })
            setFeed(orderFeed)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    //Ajoute la publication en BDD
    const addPublication = () =>{
        fetch(process.env.REACT_APP_API_URL+'/results', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: userAuth.id
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((json) => {
            if(json){
                fetchFeed()
                setShowModal(false)
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }

    //Récupère les utilisateurs
    const fetchUsers = () =>{
        fetch(process.env.REACT_APP_API_URL+'/users', {
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
          setUsers(json)
        })
        .catch((error) => {
            
        });
    }
    
    return (
        <>
            {isAuthenticated() ? 
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-col">
                    <ul class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:grid-cols-3 xl:grid-cols-3">
                        <button onClick={()=>setShowModal(true)} className="w-full md:col-start-2 flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary hover:bg-fourth focus:outline-none focus:border-red-800 focus:shadow-outline-red active:bg-red-800 transition duration-150 ease-in-out">
                            Poster un résultat
                        </button>
                    </ul>
                </div>
            :null}

            {showModal ?

                <div class="fixed z-10 inset-0 overflow-y-auto">
                    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div class="fixed inset-0 transition-opacity">
                            <div onClick={() => setShowModal(false)}  class="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div>
                                <div class="mt-3 text-center sm:mt-5">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                        Ajouter une image
                                    </h3>
                                    <div class="mt-2">
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-6">
                                <span class="flex w-full rounded-md shadow-sm">
                                    <button onClick={()=>addPublication()} type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-second text-base leading-6 font-medium text-white shadow-sm hover:bg-fourth focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                    Ajouter la publication
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            :null}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-col">
                <ul class="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-3">
                    {feed.map((f)=>{
                        return(
                            <Publication feed={f} users={users} fetchFeed={fetchFeed} deletable={false} />
                        )
                    })}
                </ul>
            </div>
        </>
    )
}


