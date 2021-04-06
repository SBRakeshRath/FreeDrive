import "./allfolder.scss";
import FolderIcon from "@material-ui/icons/Folder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import React, { useContext, useRef, useEffect } from "react";
import { OverlayContext } from "../ContextMenuContainer/overlaysContext";
import ContextMenu from "../ContextMenuContainer/contextMenu";
import { FileAndFolderContext } from "./fileAndFolderDetailscontext";
import { SelectedFolderFile } from "./../FileDisplayComponents/selectedFolderAndFile";
export default function AllFolder() {
  const { selected, updateSelected } = useContext(SelectedFolderFile);
  let folders = null;
  let files = null;
  let loading = true;
  const section = useRef(null);
  const foldersRef = useRef(null);
  const { fileAndFolder, RequiredOnesFileAndFolder } = useContext(
    FileAndFolderContext
  );
  const [fileAndFolderData] = fileAndFolder;
  const [requiredFileAndFolder] = RequiredOnesFileAndFolder;
  // console.log("requiredFileAndFolder");
  // console.log(requiredFileAndFolder);
  let previousFiles = requiredFileAndFolder.previous.file;
  let previousFolders = requiredFileAndFolder.previous.folder;
  files = requiredFileAndFolder.current.file;
  folders = requiredFileAndFolder.current.folder;
  loading = fileAndFolderData.loading;
  let FolderArray = [],
    PFolderArray = undefined;
    if(previousFolders != null && typeof previousFolders !=="undefined"){
      previousFolders = Object.values(previousFolders)
      .slice(0, 0)
      .concat(
        Object.values(previousFolders).slice(0 + 1, Object.values(previousFolders).length)
      );
    }
    let NpreviousFolders = [];
    if (Array.isArray(previousFolders)){
      // console.log("is Array")
      previousFolders.forEach((el)=>{
        NpreviousFolders = [...NpreviousFolders, el[0]];
      })
    }
  if (folders != null) {
    PFolderArray = Object.values(folders)
      .slice(0, 0)
      .concat(
        Object.values(folders).slice(0 + 1, Object.values(folders).length)
      );
  }
  if (Array.isArray(PFolderArray)) {
    PFolderArray.forEach((el) => {
      FolderArray = [...FolderArray, el[0]];
    });
  }
  //check changed folders
  // console.log(selected);
  useEffect(() => {
    if (
      typeof previousFolders !== "undefined" &&
      previousFolders !== null &&
      typeof folders !== "undefined" &&
      folders !== null
    ) {
      console.log("updated");
      let newFolder = [];
      if(Array.isArray(FolderArray) && Array.isArray(NpreviousFolders)){
        console.log("array");
        if(FolderArray === NpreviousFolders){
          console.log("matched");
        }

        let NFolderArray = []
        FolderArray.forEach((elem)=>{
          NFolderArray = [...NFolderArray,JSON.stringify(elem)]
        });
        let  NNpreviousFolders = [];
        NpreviousFolders.forEach((elem)=>{
          NNpreviousFolders = [...NNpreviousFolders,JSON.stringify(elem)]
        });
        var difference = NFolderArray.filter(x => !NNpreviousFolders.includes(x));
        if(Object.entries(difference).length > 0){
        difference.forEach(el=>{
          newFolder = [...newFolder,JSON.parse(el).folderid.toString()]
        })
        console.log(newFolder);
        }
      }
      if(newFolder !== []){
        updateSelected((prev) => {
          return { folder: newFolder, file: [] };
        });
      }
    }
  }, [requiredFileAndFolder]);
  // console.log("changed folders");

  // useEffect(()=>{
  //   console.log(foldersRef.current.children)
  // })
  //context .>>>>>>>>>>>>>>>>
  const AllFolderRefs = useRef(null);
  let posX = 0;
  let posY = 0;
  let offsetTop = 0,
    offsetLeft = 0;
  function getMousePosition(e) {
    if (AllFolderRefs != null) {
      offsetTop = AllFolderRefs.current.getBoundingClientRect().y - 5;
      offsetLeft = AllFolderRefs.current.getBoundingClientRect().x - 15;
    }
    if (e.pageX || e.pageY) {
      posX = e.pageX - offsetLeft;
      posY = e.pageY - offsetTop;
    } else if (e.clientX || e.clientY) {
      posX =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft -
        offsetLeft;
      posY =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop -
        offsetTop;
    }
  }
  let divHeight = null,
    divWidth = null;
  function MainContainerHeightWidth() {
    if (AllFolderRefs != null) {
      if (AllFolderRefs.current == null) return;
      divHeight = AllFolderRefs.current.clientHeight;
      divWidth = AllFolderRefs.current.clientWidth;
    }
  }
  const closeContextMenu = () => {
    updateSelected((prev) => {
      return { folder: [], file: [] };
    });
    SetOverlays(() => {
      return { type: "hide" };
    });
  };
  const { SetOverlays } = useContext(OverlayContext);
  const showFileOptions = (e) => {
    e.preventDefault();
    e.stopPropagation();
    getMousePosition(e);
    MainContainerHeightWidth();

    let id;
    if (e.currentTarget) {
      id = e.currentTarget.getAttribute("data-index");
    }

    SetOverlays((prev) => {
      return {
        ...prev,
        visibility: "visible",
        id: id,
        type: "file",
        mouseX: posX,
        mouseY: posY,
        divHeight: divHeight,
        divWidth: divWidth,
      };
    });
  };
  const showFolderOptions = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    getMousePosition(e);
    MainContainerHeightWidth();
    updateSelected((prev) => {
      return { folder: [key.toString()], file: [...prev.file] };
    });
    // console.log(key);
    let id;
    if (e.currentTarget) {
      id = e.currentTarget.getAttribute("selected-div");
      // console.log(id);
    }

    SetOverlays((prev) => {
      return {
        ...prev,
        visibility: "visible",
        id: id,
        type: "folder",
        mouseX: posX,
        mouseY: posY,
        divHeight: divHeight,
        divWidth: divWidth,
      };
    });
  };
  const newFolderOptions = (e) => {
    e.preventDefault();
    // console.log("context menu new");
    getMousePosition(e);
    MainContainerHeightWidth();
    let id;
    if (e.currentTarget) {
      id = e.currentTarget.getAttribute("data-index");
    }
    updateSelected((prev) => {
      return { folder: [], file: [] };
    });
    SetOverlays((prev) => {
      return {
        ...prev,
        visibility: "visible",
        id: id,
        type: "NewFolder",
        mouseX: posX,
        mouseY: posY,
        divHeight: divHeight,
        divWidth: divWidth,
      };
    });
  };
  const FolderMap = (props) => {
    return (
      <div
        className="Folder"
        extra={props.extra}
        id={props.id}
        onContextMenu={(e) => {
          showFolderOptions(e, props.id);
        }}
        selected-div="false"
        style={props.style}
        // ref = {childRef}
      >
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
        key={props.id}
        data-index={props.id}
        onContextMenu={showFileOptions}
      >
        <div className="star">
          <StarBorderIcon />
        </div>
        <div className="preview">
          <InsertDriveFileIcon />
        </div>
        <div className="name">{props.name}</div>
      </div>
    );
  };
  if (loading) {
    return (
      <>
        <p>Loading</p>
      </>
    );
  }

  return (
    <>
      <div className="AllFolder" onClick={closeContextMenu} ref={AllFolderRefs}>
        <ContextMenu />
        <section onContextMenu={newFolderOptions} ref={section}>
          <div className="folders" ref={foldersRef}>
            {/* <FolderMap /> */}
            {FolderArray != null ? (
              FolderArray.map((value, index, arr) => {
                // console.log(arr);
                let s = {};
                // console.log(selected);
                if (selected !== []) {
                  if (selected.folder.includes(value.folderid.toString())) {
                    //  console.log("founded");
                    s = { backgroundColor: "#bca3d5" };
                  }
                }
                let style = s;
                return (
                  <FolderMap
                    style={style}
                    name={value.folderName}
                    key={value.folderid}
                    id={value.folderid}
                    // extra={{ type: value[0].type }}
                  />
                );
              })
            ) : (
              <h1>There is no folder in This Directory </h1>
            )}
          </div>
          <div className="files">
            {files != null ? (
              files.map((value, index, arr) => {
                // console.log("requiredFileAndFolder map");
                // console.log(arr);
                return (
                  <FileMap
                    name={value.name}
                    key={value.id}
                    id={value.id}
                    extra={value}
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
