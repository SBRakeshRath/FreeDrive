import React,{useState,createContext} from "react";

export const  SmallMessageContext  = createContext();
// import {FileAndFolderContext} from ""

export const  SmallMessageContextProvider = ({children})=>{
    const[message,setMessage] = useState({message:"Loading...",display:"hidden",type:null});

return < SmallMessageContext.Provider value = {{message,setMessage}}>
   
   {children}
   
   </SmallMessageContext.Provider>
}