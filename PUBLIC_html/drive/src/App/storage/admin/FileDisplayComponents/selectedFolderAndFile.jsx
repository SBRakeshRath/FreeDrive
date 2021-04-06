import {useState,createContext} from "react";
export const SelectedFolderFile = createContext();
export const SelectedFolderFileProvider = ({children})=>{
    const [selected,updateSelected]= useState(()=>{
        return{ folder:[],file:[]}
    })
    return <SelectedFolderFile.Provider value = {{selected,updateSelected}}>
    {children}
    </SelectedFolderFile.Provider>
}