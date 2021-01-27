import React,{useState,useEffect} from 'react';

export default function RecipesList (props){

    const [recipes,setRecipes] = useState([])

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
          setRecipes(json)
        })
        .catch((error) => {
            
        });
    }
    
    return (
        <>
        
            <div className={" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-col"}>
                <div className="flex flex-row items-center justify-center mb-3 w-full lg:w-1/3">
                    Liste des recettes
                </div>
                
            </div>
        </>
            

    )
}
