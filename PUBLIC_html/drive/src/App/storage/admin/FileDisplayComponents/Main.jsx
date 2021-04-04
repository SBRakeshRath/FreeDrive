import FilePath from "./filePath";
import AllFolder from "./allFolder";
import {useContext} from "react";
import "./Main.scss";
import {FileAndFolderContext} from "./fileAndFolderDetailscontext";
export default function Main() {
  const {fileAndFolderData} = useContext(FileAndFolderContext);
  // let loading = true;
  // loading = 
  // if(fileAndFolderData.loading){
  //   return(
  //     <p>Loading......</p>
  //   )
  // }
  return (
    <>
      <section className="main">
        {/* <FileAndFolderContextProvider> */}
          <FilePath />
          <AllFolder />
        {/* </FileAndFolderContextProvider> */}
      </section>
    </>
  );
}
