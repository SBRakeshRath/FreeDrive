import FilePath from "./filePath";
import AllFolder from "./allFolder";
import { useContext, useState, useEffect } from "react";
import "./Main.scss";
// import {FileAndFolderContext} from "./fileAndFolderDetailscontext";
import { useParams } from "react-router-dom";
import { FileAndFolderContext } from "./fileAndFolderDetailscontext";
import { Redirect } from "react-router-dom";

// import {SelectedFolderFileProvider} from "./selectedFolderAndFile"
export default function Main(props) {
  const [pathArray, updatePathArray] = useState();
  let { details } = useParams();
  console.log(details);
  const[param,updateParam] = useState({c:null,p:"",firsTime:false});
  console.log(param);
  
  
  const { path } = useContext(FileAndFolderContext);
  // let updatePath;
  useEffect(() => {
    console.log("useLay main ---------------------[-------")
    console.log(param);
    
    const [paths, updatePaths] = path;
    console.log("paths");
    console.log(paths);
    function arrayEquals(a, b) {
      return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
      );
    }
    console.log("details" + details)

    if (typeof details !== "undefined") {
      const pattern = /^id=[0-9]+path=[a-zA-Z0-9_]{0,}$/;
      if (details.match(pattern)) {
        // console.log("matched");
        let paramDetails = details.split("id=");
        paramDetails = paramDetails[1].split("path=");
        console.log(paramDetails);
        const pathsArray = paramDetails[1].split("_");
        console.log("paths Array");
        console.log(pathsArray);
        console.log(":teeeeeeeeeeeeeest");
          console.log(pathsArray);
          console.log(paths);
          console.log("-----------------------------")
          console.log(param);
         if(param.c !== details){
           console.log("not equal 0000000000000000000000000000000 \n\n\n");
           updateParam((prev)=>{
             return{
               ...prev,
               c:details,
               firsTime:true
             }
           })
         }else {console.log("equal 111111111111111111111111111111111\n\n\n\n")
        
        //  updateParam((prev)=>{
        //   return{
        //     ...prev,
        //     firsTime:false
        //   }
        // })
        }
        if(param.firsTime){
          console.log("firstTime2222222222222222222222222222");
          updateParam((prev)=>{
            return{
              ...prev,
              // c:details,
              firsTime:false
            }
          })
          updatePaths({current:pathsArray,prev:pathArray});
        }else{
          updatePaths({current:pathsArray,prev:paths.prev});
        }
        console.log("imp..................." + param.firsTime)
          // console.log("not equal")
          // updateParam({c:details,p:param.c});
          // updatePaths({current:pathsArray,prev:paths.prev});
        
      } else {
        console.log("not matched");
      }
    }else{
      // updatePaths({current:paths.current,prev:paths.current});
    }
    console.log(FileAndFolderContext);
  // }
  }, [param,details]);
  return (
    <>
      <section className="main">
        <FilePath />
        <AllFolder />
      </section>
    </>
  );
}
