import React, { useState,useEffect} from 'react';
import Publication from './Publication'
import lodash from 'lodash'
import {useParams} from 'react-router-dom'

export default function Result (props){

    const [feed,setFeed] = useState([])
    const [users,setUsers] = useState([])
    const params = useParams()
    

    useEffect(() => {
        fetchFeed()
        fetchUsers()
    }, []);

    const fetchFeed = () =>{
        fetch(process.env.REACT_APP_API_URL+'/results/'+params.id, {
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
            //Oragnise les commentaires par user_id
            let orderResult = lodash.orderBy(json.result_comments,['user_id'],['asc'])
            console.log(orderResult)
            json.result_comments = orderResult
            setFeed(json)
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

    if(feed.length == 0 ){
        return null
    }else{
        return (
            <>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-col">
                    <ul class="grid grid-cols-1 gap-6  lg:grid-cols-3 xl:grid-cols-3">
                        <Publication feed={feed} users={users} fetchFeed={fetchFeed}/>
                    </ul>
                </div>
            </>
        )
    }
    
    
}


