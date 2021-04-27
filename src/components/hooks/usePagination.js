import { useState,useEffect } from "react";

/*
 A recuperer sous la forme 

 const {next,prev,jump,paginate,currentPage,maxPage,startIndex,endIndex} = usePagination(datas,elementPerPage)

 OU

 const pagination = usePagination(datas,elementPerPage)

*/


//Gestionnaire de pagination ( par default, 5 elements par page )
const usePagination = (data, itemsPerPage = 5 ) => {

 //Initialisation des variables

 //Page actuelle
 const [currentPage, setCurrentPage] = useState(1);

 //Index de départ
 const [startIndex,setStartIndex] = useState(0)

 //Index de fin
 const endIndex = currentPage * itemsPerPage

 //Nombre de page maximale
 const maxPage = Math.ceil(data.length / itemsPerPage);

 //Indique si la pagination est necessaire ou non par un boolean
 const [paginate,setPaginate] = useState(false)

 //Modifie le boolean pour savoir la pagination est necessaire selon le nombre d'elements par page et d'element total
 useEffect(() => {
     if(data.length <= itemsPerPage){
         setPaginate(false)
     }else{
         setPaginate(true)
     }
 }, [data])

 //Fonction pour passer à la page suivante
 function next() {
     setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
     setStartIndex((startIndex)=> startIndex + itemsPerPage)
 }

 //Fonction pour passer à la page précédente
 function prev() {
     setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
     setStartIndex((startIndex)=> startIndex - itemsPerPage)
 }

 //Fonction pour passer à une page indiqué
 function jump(page) {
     const pageNumber = Math.max(1, page);
     setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
     setStartIndex((startIndex) => (page * itemsPerPage) - itemsPerPage )
 }

 //Retourn les variables et les fonctions
 return { next, prev, jump, currentPage, maxPage,startIndex, endIndex , paginate};
}


export default usePagination;