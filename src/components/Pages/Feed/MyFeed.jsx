import React, { useState,useEffect} from 'react';
import Publication from './Publication'
import lodash from 'lodash'
import {useLocation} from 'react-router-dom'
import FetchDataLoader from '../../composants/FetchDataLoader'

export default function Myfeed (props){

    const location = useLocation()
    const [feed,setFeed] = useState(null)
    const [users,setUsers] = useState([])

    useEffect(() => {
        fetchFeed()
        fetchUsers()
    }, []);

    //Récupère les résultats d'un utilisateur
    const fetchFeed = () =>{
        fetch(process.env.REACT_APP_API_URL+'/results/users/'+location.state.user.id, {
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
            
            let orderFeed = lodash.orderBy(json,['id'],['desc'])
            //Organise les commentaires par user_id
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
            console.log(error)
        });
    }

    if(feed == null){
        return  <FetchDataLoader text="Récupération des données" />
    }
    
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-col">
                {feed.length === 0 ? 
                    <div className="flex w-full">
                        <div className="rounded-md bg-blue-200 p-2 mt-2 mx-4 w-full">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-md leading-5 font-medium text-blue-800">
                                        Tu n'as publié aucun résultat
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                : null}
                <ul class="grid grid-cols-1 gap-6  lg:grid-cols-3 xl:grid-cols-3">
                    {feed.map((f)=>{
                        return(
                            <Publication feed={f} users={users} fetchFeed={fetchFeed} deletable={true}/>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}