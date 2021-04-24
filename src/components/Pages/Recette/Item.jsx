import React,{useState,useEffect} from 'react';

const Item = ({type,obj,onChangeIngredient,onChangeEtape,deleteIngredient,deleteEtape}) =>{

    switch (type) {
        case "ingredient":
            return(
                <div className="p-4 border-b border-gray-300 grid grid-cols-5 gap-4">
                    <input onChange={(e)=>onChangeIngredient(e.target.value,obj.id,'name')} value={obj.name} className="col-span-2 pb-1 w-full bg-white focus:outline-none border border-gray-400 rounded-lg pt-1 px-4 appearance-none" type="text" placeholder="Nom" />
                    <input onChange={(e)=>onChangeIngredient(e.target.value,obj.id,'quantity')} value={obj.quantity} className="col-span-2 pb-1 w-full bg-white focus:outline-none border border-gray-400 rounded-lg pt-1 px-4 appearance-none" type="text" placeholder="Quantité"/>
                    <button onClick={()=>deleteIngredient(obj.id)} className="w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary hover:bg-fourth focus:outline-none focus:border-red-800 focus:shadow-outline-red active:bg-red-800 transition duration-150 ease-in-out">
                        <svg class="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"/>
                            <line x1="4" y1="7" x2="20" y2="7" />
                            <line x1="10" y1="11" x2="10" y2="17" />  
                            <line x1="14" y1="11" x2="14" y2="17" /> 
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                    </button>
                </div>
            )
        break;
        case "etape":
            return(
                <div className="p-4 border-b border-gray-300 grid grid-cols-5 gap-4">
                    <input onChange={(e)=>onChangeEtape(e.target.value,obj.id,'step')} value={obj.step} className="col-span-2 pb-1 w-full bg-white focus:outline-none border border-gray-400 rounded-lg pt-1 px-4 appearance-none" type="text" placeholder="Etape n°" />
                    <input onChange={(e)=>onChangeEtape(e.target.value,obj.id,'details')} value={obj.details} className="col-span-2 pb-1 w-full bg-white focus:outline-none border border-gray-400 rounded-lg pt-1 px-4 appearance-none" type="text" placeholder="Détails"/>
                    <button onClick={()=>deleteEtape(obj.id)} className="w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary hover:bg-fourth focus:outline-none focus:border-red-800 focus:shadow-outline-red active:bg-red-800 transition duration-150 ease-in-out">
                        <svg class="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"/>
                            <line x1="4" y1="7" x2="20" y2="7" />
                            <line x1="10" y1="11" x2="10" y2="17" />  
                            <line x1="14" y1="11" x2="14" y2="17" /> 
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                    </button>
                </div>
            )
        break;
        
    }

}

export default Item