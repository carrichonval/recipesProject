import React,{useState,useEffect} from 'react';
import Select from 'react-select';
import lodash from "lodash"
import Pagination from '../../composants/Pagination';
import usePagination from '../../hooks/usePagination';
import ItemCard from './ItemCard'
import FetchDataLoader from '../../composants/FetchDataLoader'

export default function RecipesList (props){

    const [recipes,setRecipes] = useState([])
    const [searchName,setSearchName] = useState("")
    const [searchType,setSearchType] = useState("")
    const [searchNote,setSearchNote] = useState("")
    const options = [
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
    ]

    const optionsTrie = [
        {
            value:"0",
            label:"Ordre alphabétique"
        },
        {
            value:"1",
            label:"Les plus réalisés"
        },
        {
            value:"2",
            label:"Les mieux notés"
        },
    ]

    //Pagination que si l'on a + de 8 recettes
    const { next, prev, jump, currentPage, maxPage,startIndex, endIndex , paginate} = usePagination(recipes ? recipes : [],8)

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

    const trierPar = (e) => {
        switch (e.value) {
            case "0":
                let test = lodash.orderBy(recipes,["name"],["asc"])
                setRecipes(test)
                break;
            case "1":
                let test2 = lodash.orderBy(recipes,["achieve"],["desc"])
                setRecipes(test2)
                break;
            case "2":
                let test3 = lodash.orderBy(recipes,["note"],["desc"])
                setRecipes(test3)
                break;
            default:
                break;
        }
    }

    if(recipes.length == 0){
        return  <FetchDataLoader text="Récupération des données" />
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
                            options={options}
                            onChange = {(e)=>setSearchNote(e)}
                            placeholder="Filtrer par note"
                            className="w-full"
                            isClearable
                            isSearchable
                        />
                    </div>
                    <div className="flex flex-row mb-3 w-full lg:w-1/5 lg:ml-2">
                        <Select
                            options={optionsTrie}
                            onChange = {(e)=>trierPar(e)}
                            placeholder="Trier par"
                            className="w-full"
                            isClearable
                            isSearchable
                        />
                    </div>
                </div>

                <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {recipes.slice(startIndex, endIndex).map((recipe)=>{
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
                            <ItemCard recipe={recipe}/>
                        )
                    })}

                </ul>

                <Pagination currentPage={currentPage} next={next} prev={prev} jump={jump} paginate={paginate} maxPage={maxPage} />

            </div>
        </>
    )
}



