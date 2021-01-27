import React,{useState,useEffect} from 'react'
import moment from 'moment'
import {Spring} from 'react-spring/renderprops'
import {isAuthenticated,getUserAuth} from '../functions/auth'



export default function Dashboard (props) {

    const [statsGeneral,setStatsGeneral] = useState([])
    const [statsPerso,setStatPerso] = useState([])
    const [errorStatsGeneral,setErrorStatsGeneral] = useState("")
    const [errorStatsPerso,setEroorStatsPerso] = useState("")

    useEffect(() => {
        fetchStatsGeneral()
        fetchStatsPerso(getUserAuth().id)
    }, []);


    const fetchStatsGeneral = () =>{
        fetch(process.env.REACT_APP_API_URL+'/stats', {
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
          setStatsGeneral(json)
        })
        .catch((error) => {
            
        });
    }


    const fetchStatsPerso = (id) =>{
        fetch(process.env.REACT_APP_API_URL+'/stats/'+id, {
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
            setStatPerso(json)
        })
        .catch((error) => {
            
        });
    }

    

    return(
        <>  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-col">
            

            <div className="my-3">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Général
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dl>
                                <dt className="text-sm text-center leading-5 font-medium text-gray-500 truncate">
                                    Nombre de recettes
                                </dt>
                                <Spring
                                    from={{number:0}}
                                    to={{number:statsGeneral.recettes }}
                                    config={{duration:500}}
                                >
                                    {props =>(
                                       <dd className="mt-1 text-center text-3xl leading-9 font-semibold text-gray-900">
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
                                    Nombre de recettes réalisées
                                </dt>
                                <Spring
                                    from={{number:0}}
                                    to={{number:statsGeneral.achieves}}
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
                                    Nombre de résultats postés
                                </dt>
                                <Spring
                                    from={{number:0}}
                                    to={{number:statsGeneral.feeds}}
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
            

            {isAuthenticated() && 
                <div className="my-3">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Mes recettes
                                        </h3>
                                        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                                <div className="px-4 py-5 sm:p-6">
                                                    <dl>
                                                        <dt className="text-sm text-center leading-5 font-medium text-gray-500 truncate">
                                                            Nombre de recettes
                                                        </dt>
                                                        <Spring
                                                            from={{number:0}}
                                                            to={{number:statsPerso.recettes}}
                                                            config={{duration:500}}
                                                        >
                                                            {props => (
                                                                <dd className="mt-1 text-center text-3xl leading-9 font-semibold text-gray-900">
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
                                                            Nombre de recettes réalisées
                                                        </dt>
                                                        <Spring
                                                            from={{number:0}}
                                                            to={{number:statsPerso.achieves}}
                                                            config={{duration:500}}
                                                        >
                                                            {props => (
                                                                <dd className="mt-1 text-center text-3xl leading-9 font-semibold text-gray-900">
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
                                                            Nombre de résultats postés
                                                        </dt>
                                                        <Spring
                                                            from={{number:0}}
                                                            to={{number:statsPerso.feeds}}
                                                            config={{duration:500}}
                                                        >
                                                            {props => (
                                                                <dd className="mt-1 text-center text-3xl leading-9 font-semibold text-gray-900">
                                                                    {props.number.toFixed()}
                                                                </dd>
                                                            )}
                                                        </Spring> 
                                                    </dl>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    }
        </div>
            
        </>
    )
}


/*
function Test (props){

    return (
        <>
        
            <div className={" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-col"}>
                <div className="flex flex-row items-center justify-center mb-3 w-full lg:w-1/3">
                    Dashboard
                </div>
                
            </div>
        </>
    )
}

*/