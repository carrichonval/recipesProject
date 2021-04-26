import React, { useState } from 'react';
import Select from 'react-select';
import Item from './Item'
import lodash from 'lodash'
import {getUserAuth} from '../../functions/auth'

export default function Creation (props){

    const [success,setSuccess] = useState(false)


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
    
    const [recipe,setRecipe] = useState({
        name:"",
        type:"",
        comment:"",
        ingredients:[
            {
                id:1,
                name:"",
                quantity:""
            }
        ],
        etapes:[
            {
                id:1,
                step:"",
                details:""
            }
        ]
    })



    const getLastID = (list) => {
        let last = lodash.maxBy(list,"id")
        return last.id ++
    }

    const addIngredient = () => {
        if(recipe.ingredients.length == 0){
            //On ajoute l'id n°1
            setRecipe({...recipe,ingredients:[...recipe.ingredients,{id:1,name:'',quantity:''}]})
        }else{
            //On récupère le dernier ID et on fait +1
            setRecipe({...recipe,ingredients:[...recipe.ingredients,{id:getLastID(recipe.ingredients),name:'',quantity:''}]})
        }
    }

    const addEtape = () =>{
        if(recipe.etapes.length == 0){
            //On ajoute l'id n°1
            setRecipe({...recipe,etapes:[...recipe.etapes,{id:1,step:'',details:''}]})
        }else{
            //On récupère le dernier ID et on fait +1
            setRecipe({...recipe,etapes:[...recipe.etapes,{id:getLastID(recipe.etapes),step:'',details:''}]})
        }
    }

    const onChangeIngredient = (e,id,attr) =>{
        let ingredients = JSON.parse(JSON.stringify(recipe.ingredients))
        ingredients = lodash.forEach(ingredients,(ing)=>{
            if(ing.id == id){
                ing[attr] = e
            }
        })
        setRecipe({...recipe,ingredients:ingredients})
    }

    const onChangeEtape = (e,id,attr) =>{
        let etapes = JSON.parse(JSON.stringify(recipe.etapes))
        etapes = lodash.forEach(etapes,(etape)=>{
            if(etape.id == id){
                etape[attr] = e
            }
        })
        setRecipe({...recipe,etapes:etapes})
    }

    const deleteIngredient = (id) =>{
        let ingredients = JSON.parse(JSON.stringify(recipe.ingredients))
        let updateIngredients = []
        lodash.forEach(ingredients,(ing)=>{
            if(ing.id != id){
                updateIngredients.push(ing)
            }
        })
        setRecipe({...recipe,ingredients:updateIngredients})
    }

    const deleteEtape = (id) => {
        let etapes = JSON.parse(JSON.stringify(recipe.etapes))
        let updateEtapes = []
        lodash.forEach(etapes,(etape,i)=>{
            if(etape.id != id){
                updateEtapes.push(etape)
            }
        })
        setRecipe({...recipe,etapes:updateEtapes})
    }

    const enregistrerRecette = async () => {
        let recette = await fetchRecetteID();
        let recette_id = recette.id

        for await (const ingredient of recipe.ingredients) {
            let addI = await fetchAddIngredient(recette_id,ingredient)
        }

        for await (const etape of recipe.etapes) {
            let addE = await fetchAddEtape(recette_id,etape)
        }
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 1500);
        setTimeout(()=>{
            props.history.push('/recipes')
        },1500)
       
    }

    const fetchRecetteID = () =>{
        const response = fetch(process.env.REACT_APP_API_URL+'/recettes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                recipe:recipe,
                user_id:getUserAuth().id
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((json) => {
            return json
        })
        .catch((error) => {
            console.log(error)
        });

        return response
    }

    const fetchAddIngredient = (recette_id,ingredient) =>{
        const response = fetch(process.env.REACT_APP_API_URL+'/ingredients', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'name':ingredient.name,
                'quantity':ingredient.quantity,
                'recette_id':recette_id,
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((json) => {
            return json
        })
        .catch((error) => {
            console.log(error)
        });

        return response
    }

    const fetchAddEtape = (recette_id,etape) =>{
        const response = fetch(process.env.REACT_APP_API_URL+'/etapes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'step':etape.step,
                'detail':etape.details,
                'recette_id':recette_id,
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((json) => {
            return json
        })
        .catch((error) => {
            console.log(error)
        });

        return response
    }
    

    console.log(recipe)
    return (
        <>
        
            <div className={" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-col"}>
                <div className="flex flex-row items-center justify-center mb-4 w-full justify-center text-2xl text-fourth font-bold">
                    Créer ta recette !
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
                                        Ta recette a bien été ajouté !
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                :null}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="my-3">
                        <input value={recipe.name} onChange={(e)=>setRecipe({...recipe,name:e.target.value}) } className="pb-1 w-full bg-white focus:outline-none focus:shadow-outline border border-gray-500 rounded-lg py-2 px-4 block appearance-none leading-normal" type="text" placeholder="Nom de la recette"/>
                    </div>
                    <div className="my-3">
                        <Select
                            options={typeRecipes}
                            onChange={(e)=>setRecipe({...recipe,type:e}) }
                            placeholder="Type de recette"
                            className="w-full"
                            isClearable
                            isSearchable
                            value={recipe.type}
                        />
                    </div>
                    <div className="my-3">
                        <input value={recipe.comment} onChange={(e)=>setRecipe({...recipe,comment:e.target.value}) } className="pb-1 w-full bg-white focus:outline-none border border-gray-500 rounded-lg py-2 px-4 block appearance-none leading-normal" type="text" placeholder="Commentaire"/>
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
                                        <Item key={ingredient.id} deleteIngredient={deleteIngredient} deleteEtape={deleteEtape} onChangeEtape={onChangeEtape} onChangeIngredient={onChangeIngredient} obj={ingredient} type="ingredient" />
                                    )
                                })}

                                <div className="p-4 border-gray-300 grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <button onClick={addIngredient} className="w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary hover:bg-fourth focus:outline-none focus:border-red-800 focus:shadow-outline-red active:bg-red-800 transition duration-150 ease-in-out">
                                        Ajouter un ingrédient
                                    </button>
                                </div>
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
                                        <Item key={etape.id} deleteIngredient={deleteIngredient} deleteEtape={deleteEtape} onChangeEtape={onChangeEtape} onChangeIngredient={onChangeIngredient} obj={etape} type="etape" />
                                    )
                                })}
                                
                                <div className="p-4 border-gray-300 grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <button onClick={addEtape} className="w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary hover:bg-fourth focus:outline-none focus:border-red-800 focus:shadow-outline-red active:bg-red-800 transition duration-150 ease-in-out">
                                        Ajouter une étape
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                    <div className="my-5 grid grid-cols-1 md:grid-cols-3">
                        <button onClick={enregistrerRecette} className="w-full md:col-start-2 flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary hover:bg-fourth focus:outline-none focus:border-red-800 focus:shadow-outline-red active:bg-red-800 transition duration-150 ease-in-out">
                            Enregistrer la recette
                        </button>
                    </div>
                
            </div>
        </>
            

    )
}
