import React, { useState,useEffect} from 'react';
import lodash from 'lodash'

export default function Home (props){

    const [feed,setFeed] = useState([])
    const [users,setUsers] = useState([])

    useEffect(() => {
        fetchFeed()
        fetchUsers()
    }, []);

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
          console.log(json)
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
          console.log(json)
          setUsers(json)
        })
        .catch((error) => {
            
        });
    }

    console.log(users)
    
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-col">
            <ul class="grid grid-cols-1 gap-6  lg:grid-cols-3 xl:grid-cols-3">
               {feed.map((f)=>{
                   return(
                       <Publication feed={f} users={users} />
                   )
               })}

            </ul>

            </div>
        </>
            

    )
}

// red #B4403C
const Publication = ({feed,users}) => {
    
    const [findLike,setFindLike] = useState(false)
    const [showLikes,setShowLikes] = useState(false)
    const [hidden,setHidden] = useState(true)


    useEffect(() => {
        searchLike(feed)
    }, []);

    const searchLike = (feed) => {
        let find = lodash.find(feed.result_likes,(result)=>{
            if(result.user_id == feed.user.id){
                return true
            }
        })
        if(find){
            setFindLike(true)
        }
    }

    const findUser = (user_id) => {
        let find = lodash.find(users,(user)=>{
            if(user.id == user_id){
                return true
            }
        })
        if(find){
            return find.first_name + ' ' + find.last_name
        }else{
            return ""
        }
    }


    return(
        <>
            {showLikes ? <ModalInfos setShowLikes={setShowLikes} likes={feed.result_likes} users={users} /> : null}
            <div class="bg-gray-100 lg:col-start-2 justify-center flex ">
                <div class="bg-white border rounded-md max-w-md w-full">
                    <div class="flex items-center px-4 py-3">
                        <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"/>
                        <div class="ml-3 ">
                            <span class="text-sm font-semibold antialiased block leading-tight">{feed.user.first_name + " " + feed.user.last_name}</span>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <img  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"/>
                    </div>
                    <div class="flex items-center justify-between mx-4 mt-3 mb-2">
                        <div class="flex gap-5">
                            {findLike ? 
                                <svg className="cursor-pointer" fill="red" height="24" viewBox="0 0 48 48" width="24">
                                    <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                </svg>
                            :
                                <svg className="cursor-pointer" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                </svg>
                            }
                            <svg className="cursor-pointer" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                <path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path>
                            </svg>
                            <svg className="cursor-pointer" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                            </svg>
                        </div>
                        <div class="flex">
                            <svg className="cursor-pointer" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
                            </svg>
                        </div>
                    </div>
                    <div onClick={()=>setShowLikes(true)} class="font-semibold text-sm mx-4 mt-2 mb-2 cursor-pointer">{feed.result_likes.length} likes</div>
                    {feed.result_comments.length >0 ?
                        <div class="font-semibold text-sm mx-4 mt-2 mb-4 flex flex-col">
                            <div className="flex flex-row border-b border-gray-500 ">Commentaires</div>
                                {feed.result_comments.map((r,i)=>{
                                   if(i > 2){
                                       return (
                                        <div className={(hidden ? "hidden " : "") + " grid grid-cols-3 ml-2"}>
                                            <div className="font-medium mr-2">{findUser(r.user_id)}</div>
                                            <div className="font-normal">{r.comment}</div>
                                        </div>
                                       )
                                   }else if(i == 2){
                                       console.log("pass")
                                        return(
                                            <div className="grid my-2 grid-cols-3">
                                                <div onClick={()=>setHidden(!hidden)} className="font-normal col-span-2 cursor-pointer">
                                                    {hidden ?
                                                    "Voir les autres commentaires .." :
                                                    "Masquer les autres commentaires .. "
                                                    }
                                                </div>
                                            </div>
                                        )
                                   }else{
                                    return(
                                        <div className="grid grid-cols-3 ml-2">
                                            <div className="font-medium mr-2">{findUser(r.user_id)}</div>
                                            <div className="font-normal">{r.comment}</div>
                                        </div>
                                    )
                                   }
                                })}
                        </div>
                    :null}
                </div>
            </div>
        </>
    )
}


const ModalInfos = ({setShowLikes,likes,users}) =>{

    const findUser = (user_id) => {
        let find = lodash.find(users,(user)=>{
            if(user.id == user_id){
                return true
            }
        })
        if(find){
            return find.first_name + ' ' + find.last_name
        }else{
            return ""
        }
    }

    return(
<div class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

    <div class="fixed inset-0 transition-opacity">
      <div onClick={()=>setShowLikes(false)} class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>

    <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

    <div class="w-2/3 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6">
      

<div class="bg-white shadow overflow-hidden sm:rounded-lg">
  <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      Personnes ayant likées
    </h3>
  </div>
  <div class="px-4 py-5 sm:p-0">
    <dl>
        {likes.map((like,i)=>{
            console.log(like)
            if(i == 0 ){
                return(
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                        <dt class="text-sm leading-5 font-medium ">
                            {findUser(like.user_id)}
                        </dt>
                    </div>
                )
            }else{
                return (
                    <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                        <dt class="text-sm leading-5 font-medium ">
                            {findUser(like.user_id)}
                        </dt>
                    </div>
                )
            }
        })}
    </dl>
  </div>
</div>
<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button onClick={()=>setShowLikes(false)} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
            Fermer
        </button>
    </span>
</div>
    </div>

  </div>
</div>

    )
}