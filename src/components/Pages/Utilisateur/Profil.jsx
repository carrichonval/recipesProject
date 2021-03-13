import React,{useState} from 'react';
import {getUserAuth} from '../../functions/auth';
import {withRouter,Link} from "react-router-dom";


export default withRouter((props)=>{

    const [user,setUser] = useState(getUserAuth())
    const [showInfosPersos,setShowInfosPersos] = useState(false)


    console.log(user)

    return (
        <>
            
            <div className="account max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
                <div className="flex mt-8">
                    <div class="bg-white overflow-hidden shadow rounded-lg w-full p-5 flex flex-row">
                        <div className="col-span-1 flex flex-row">
                            <div className="flex-col mx-2">
                            <img class="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt=""/>
                            </div>
                            <div className="flex ml-8 font-medium items-center text-lg">
                                {user.first_name + " "+user.last_name}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    <div class="bg-white overflow-hidden shadow rounded-lg col-span-1 cursor-pointer hover:shadow-lg">
                        <div class="px-4 py-6 ">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 bg-fourth rounded-md p-6">
                                    <svg class="h-8 lg:h-10 w-8 lg:w-10 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                                    </svg>
                                </div>
                                <div class="w-full text-center p-2">
                                    <dl className="flex justify-center font-semibold text-sm">
                                        Mes recettes
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg col-span-1 cursor-pointer hover:shadow-lg">
                        <div class="px-4 py-6 ">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 bg-fourth rounded-md p-6">
                                    <svg class="h-8 lg:h-10 w-8 lg:w-10 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                                    </svg>
                                </div>
                                <div class="w-full text-center p-2">
                                    <dl className="flex justify-center font-semibold text-sm">
                                        Mes publications
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link
                      to={{
                        pathname: "/users/"+user.id,
                        state: { user: user }
                      }}>
                    <div class="bg-white overflow-hidden shadow rounded-lg col-span-1 cursor-pointer hover:shadow-lg">
                        <div class="px-4 py-6 ">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 bg-fourth rounded-md p-6">
                                <svg class="h-8 lg:h-10 w-8 lg:w-10 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>
                                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                </div>
                                <div class="w-full text-center p-2">
                                    <dl className="flex justify-center font-semibold text-sm">
                                        Mes informations personnelles
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Link>
                    <div class="bg-white overflow-hidden shadow rounded-lg col-span-1 cursor-pointer hover:shadow-lg">
                        <div class="px-4 py-6 ">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 bg-fourth rounded-md p-6">
                                    <svg class="h-8 lg:h-10 w-8 lg:w-10 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <circle cx="12" cy="12" r="4" />
                                        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
                                        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
                                        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
                                        <line x1="14.83" y1="9.17" x2="18.36" y2="5.64" />
                                        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
                                    </svg>
                                </div>
                                <div class="w-full text-center p-2">
                                    <dl className="flex justify-center font-semibold text-sm">
                                        Support
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

const ModalInfos = ({setShowInfosPersos,user}) =>{
    return(
<div class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

    <div class="fixed inset-0 transition-opacity">
      <div onClick={()=>setShowInfosPersos(false)} class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>

    <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

    <div class="w-2/3 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6">
      

<div class="bg-white shadow overflow-hidden sm:rounded-lg">
  <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      Mes informations personnelles
    </h3>
  </div>
  <div class="px-4 py-5 sm:p-0">
    <dl>
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
        <dt class="text-sm leading-5 font-medium text-gray-500">
          Prénom
        </dt>
        <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
          {user.first_name}
        </dd>
      </div>
      <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
        <dt class="text-sm leading-5 font-medium text-gray-500">
         Nom
        </dt>
        <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
          {user.last_name}
        </dd>
      </div>
      <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
        <dt class="text-sm leading-5 font-medium text-gray-500">
          Login
        </dt>
        <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
          {user.login}
        </dd>
      </div>
      <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
        <dt class="text-sm leading-5 font-medium text-gray-500">
          Description
        </dt>
        <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
          {user.description}
        </dd>
      </div>
      <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
        <dt class="text-sm leading-5 font-medium text-gray-500">
          Adresse email
        </dt>
        <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
          {user.email}
        </dd>
      </div>
    </dl>
  </div>
</div>
<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button onClick={()=>setShowInfosPersos(false)} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
            Fermer
        </button>
    </span>
</div>
    </div>

  </div>
</div>

    )
}