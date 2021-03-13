import React, {useState,useEffect} from 'react'
import lodash from 'lodash'
import ModalInfosLikes from './ModalInfosLikes'
import {getUserAuth,isAuthenticated} from '../../functions/auth'


// red #B4403C
const Publication = ({feed,users,fetchFeed}) => {
    
    const [findLike,setFindLike] = useState(false)
    const [showLikes,setShowLikes] = useState(false)
    const [hidden,setHidden] = useState(true)
    const [hiddenComment,setHiddenComment] = useState(true)
    const [userAuth,setUserAuth] = useState(getUserAuth())
    const [haveComment,setHaveComment] = useState(false)
    const [comment,setComment] = useState("")


    useEffect(() => {
        searchLike(feed)
    }, [feed]);

    const searchLike = (feed) => {
        let find = lodash.find(feed.result_likes,(result)=>{
            if(result.user_id == userAuth.id){
                return true
            }
        })
        if(find){
            setFindLike(true)
        }else{
            setFindLike(false)
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

    //Vérifie si l'utilisateur à déjà laisser un commentaire sur la plublication
    const checkAddComment = () =>{
        let find = lodash.find(feed.result_comments,(result)=>{
            if(result.user_id == userAuth.id){
                return true
            }
        })
        if(!find){
           setHiddenComment(!hiddenComment)
        }else{
            setHaveComment(true)
            setTimeout(() => {
                setHaveComment(false)
            }, 2000);
        }
    }

    const addComment = () => {
        console.log(comment)
        //Cacher la zone d'ajout
        setHiddenComment(true)

        //Ajouter en base le commentaire
        fetch(process.env.REACT_APP_API_URL + '/comments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                result_id:feed.id,
                user_id: userAuth.id,
                comment: comment
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
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }

    const addLike = () => {
        //Ajouter en base le commentaire
        fetch(process.env.REACT_APP_API_URL + '/likes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                result_id:feed.id,
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
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }

    const deleteLike = () => {
        //Ajouter en base le commentaire
        fetch(process.env.REACT_APP_API_URL + '/unlikes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                result_id:feed.id,
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
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }

    return(
        <>
            {showLikes ? <ModalInfosLikes setShowLikes={setShowLikes} likes={feed.result_likes} users={users} /> : null}
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
                        {isAuthenticated() ? 
                            <div class="flex gap-5">
                                {findLike ? 
                                    <svg onClick={()=>deleteLike()} className="cursor-pointer" fill="red" height="24" viewBox="0 0 48 48" width="24">
                                        <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                    </svg>
                                :
                                    <svg onClick={()=>addLike()} className="cursor-pointer" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                        <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                    </svg>
                                }
                                <svg onClick={()=>checkAddComment()} className="cursor-pointer" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                    <path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path>
                                </svg>
                                <svg className="cursor-pointer" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                    <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                                </svg>
                            </div>
                        : 
                            <div class="flex gap-5">
                                <svg className="cursor-pointer" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                    <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                </svg>
                                
                                <svg className="cursor-pointer" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                    <path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path>
                                </svg>
                                <svg className="cursor-pointer" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                    <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                                </svg>
                            </div>
                        }
                        <div class="flex">
                            <svg className="cursor-pointer" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className={ (hiddenComment ? "hidden " : "") + " grid grid-cols-4 ml-4"}>
                        <div className="col-span-3">
                            <input onChange={(e)=>setComment(e.target.value)} className="w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg  px-4 block appearance-none leading-normal" type="text" placeholder="Commentaire .."/>
                        </div>
                        <div onClick={()=>addComment()} className="cursor-pointer flex mx-4 rounded-md justify-center hover:bg-blue-400 bg-fourth ">Ajouter</div>
                    </div>
                    {haveComment ?
                        <div className="flex w-full">
                            <div className="rounded-md bg-blue-200 p-2 mt-2 mx-4 w-full">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm leading-5 font-medium text-blue-800">
                                            Tu as déjà commenté cette publication
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    :null}
                    <div onClick={()=>setShowLikes(true)} class="font-semibold text-sm mx-4 mt-2 mb-2 cursor-pointer">{feed.result_likes.length} likes</div>
                    {feed.result_comments.length >0 ?
                        <div class="font-semibold text-sm mx-4 mt-2 mb-4 flex flex-col">
                            <div className="flex flex-row border-b border-gray-500 ">Commentaires</div>
                                {feed.result_comments.map((r,i)=>{
                                    //Si il y a plus de 2 commentaires, on cache, sinon on affiche tout simplement
                                   if(i > 2){
                                       return (
                                        <div className={(hidden ? "hidden " : "") + " grid grid-cols-3 ml-2"}>
                                            <div className="font-medium mr-2">{findUser(r.user_id)}</div>
                                            <div className="col-span-2 font-normal">{r.comment}</div>
                                        </div>
                                       )
                                   }else if(i == 2){
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
                                            <div className="col-span-2 font-normal">{r.comment}</div>
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


export default Publication