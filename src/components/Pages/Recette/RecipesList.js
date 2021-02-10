import React,{useState,useEffect} from 'react';
import Select from 'react-select';
import lodash from "lodash"

export default function RecipesList (props){

    const [recipes,setRecipes] = useState([])
    const [searchName,setSearchName] = useState("")
    const [searchType,setSearchType] = useState("")
    const [searchNote,setSearchNote] = useState("")

    useEffect(() => {
        fetchRecipes()
    }, []);


    const fetchRecipes = () =>{
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
                recipe.value = recipe.id
                recipe.label = recipe.type
            })
          setRecipes(json)
        })
        .catch((error) => {
            console.log(error)
        });
    }
    
    return (
        <>
        
            <div className={" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-col"}>
                <div className="flex flex-col lg:flex-row w-full">
                    <div className="flex flex-row items-center justify-center mb-3 w-full lg:w-1/3">
                        <input onChange={(e)=>setSearchName(e.target.value)} className="w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal" type="text" placeholder="Rechercher"/>
                    </div>
                    <div className="flex flex-row mb-3 w-full lg:w-1/5 lg:ml-2">
                        <Select
                            options={recipes}
                            onChange = {(e)=>setSearchType(e)}
                            placeholder="Type de recette"
                            className="w-full"
                            isClearable
                            isSearchable
                        />
                    </div>
                    <div className="flex flex-row mb-3 w-full lg:w-1/5 lg:ml-2">
                        <Select
                            options={[
                                {
                                    value:null,
                                    label:"Pas noté"
                                },
                                {
                                    value:"0",
                                    label:"0"
                                },
                                {
                                    value:"1",
                                    label:"1"
                                },
                                {
                                    value:"2",
                                    label:"2"
                                },
                                {
                                    value:"3",
                                    label:"3"
                                },
                                {
                                    value:"4",
                                    label:"4"
                                },
                                {
                                    value:"5",
                                    label:"5"
                                },
                            ]}
                            onChange = {(e)=>setSearchNote(e)}
                            placeholder="Filtrer par note"
                            className="w-full"
                            isClearable
                            isSearchable
                        />
                    </div>
                </div>

                <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {recipes.map((recipe)=>{
                        if(recipe.name.toLowerCase().search(searchName.toLowerCase()) === -1 ){
                            return null
                        }
                        if(searchType){
                            if(recipe.type.toLowerCase().search(searchType.type) === -1 ){
                                return null
                            }
                        }
                        if(searchNote){
                            if(recipe.note != searchNote.value){
                                return null
                            }
                        }

                        return(
                            <Item recipe={recipe}/>
                        )
                    })}

                </ul>

            </div>
        </>
            

    )
}

const gestionType = (type)=>{
    switch (type) {
        case "dessert":
            return (
                <span class="px-2 py-1 text-teal-800 text-xs leading-4 font-medium bg-teal-200 rounded-full">{type}</span>
            )
        case "entree":
            return(
                <span class="px-2 py-1 text-teal-800 text-xs leading-4 font-medium bg-green-200 rounded-full">{type}</span>
            )
        case "plat":
            return(
                <span class="px-2 py-1 text-teal-800 text-xs leading-4 font-medium bg-blue-200 rounded-full">{type}</span>
            )
        default:
            break;
    }
}


const Item = ({recipe})=>{
    return(
        <li class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow">
        <div class="flex-1 flex flex-col p-8">
          <img class="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt=""/>
          <h3 class="mt-6 text-gray-900 text-sm leading-5 font-medium">{recipe.name}</h3>
          <dl class="mt-1 flex-grow flex flex-col justify-between">
            <dt class="sr-only">Title</dt>
            <dd class="text-gray-500 text-sm leading-5">{recipe.comment}</dd>
            <dt class="sr-only">Role</dt>
            <dd class="mt-3">
             {gestionType(recipe.type)}
            </dd>
          </dl>
        </div>
        <div class="border-t border-gray-200">
          <div class="-mt-px flex">
            <div class="w-0 flex-1 flex border-r border-gray-200">
              <a class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg transition ease-in-out duration-150">
              <svg class="h-5 w-5 text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
</svg>

                <span class="ml-3">{recipe.note ? recipe.note + "/5" : "Pas encore noté"}</span>
              </a>
            </div>
            <div class="-ml-px w-0 flex-1 flex">
              <a class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-br-lg transition ease-in-out duration-150">
              <svg class="h-5 w-5 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="9 11 12 14 20 6" />  <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>
                <span class="ml-3">{recipe.achieve <=1 ? recipe.achieve + "achieve" : recipe.achieve + " achieves"} </span>
              </a>
            </div>
          </div>
        </div>
      </li>
    )
}

