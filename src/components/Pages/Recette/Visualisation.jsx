import React, { useState ,useEffect} from 'react';
import Select from 'react-select';
import {getUserAuth} from '../../functions/auth'
import {useParams,useLocation} from 'react-router-dom'
import FetchDataLoader from '../../composants/FetchDataLoader'
import lodash from 'lodash'

export default function Creation (props){

    const params = useParams()
    const location = useLocation()
    const [recipe,setRecipe] = useState(null)
    const [note,setNote] = useState(0)
    const [success,setSuccess] = useState(false)
    const [error,setError] = useState(false)
    const [showModal,setShowModal] = useState(false)
    const [haveNote,setHaveNote] = useState(false)

    
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
    
    // Recupere l'object si on provient d'un lien, sinon on appel l'api pour récuperer l'utilisateur
    useEffect(() => {
        console.log(location)
        if(!location.state){
            fetchRecipe()
        }else{
            setRecipe(location.state.recipe)
           
        }
    }, []);

    const fetchRecipe = () =>{
        fetch(process.env.REACT_APP_API_URL+'/recettes/'+params.id, {
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
            let type = lodash.find(typeRecipes,(type)=>{
                return type.label == json.type
            })
            json.type = type
            setRecipe(json)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    const checkNote = () =>{
        console.log(recipe)
        let find = lodash.find(recipe.recette_notes,(note)=>{
            return note.user_id == getUserAuth().id
        })
        if(find){
            setHaveNote(true)
        }else{
            setHaveNote(false)
        }
        
        setShowModal(true)
    }

    const noter = () =>{
        setShowModal(false)
        fetch(process.env.REACT_APP_API_URL+'/notes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                recette_id: recipe.id,
                user_id: getUserAuth().id,
                note: note
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
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 2000);
        })
        .catch((error) => {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2000);
            console.log(error)
        });
    }
    

    if(recipe == null){
        return <FetchDataLoader text="Récupérations des informations"></FetchDataLoader>
    }else{
    return (
        <>
            <div className={" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-col"}>
                <div className="flex flex-row items-center justify-center mb-4 w-full justify-center text-2xl text-fourth font-bold">
                    Détails de la recette
                </div>
                {success ?
                    <div className="flex w-full">
                        <div className="rounded-md bg-green-200 p-2 mt-2  w-full">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm leading-5 font-medium text-green-800">
                                        Ta note a bien été ajouté !
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                :null}
                {error ?
                    <div className="flex w-full">
                        <div className="rounded-md bg-red-200 p-2 mt-2  w-full">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm leading-5 font-medium text-red-800">
                                        Une erreur s'est produite lors de l'ajout de ta note :/
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                :null}
                {showModal ?

                    <div class="fixed z-10 inset-0 overflow-y-auto">
                        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                        <div class="fixed inset-0 transition-opacity">
                            <div onClick={() => setShowModal(false)}  class="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

                        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div>
                            {haveNote ? 
                                <div class="mt-3 text-center sm:mt-5">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                        Tu as déjà noté cette recette
                                    </h3>
                                    <div class="mt-2">
                                       
                                    </div>
                                </div>
                            :
                                <div class="mt-3 text-center sm:mt-5">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                        Choisir une note
                                    </h3>
                                    <div class="mt-2">
                                        <select value={note} onChange={(e)=>setNote(e.target.value)}>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                </div>
                            }
                            </div>
                            <div class="mt-5 sm:mt-6">
                                {haveNote ?
                                    <span class="flex w-full rounded-md shadow-sm">
                                        <button onClick={()=>setShowModal(false)} type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-second text-base leading-6 font-medium text-white shadow-sm hover:bg-fourth focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                            Retour
                                        </button>
                                    </span>
                                :
                                    <span class="flex w-full rounded-md shadow-sm">
                                        <button onClick={()=>noter()} type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-second text-base leading-6 font-medium text-white shadow-sm hover:bg-fourth focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                            Valider ma note
                                        </button>
                                    </span>
                                }
                            </div>
                        </div>
                        </div>
                    </div>

                    :null}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="my-3">
                        <input readOnly={true} value={recipe.name} className="pb-1 w-full bg-white focus:outline-none focus:shadow-outline border border-gray-500 rounded-lg py-2 px-4 block appearance-none leading-normal" type="text" placeholder="Nom de la recette"/>
                    </div>
                    <div className="my-3">
                        <Select
                            options={typeRecipes}
                            placeholder="Type de recette"
                            className="w-full"
                            value={recipe.type}
                        />
                    </div>
                    <div className="my-3">
                        <input readOnly={true} value={recipe.comment} className="pb-1 w-full bg-white focus:outline-none border border-gray-500 rounded-lg py-2 px-4 block appearance-none leading-normal" type="text" placeholder="Commentaire"/>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 lg:mt-12">

                    <div className="my-3 grid grid-cols-1 ">
                        <div className="bg-white shadow overflow-hidden rounded-lg">
                            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Ingrédients
                                </h3>
                            </div>
                            <div>

                                {recipe.ingredients.map((ingredient)=>{
                                    return(
                                        <div className="p-4 border-b border-gray-300 grid grid-cols-2 gap-4">
                                            <input readOnly={true} value={ingredient.name} className=" pb-1 w-full bg-white focus:outline-none rounded-lg pt-1 px-4 appearance-none" type="text" placeholder="Nom" />
                                            <input readOnly={true} value={ingredient.quantity} className=" pb-1 w-full bg-white focus:outline-none rounded-lg pt-1 px-4 appearance-none" type="text" placeholder="Quantité"/>
                                        </div> 
                                    )
                                })}

                            </div>
                        </div>
                    </div>

                    <div className="my-3 grid grid-cols-1">
                        <div className="bg-white shadow overflow-hidden rounded-lg">
                            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Etapes
                                </h3>
                            </div>
                            <div>
                                {recipe.etapes.map((etape)=>{
                                    return(
                                        <div className="p-4 border-b border-gray-300 grid grid-cols-5 gap-4">
                                            <input readOnly={true} value={etape.step} className=" pb-1 w-full bg-white focus:outline-none  rounded-lg pt-1 px-4 appearance-none" type="text" placeholder="Nom" />
                                            <input readOnly={true} value={etape.detail} className="col-span-4 pb-1 w-full bg-white focus:outline-none  rounded-lg pt-1 px-4 appearance-none" type="text" placeholder="Quantité"/>
                                        </div> 
                                    )
                                })}
                                
                                
                            </div>
                        </div>
                    </div>

                </div>
                   {getUserAuth() ? 
                        <div className="my-5 grid grid-cols-1 md:grid-cols-3">
                            <button onClick={()=>checkNote()} className="w-full md:col-start-2 flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary hover:bg-fourth focus:outline-none focus:border-red-800 focus:shadow-outline-red active:bg-red-800 transition duration-150 ease-in-out">
                                Noter la recette
                            </button>
                        </div>
                    :null}
                
            </div>
        </>
            

    )
    }
}
