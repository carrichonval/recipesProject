import React,{useState,useEffect} from 'react';

export default function UserList (props){

    const [users,setUsers] = useState([])

    useEffect(() => {
        fetchUsers()
    }, []);

    const fetchUsers = () =>{
        fetch(process.env.REACT_APP_API_URL+'/users', {
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
          setUsers(json)
        })
        .catch((error) => {
            
        });
    }
    return (
        <>
        
            <div className={" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-col"}>
                <div className="flex flex-row items-center justify-center mb-3 w-full lg:w-1/3">
                    Liste des utilisateurs
                </div>
                
            </div>
        </>
            

    )
}
