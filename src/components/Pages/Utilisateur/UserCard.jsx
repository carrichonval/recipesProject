import React,{useState} from 'react';
import moment from 'moment'
import {Link} from "react-router-dom";


const UserCard = ({user,props}) =>{

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
            }}
        >

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

export default UserCard