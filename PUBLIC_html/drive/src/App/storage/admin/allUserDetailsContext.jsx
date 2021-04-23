import React, {
    createContext,
  } from "react";

  export const allUserDetailsContexts = createContext();
  let userTOKEN = null;
  export const AllUserDetailsContextsProvider = ({children})=>{
    var cookie = document.cookie.split(";");
    let ImpCookie = null;
    cookie.forEach((element) => {
        let cookies = element.split("=");
        if("userToken" === cookies[0].trim()) ImpCookie = cookies;
    });
    // console.log("cookies");
    // console.log("ImpCookie" + ImpCookie);
    if(ImpCookie !== null || sessionStorage.getItem("userToken") !== null){
        
        ImpCookie !== null
        ? (userTOKEN = ImpCookie[1].trim())
        : (userTOKEN = sessionStorage.getItem("userToken"));
    }
    //apiS
    const NewFolderMakerApi = "http://localhost/GoogleDrive/PUBLIC_html/phpBakend/newFolderMaker.php"
    const deleteFolderFileApi =  "http://localhost/GoogleDrive/PUBLIC_html/phpBakend/moveBinFolderFile.php"

    return <allUserDetailsContexts.Provider value = {{userTOKEN,NewFolderMakerApi,deleteFolderFileApi}}>
        {children}
    </allUserDetailsContexts.Provider>
  } 