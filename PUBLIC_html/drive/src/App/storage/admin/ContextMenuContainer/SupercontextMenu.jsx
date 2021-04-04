import { useRef, useState, useLayoutEffect ,useContext  } from "react";
import { OverlayContext } from "../ContextMenuContainer/overlaysContext";
import positionContextMenu from "./positionContextMenu";
import {FileAndFolderContext} from "./../FileDisplayComponents/fileAndFolderDetailscontext";

export default function NewFolderMaker(props) {
  const container = useRef(null);
  const [style, UStyle] = useState({
    marginLeft: props.mouseX,
    marginTop: props.mouseY,
    position: "absolute",
  });
  useLayoutEffect(() => {
    positionContextMenu(props, container, UStyle);
  }, [props]);

//newFolder Maker
const { SetOverlays } = useContext(OverlayContext);
const{RequiredOnesFileAndFolder} = useContext(FileAndFolderContext);
const [requiredFileAndFolder] = RequiredOnesFileAndFolder;
const makeNewFolder = (e)=>{
  e.stopPropagation();
  // console.log("clicked");
SetOverlays((prev)=>{
  return {
    ...prev,
    type:"NewFolderMaker"
  }
})
}
 
 
  return (
    <div className="fileOptions" style={style} ref={container}>
      <ul>
        <li onClick= {makeNewFolder} >New Folder</li>
        <li>Upload Folder</li>
        <li>Upload File</li>
      </ul>
    </div>
  );
}
