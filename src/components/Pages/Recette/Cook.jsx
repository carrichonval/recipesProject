import React, { useState ,useEffect} from 'react';
import {getUserAuth} from '../../functions/auth'
import FetchDataLoader from '../../composants/FetchDataLoader'
import lodash from 'lodash'

export default function Cook (props){

    //step 0 => Choisis ta recette
    //step 1 => Récap ingredients
    //step 2 => Recap des etapes
    //step 3 => Commencer !
    //step 4 => Debut recette jusqu'a etape.length + 3
    //step etapes.length +4 => Terminer 

    const [recettes,setRecettes] = useState([])
    const [step,setStep] = useState(0)
    const [maxStep,setMaxStep] = useState(99999)
    const [recetteCook,setRecetteCook] = useState(null)
    const [recetteStep,setRecetteStep] = useState(0)
    const [user,setUser] = useState({})

    const typeRecipes = [
        {
            value:"0",
            label:"Entrée"
        },
        {
            value:"1",
            label:"Plat"
        },
        {
            value:"2",
            label:"Dessert"
        }
        ,
        {
            value:"3",
            label:"Gateaux"
        }
    ]

    useEffect(()=>{
        fetchRecettes()
        fetchUser()
    },[])

    useEffect(()=>{
        if(step > maxStep){
            addOneAchieve()
        }
    },[step])

    const addOneAchieve = ()=>{
        fetch(process.env.REACT_APP_API_URL+'/users/achieve', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                user_id : user.id,
                achieve : user.achieve +1
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((json) => {
            console.log(json)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    const fetchRecettes = () => {
        fetch(process.env.REACT_APP_API_URL+'/recettes', {
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
            lodash.forEach(json,(recipe)=>{
                let type = lodash.find(typeRecipes,(type)=>{
                    return type.label == recipe.type
                })
                recipe.type = type
                recipe.value = recipe.id
                recipe.label = recipe.type
            })
            setRecettes(json)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    const fetchUser = () => {
        fetch(process.env.REACT_APP_API_URL+'/users/'+getUserAuth().id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((json) => {
            setUser(json)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    const getNote = (notes) => {
        if(notes && notes.length > 0 ){
            let total = 0
            lodash.forEach(notes,(n)=>{
                total += n.note
            })
            return Math.round(total / notes.length) + "/5"
        }else{
            return "Pas encore noté"
        }  
    }

    const isOdd = (num) => { return num % 2;}

    console.log(user)

    if(recettes.length == 0){
        return(
            <FetchDataLoader text="Récupération des données" />
        )
    }else{

        return (
            <>
                <div className={" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-col"}>
                    {step == 0 ?
                        <div className="flex flex-row items-center justify-center mb-4 w-full justify-center text-2xl text-fourth font-bold">
                            C'est l'heure de cuisiner, choisis ta recette
                        </div>
                    : step == 1 ?
                        <div className="flex flex-row items-center justify-center mb-4 w-full justify-center text-2xl text-fourth font-bold">
                            Prépare tes ingrédients !
                        </div>
                    : step == 2 ?
                        <div className="flex flex-row items-center justify-center mb-4 w-full justify-center text-2xl text-fourth font-bold">
                            Dernier préparatif
                        </div>
                    : (step >= 3 && step <= maxStep) ?
                        <div className="flex flex-row items-center justify-center mb-4 w-full justify-center text-2xl text-fourth font-bold">
                            Etape n°{step-2}
                        </div>
                    :null
                    }
                    
        
                    {step == 0 ?
                        <div class="flex flex-col">
                            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table class="min-w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr>
                                                <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                    Nom
                                                </th>
                                                <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                    Note
                                                </th>
                                                <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                
                                                </th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recettes.map((recette,i)=>{
                                                    return(
                                                        <tr class={isOdd(i) ? "bg-gray-50" : "bg-white"}>
                                                            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                                                {recette.name}
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                            {getNote(recette.recette_notes)}
                                                            </td>
                                                            <td onClick={()=>{setRecetteCook(recette);setMaxStep(2+recette.etapes.length);setStep(1)}} class="cursor-pointer px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                                                <div  class="text-indigo-600 hover:text-indigo-900">Choisir</div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    :null}

                    {step == 1 ?
                    <> 
                        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 lg:mt-12">
                            <div className="my-3 grid grid-cols-1 lg:col-start-2 ">
                                <div className="bg-white shadow overflow-hidden rounded-lg">
                                    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Ingrédients
                                        </h3>
                                    </div>
                                    <div>
                                        {recetteCook.ingredients.map((ingredient)=>{
                                            return(
                                                <div className="p-4 border-b border-gray-300 grid grid-cols-2 gap-4">
                                                    <input readOnly={true} value={ingredient.name} className="pb-1 w-full bg-white focus:outline-none rounded-lg pt-1 px-4 appearance-none" type="text" placeholder="Nom" />
                                                    <input readOnly={true} value={ingredient.quantity} className="pb-1 w-full bg-white focus:outline-none rounded-lg pt-1 px-4 appearance-none" type="text" placeholder="Quantité"/>
                                                </div> 
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 lg:mt-12">
                            <button onClick={()=>setStep(2)} className=" lg:col-start-2 w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary hover:bg-fourth focus:outline-none focus:border-red-800 focus:shadow-outline-red active:bg-red-800 transition duration-150 ease-in-out">
                                Etape suivante
                            </button>
                        </div>
                    </>
                    :null}

                    {step == 2 ? 
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 lg:mt-12">
                                <div className="my-3 grid grid-cols-1 lg:col-start-2">
                                    <div className="bg-white shadow overflow-hidden rounded-lg">
                                        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                Etapes
                                            </h3>
                                        </div>
                                        <div>
                                            {recetteCook.etapes.map((etape)=>{
                                                return(
                                                    <div className="p-4 border-b border-gray-300 grid grid-cols-5 gap-4">
                                                        <input readOnly={true} value={etape.step} className=" pb-1 w-full bg-white focus:outline-none  rounded-lg pt-1 px-4 appearance-none" type="text" placeholder="Nom" />
                                                        <input readOnly={true} value={etape.detail} className="col-span-4 pb-1 w-full bg-white focus:outline-none rounded-lg pt-1 px-4 appearance-none" type="text" placeholder="Quantité"/>
                                                    </div> 
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 lg:mt-12">
                                <button onClick={()=>setStep(3)} className=" lg:col-start-2 w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary hover:bg-fourth focus:outline-none focus:border-red-800 focus:shadow-outline-red active:bg-red-800 transition duration-150 ease-in-out">
                                    C'est partie !
                                </button>
                            </div>
                        </>
                    :null}
                    
                    {(step >= 3 && step <= maxStep) ?
                        <>
                            <div className="mt-12 flex flex-row items-center justify-center mb-4 w-full justify-center text-2xl text-fourth font-bold">
                                {recetteCook.etapes[recetteStep].detail}
                            </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 lg:mt-12">
                                    <button onClick={()=>{setStep(step+1);setRecetteStep(recetteStep+1)}} className=" lg:col-start-2 w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary hover:bg-fourth focus:outline-none focus:border-red-800 focus:shadow-outline-red active:bg-red-800 transition duration-150 ease-in-out">
                                       {step != maxStep ? "Etape suivante" : "Terminé !"}
                                    </button>
                                </div>
                            </>
                    :null}
                    {step > maxStep ?
                        <>
                            <div className="flex flex-row items-center justify-center mb-4 w-full justify-center text-2xl text-fourth font-bold">
                                Tu as bien cuisiner !
                            </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 lg:mt-12">
                                    <button onClick={()=>{fetchUser();setStep(0);setMaxStep(99999);setRecetteCook(null);setRecetteStep(0)}} className=" lg:col-start-2 w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary hover:bg-fourth focus:outline-none focus:border-red-800 focus:shadow-outline-red active:bg-red-800 transition duration-150 ease-in-out">
                                        Retour au choix des recettes
                                    </button>
                                </div>
                        </>
                    :null}
                </div>
            </>
                

        )
    }
    
}
