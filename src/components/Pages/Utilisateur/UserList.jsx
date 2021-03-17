import React,{useState,useEffect} from 'react';
import moment from 'moment'
import {withRouter,Link} from "react-router-dom";
import usePagination from "../../hooks/usePagination"
import Pagination from "../../composants/Pagination"
import UserCard from './UserCard'


export default withRouter((props)=>{


    const [users,setUsers] = useState([])

    const [searchName,setSearchName] = useState("")
    
     //Pagination que si l'on a + de 16 users
     const { next, prev, jump, currentPage, maxPage,startIndex, endIndex , paginate} = usePagination(users ? users : [],16)

    useEffect(() => {
        fetchUsers()
    }, []);

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
          console.log(json)
          setUsers(json)
        })
        .catch((error) => {
            
        });
    }

    return (
        <>
        
            <div className={" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-col"}>
                <div className="flex flex-col lg:flex-row w-full">
                    <div className="flex flex-row items-center justify-center mb-3 w-full lg:w-1/3">
                        <input onChange={(e)=>setSearchName(e.target.value)} className="w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal" type="text" placeholder="Rechercher"/>
                    </div>
                </div>

                    <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {users.slice(startIndex, endIndex).map((user)=>{
                        if((user.first_name+user.last_name).toLowerCase().search(searchName.toLowerCase()) === -1){
                            return null
                        }
                        return(
                            <UserCard user={user} props={props} />
                        )
                    })}
                    
                    </ul>

                    <Pagination currentPage={currentPage} next={next} prev={prev} jump={jump} paginate={paginate} maxPage={maxPage} />
                
            </div>
        </> 

    )
})




