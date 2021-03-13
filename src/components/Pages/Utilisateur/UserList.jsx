import React,{useState,useEffect} from 'react';
import moment from 'moment'
import {withRouter,Link} from "react-router-dom";
import usePagination from "../../hooks/usePagination"
import Pagination from "../../composants/Pagination"


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
                            <Item user={user} props={props} />
                        )
                    })}
                    
                    </ul>

                    <Pagination currentPage={currentPage} next={next} prev={prev} jump={jump} paginate={paginate} maxPage={maxPage} />
                
            </div>
        </> 

    )
})





const Item = ({user,props}) =>{
    console.log("User : ",user)
    const [today,setToday] = useState( moment().format("YYYY-MM-DD"))
    function countdownDate(date){
        var a = moment(today, 'YYYY-MM-DD');
        var b = moment(date, 'YYYY-MM-DD');
        var days = a.diff(b, 'days');
        if (days){
            return days
        }else{
            return 0
        }

    }
    return(
        <Link
  to={{
    pathname: "/users/"+user.id,
    state: { user: user }
  }}>

        <li class="cursor-pointer col-span-1 bg-white rounded-lg shadow">
            <div class="w-full flex items-center justify-between p-6 space-x-6">
            <div class="flex-1 truncate">
                <div class="flex items-center space-x-3">
                <h3 class="text-gray-900 text-sm leading-5 font-medium truncate">{user.first_name + " " +user.last_name}</h3>
                </div>
                <p class="mt-1 text-gray-500 text-sm leading-5 truncate">{user.description}</p>
            </div>
            <img class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt=""/>
            </div>
            <div class="border-t border-gray-200">
            <div class="-mt-px flex">
                <div class="w-0 flex-1 flex border-r border-gray-200">
                <a class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg transition ease-in-out duration-150">
                    <span class="ml-3 text-xs">{user.email}</span>
                </a>
                </div>
                <div class="-ml-px w-0 flex-1 flex">
                <a class="relative w-0 flex-1 inline-flex items-center justify-center py-4 leading-5 text-gray-700 font-medium border border-transparent rounded-br-lg transition ease-in-out duration-150">
                    <span class="ml-3 text-xs">Membre depuis {countdownDate(user.createdAt)} jours</span>
                </a>
                </div>
            </div>
            </div>
        </li>
    </Link>
    )
}