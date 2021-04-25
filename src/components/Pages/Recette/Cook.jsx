import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie'
import build from "../../lotties/build.json" 
export default function Cook (props){

    console.log(window.innerHeight,window.innerWidth)

    const [h,setH] = useState(500)

    useEffect(()=>{
        if(window.innerWidth > 800){
            setH(500)
        }else{
            setH(300)
        }
    },[])

    const buildOpts = {
        loop: true,
        autoplay: true,
        animationData: build,
    };
    
    return (
        <>
        
            <div className={" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-col"}>
                <div className="flex flex-row items-center justify-center mb-4 w-full justify-center text-xl text-fourth font-bold">
                   Cette page est en cours de construction ...
                </div>
                <Lottie
                        options={buildOpts}
                        isClickToPauseDisabled={true}
                        height={h}
                        width={window.innerWidth-100}
                    />
            </div>
        </>
            

    )
}
