import "./allfolder.scss";
import FolderIcon from "@material-ui/icons/Folder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useState, useContext } from "react";
import { OverlayContext } from "./../overLays/overlaysContext";
export default function AllFolder() {
  const [FolderAndFile, updateFolderANDFiles] = useState(() => {
    return [
      { name: "New Folder", id: "1", type: "folder" },
      { name: "New Folder", id: "2", type: "folder" },
      { name: "New Folder", id: "3", type: "folder" },
      { name: "New file", id: "4", type: "file" },
      { name: "New file", id: "5", type: "file" },
      { name: "New file", id: "6", type: "file" },
      { name: "New Folder", id: "7", type: "folder" },
    ];
  });
  let folders = null;
  let files = null;
  if (FolderAndFile !== null) {
    folders = FolderAndFile.filter((obj) => obj.type === "folder");
    files = FolderAndFile.filter((obj) => obj.type === "file");
  }
  //context .>>>>>>>>>>>>>>>>

  const { overlays, SetOverlays } = useContext(OverlayContext);
  // console.log(overlays);

  //..>>>>>>>>>>>>>>>>
  //prevented default right click
  // document.addEventListener("contextmenu", (event) => {
  //   event.preventDefault();
  //   // const xPos = event.pageX + "px";
  //   // const yPos = event.pageY + "px";
  //   // console.log (xPos, yPos);
  //   // SetOverlays((prev)=>{
  //   //   return {...prev,marginTop:xPos,marginLeft:yPos}
  //   // })
  // });
  //
  //custom Right click for Files
  const showFileOptions = (e) => {
    e.preventDefault();
    console.log("rightClicked");
    SetOverlays((prev) => {
      return {  visibility: "visible" };
    });
    console.log(overlays);
  };
  const FolderMap = (props) => {
    return (
      <div className="Folder" extra={props.extra} id={props.id}>
        <div className="star">
          <StarBorderIcon />
        </div>
        <div className="preview">
          <FolderIcon />
        </div>
        <div className="name">{props.name}</div>
      </div>
    );
  };
  const FileMap = (props) => {
    return (
      <div
        className="file"
        extra={props.extra}
        id={props.id}
        onContextMenu={showFileOptions}
      >
        <div className="star">
          <StarBorderIcon />
        </div>
        <div className="preview">
          <InsertDriveFileIcon />
        </div>
        <div className="name">New File.txt</div>
      </div>
    );
  };

  console.log("folder list updated");
  console.log(folders);
  console.log(files);
  return (
    <>
      <div className="AllFolder">
        <section>
          <div className="folders">
            <FolderMap />
            {folders !== null ? (
              folders.map((value, index) => {
                return (
                  <FolderMap
                    name={value.name}
                    key={value.id}
                    id={value.id}
                    extra={{ type: value.type }}
                  />
                );
              })
            ) : (
              <h1>There is no folder in This Directory </h1>
            )}
          </div>
          <div className="files">
            {files !== null ? (
              files.map((value, index) => {
                return (
                  <FileMap
                    name={value.name}
                    key={value.id}
                    id={value.id}
                    extra={{ type: value.type }}
                  />
                );
              })
            ) : (
              <h1>There is no file in This Directory </h1>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
