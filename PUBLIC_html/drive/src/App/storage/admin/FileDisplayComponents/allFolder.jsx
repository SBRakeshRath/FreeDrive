import "./allfolder.scss";
import FolderIcon from "@material-ui/icons/Folder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import React, { useContext, useRef, useLayoutEffect } from "react";
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
  let previousFolders = requiredFileAndFolder.previous.folder;
  files = requiredFileAndFolder.current.file;
  folders = requiredFileAndFolder.current.folder;
  loading = fileAndFolderData.loading;
  //sorting folder Array
  let FolderArray = [],
    PFolderArray = undefined;
  if (previousFolders != null && typeof previousFolders !== "undefined") {
    previousFolders = Object.values(previousFolders)
      .slice(0, 0)
      .concat(
        Object.values(previousFolders).slice(
          0 + 1,
          Object.values(previousFolders).length
        )
      );
  }
  let NpreviousFolders = [];
  if (Array.isArray(previousFolders)) {
    previousFolders.forEach((el) => {
      NpreviousFolders = [...NpreviousFolders, el[0]];
    });
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
  console.log("3333333333333333333333333333333\n\n\n\n\n\n\n\n");
  console.log(selected);
  console.log(requiredFileAndFolder);
  console.log(previousFolders);
  useLayoutEffect(() => {
    console.log("invoke");
    console.log(Object.keys(requiredFileAndFolder.current.folder).length);
    console.log(Object.keys(requiredFileAndFolder.previous.folder).length);
    console.log(selected);
    const AfterApiCall = (
      previousFolders,
      FolderArray,
      type,
      foldersRef,
      NpreviousFolders
    ) => {
      if (
        typeof previousFolders !== "undefined" &&
        previousFolders !== null &&
        typeof foldersRef !== "undefined" &&
        typeof type !== "undefined" &&
        typeof FolderArray !== "undefined" &&
        // folders !== null &&
        typeof NpreviousFolders !== "undefined" &&
        FolderArray !== NpreviousFolders
      ) {
        if (previousFolders.length === 0) return;
        let newFolder = [];
        let NNpreviousFolders = [];
        let NFolderArray = [];
        if (Array.isArray(FolderArray) && Array.isArray(NpreviousFolders)) {
          FolderArray.forEach((elem) => {
            NFolderArray = [...NFolderArray, JSON.stringify(elem)];
          });

          NpreviousFolders.forEach((elem) => {
            NNpreviousFolders = [...NNpreviousFolders, JSON.stringify(elem)];
          });
          var difference = NFolderArray.filter(
            (x) => !NNpreviousFolders.includes(x)
          );
          if (Object.entries(difference).length > 0) {
            difference.forEach((el) => {
              newFolder = [...newFolder, JSON.parse(el).folderid.toString()];
            });
          }
        }
        if (type === "folder") {
          if (newFolder !== []) {
            updateSelected((prev) => {
              return { folder: newFolder, file: [] };
            });
          }
        }
        if (newFolder !== [] && FolderArray !== []) {
          FolderArray.forEach((e) => {
            if (e.folderid.toString() === newFolder[0]) {
              let el = JSON.stringify(e);
              if (NFolderArray.includes(el)) {
                let node = NFolderArray.indexOf(el);
                if (foldersRef !== null) {
                  if (foldersRef.current === null) return;
                  if (typeof foldersRef.current.children[node] === "undefined")
                    return;
                  const folderC = foldersRef.current.children[node];
                  const sectionC = section.current;
                  if (
                    // sectionC.scrollTop === true &&
                    folderC.offsetTop &&
                    sectionC.offsetHeight &&
                    folderC.offsetHeight
                  ) {
                    sectionC.scrollTop =
                      folderC.offsetTop -
                      sectionC.offsetHeight +
                      folderC.offsetHeight;
                    console.log("updated");
                  }
                }
              }
            }
          });
        }
      }
    };
    AfterApiCall(
      previousFolders,
      FolderArray,
      "folder",
      foldersRef,
      NpreviousFolders
    );
  }, [requiredFileAndFolder]);
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

    let id;
    if (e.currentTarget) {
      id = e.currentTarget.getAttribute("selected-div");
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
  // if (loading) {
  //   return (
  //     <>
  //       <p>Loading</p>
  //     </>
  //   );
  // }
  if (fileAndFolderData.count === 1) {
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
                let s = {};

                if (selected !== []) {
                  if (selected.folder.includes(value.folderid.toString())) {
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
