import NewFolderMaker from "./NewFolderMaker";
import FileOptions from "./FileOptions";
import FolderOptions from "./FileOptions";
import { OverlayContext } from "./overlaysContext";
import React, { useContext } from "react";
export default function Overlay(props) {
  const { overlays , SetOverlays } = useContext(OverlayContext);
//   console.log(overlays);
const close = ()=>{
    if(overlays.visibility === 'visible'){
        console.log("clicked");
        SetOverlays((prev)=> {return {...prev , visibility: 'hidden'}})
    }
}
  return (
    <div className="Overlays" style = {{visibility:overlays.visibility}} onClick = {close}>
      <h1>This is an overlay</h1>
    </div>
  );
}
