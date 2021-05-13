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

  const [param, updateParam] = useState({ c: null, p: "", firsTime: false });

  const { path } = useContext(FileAndFolderContext);
  // let updatePath;
  useEffect(() => {
    

    const [paths, updatePaths] = path;
    

    function arrayEquals(a, b) {
      return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
      );
    }

    if (typeof details === "undefined") {
      details  = "id=11234path=current_folder_foroot"
    }
      const pattern = /^id=[a-zA-Z0-9_]+path=[a-zA-Z0-9_]{0,}$/;
      if (details.match(pattern)) {
        
        let paramDetails = details.split("id=");
        paramDetails = paramDetails[1].split("path=");

        const pathsArray = paramDetails[1].split("_");
        console.log("paths Array");
        console.log(pathsArray);

        if (param.c !== details) {
          updateParam((prev) => {
            return {
              ...prev,
              c: details,
              firsTime: true,
            };
          });
        } else {
          //  updateParam((prev)=>{
          //   return{
          //     ...prev,
          //     firsTime:false
          //   }
          // })
        }
        if (param.firsTime) {
          updateParam((prev) => {
            return {
              ...prev,
              // c:details,
              firsTime: false,
            };
          });
          updatePaths({ current: pathsArray, prev: pathArray });
        } else {
          updatePaths({ current: pathsArray, prev: paths.prev });
        }
      } else {
        console.log("not matched");
      }
    
    // else {
    //   updatePaths({
    //     current: ["current", "folder", "foroot"],
    //     prev: paths.prev,
    //   });
    // }
    console.log(FileAndFolderContext);
    // }
  }, [param, details]);
  return (
    <>
      <section className="main">
        <FilePath />
        <AllFolder />
      </section>
    </>
  );
}
