import React,{useState,useEffect} from 'react';
import {useParams,useLocation} from 'react-router-dom'
import {Spring} from 'react-spring/renderprops'
import moment from 'moment'
import FetchDataLoader from '../../composants/FetchDataLoader'

export const Infos = (props) =>{

    const params = useParams()
    const location = useLocation()
    const [user,setUser] = useState(null)
    const [note,setNote] = useState(null)


    // Recupere l'object si on provient d'un lien, sinon on appel l'api pour récuperer l'utilisateur
    useEffect(() => {
        if(!location.state){
            fetchUser()
        }else{
            setUser(location.state.user)
            getMoyenne(location.state.user)
        }
    },[]);

    //Récupère l'utilisateur
    const fetchUser = () =>{
        fetch(process.env.REACT_APP_API_URL+'/users/'+params.id, {
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
          setUser(json)
          getMoyenne(json)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    //Récupère la moyenne
    const getMoyenne = (user) => {
        fetch(process.env.REACT_APP_API_URL+'/getMoyenne/'+user.id, {
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
            setNote(json.note)
        })
        .catch((error) => {
            console.log(error)
        });

    }

    //Convertit en date
    const convertDate = (date) =>{
        return moment(date).format('DD/MM/YYYY')
    }


    if(user == null){
        return <FetchDataLoader text="Récupérations des informations"></FetchDataLoader>
    }else{
        return (
            <>
                <div className="account max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4"> 
                    <div class="bg-white shadow overflow-hidden rounded-lg">
                        <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">
                            Informations de l'utilisateur
                            </h3>
                        </div>
                        <div>
                            <dl>
                                <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                    Prénom
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.first_name}
                                    </dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                    Nom
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.last_name}
                                    </dd>
                                </div>
                                <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                    Email 
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.email}
                                    </dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                    Description
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.description}
                                    </dd>
                                </div>
                                <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                    Date d'inscription
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    {convertDate(user.createdAt)}
                                    </dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                        Note moyenne
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        {note}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="grid grid-cols-2  xl:grid-cols-4 gap-4 mt-8">
                        
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm text-center leading-5 font-medium text-gray-500 truncate">
                                        Recettes réalisées
                                    </dt>
                                    <Spring
                                        from={{number:0}}
                                        to={{number:user.achieve}}
                                        config={{duration:500}}
                                    >
                                        {props =>(
                                            <dd className="flex mt-1 justify-center text-3xl leading-9 font-semibold text-gray-900">
                                            {props.number.toFixed()}
                                            
                                        </dd>
                                        )}

                                    </Spring>
                                </dl>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm text-center leading-5 font-medium text-gray-500 truncate">
                                       Recettes postées
                                    </dt>
                                    <Spring
                                        from={{number:0}}
                                        to={{number:user.recettes.length}}
                                        config={{duration:500}}
                                    >
                                        {props =>(
                                            <dd className="flex mt-1 justify-center text-3xl leading-9 font-semibold text-gray-900">
                                            {props.number.toFixed()}
                                            
                                        </dd>
                                        )}

                                    </Spring>
                                </dl>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm text-center leading-5 font-medium text-gray-500 truncate">
                                       Résultats postés
                                    </dt>
                                    <Spring
                                        from={{number:0}}
                                        to={{number:user.results.length}}
                                        config={{duration:500}}
                                    >
                                        {props =>(
                                            <dd className="flex mt-1 justify-center text-3xl leading-9 font-semibold text-gray-900">
                                            {props.number.toFixed()}
                                            
                                        </dd>
                                        )}

                                    </Spring>
                                </dl>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm text-center leading-5 font-medium text-gray-500 truncate">
                                        Commentaires
                                    </dt>
                                    <Spring
                                        from={{number:0}}
                                        to={{number:user.result_comments.length}}
                                        config={{duration:500}}
                                    >
                                        {props =>(
                                            <dd className="flex mt-1 justify-center text-3xl leading-9 font-semibold text-gray-900">
                                            {props.number.toFixed()}
                                            
                                        </dd>
                                        )}

                                    </Spring>
                                </dl>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm text-center leading-5 font-medium text-gray-500 truncate">
                                       Likes attribués
                                    </dt>
                                    <Spring
                                        from={{number:0}}
                                        to={{number:user.result_likes.length}}
                                        config={{duration:500}}
                                    >
                                        {props =>(
                                            <dd className="flex mt-1 justify-center text-3xl leading-9 font-semibold text-gray-900">
                                            {props.number.toFixed()}
                                            
                                        </dd>
                                        )}

                                    </Spring>
                                </dl>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </>    
        )
    }
}

export default Infos