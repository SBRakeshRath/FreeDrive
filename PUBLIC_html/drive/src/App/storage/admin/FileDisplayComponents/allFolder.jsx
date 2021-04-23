import "./allfolder.scss";
// import FolderIcon from "@material-ui/icons/Folder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import React, { useContext, useRef,  useState } from "react";
import { SetOverlayContext } from "../ContextMenuContainer/overlaysContext";
import ContextMenu from "../ContextMenuContainer/contextMenu";
import { FileAndFolderContext } from "./fileAndFolderDetailscontext";
import { SelectedFolderFile } from "./../FileDisplayComponents/selectedFolderAndFile";
// import { useHistory } from "react-router-dom";
import { SmallMessageContext } from "./SmallMessageContext";
import TestingFolderMap from "./FolderMap";
// import Tester from "./Tester";
function AllFolder() {
  // console.time();
  console.log("last -1");
  // const history = useHistory();
  const [i, j] = useState(1);
  const {  updateSelected } = useContext(SelectedFolderFile);
  // let folders = null;
  // let files = null;
  // let loading = true;
  const section = useRef(null);
  // const foldersRef = useRef(null);
  const { fileAndFolder, RequiredOnesFileAndFolder } = useContext(
    FileAndFolderContext
  );
  const [fileAndFolderData] = fileAndFolder;
  const [requiredFileAndFolder] = RequiredOnesFileAndFolder;
  let previousFolders = requiredFileAndFolder.previous.folder;
  // let files = requiredFileAndFolder.current.file;
  // let folders = requiredFileAndFolder.current.folder;
  let files = React.useMemo(() => {
    return requiredFileAndFolder.current.file;
  }, [requiredFileAndFolder]);
  let folders = React.useMemo(() => {
    console.log("rendering 2");
    return requiredFileAndFolder.current.folder;
  }, [requiredFileAndFolder]);
  // loading = fileAndFolderData.loading;
  //sorting folder Array
  let FolderArray = [],
    PFolderArray = undefined;
  let NpreviousFolders = [];
  function data() {
    console.log("data");
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
  }
  data();
  const arrayMapFolder = React.useMemo(() => {
    console.log("folderMApssssssssssssssssssssssssssss");
    const c = Object.values(folders)
      .slice(0, 0)
      .concat(
        Object.values(folders).slice(0 + 1, Object.values(folders).length)
      );
    let d = [];
    if (Array.isArray(c)) {
      c.forEach((el) => {
        d = [...d, el[0]];
      });
    }
    return d;
  }, [folders]);
  // useLayoutEffect(() => {
  //   console.log("invoke");
  //   // console.log(Object.keys(requiredFileAndFolder.current.folder).length);
  //   // console.log(Object.keys(requiredFileAndFolder.previous.folder).length);
  //   // console.log(selected);
  //   const AfterApiCall = (
  //     previousFolders,
  //     FolderArray,
  //     type,
  //     foldersRef,
  //     NpreviousFolders
  //   ) => {
  //     if (
  //       typeof previousFolders !== "undefined" &&
  //       previousFolders !== null &&
  //       typeof foldersRef !== "undefined" &&
  //       typeof type !== "undefined" &&
  //       typeof FolderArray !== "undefined" &&
  //       // folders !== null &&
  //       typeof NpreviousFolders !== "undefined" &&
  //       FolderArray !== NpreviousFolders
  //     ) {
  //       if (previousFolders.length === 0) return;
  //       let newFolder = [];
  //       let NNpreviousFolders = [];
  //       let NFolderArray = [];
  //       if (Array.isArray(FolderArray) && Array.isArray(NpreviousFolders)) {
  //         FolderArray.forEach((elem) => {
  //           NFolderArray = [...NFolderArray, JSON.stringify(elem)];
  //         });

  //         NpreviousFolders.forEach((elem) => {
  //           NNpreviousFolders = [...NNpreviousFolders, JSON.stringify(elem)];
  //         });
  //         var difference = NFolderArray.filter(
  //           (x) => !NNpreviousFolders.includes(x)
  //         );
  //         if (Object.entries(difference).length > 0) {
  //           difference.forEach((el) => {
  //             newFolder = [...newFolder, JSON.parse(el).folderid.toString()];
  //           });
  //         }
  //       }
  //       if (type === "folder") {
  //         if (newFolder !== []) {
  //           updateSelected((prev) => {
  //             return { folder: newFolder, file: [] };
  //           });
  //         }
  //       }
  //       if (newFolder !== [] && FolderArray !== []) {
  //         FolderArray.forEach((e) => {
  //           if (e.folderid.toString() === newFolder[0]) {
  //             let el = JSON.stringify(e);
  //             if (NFolderArray.includes(el)) {
  //               let node = NFolderArray.indexOf(el);
  //               if (foldersRef !== null) {
  //                 if (foldersRef.current === null) return;
  //                 if (typeof foldersRef.current.children[node] === "undefined")
  //                   return;
  //                 const folderC = foldersRef.current.children[node];
  //                 const sectionC = section.current;
  //                 if (
  //                   // sectionC.scrollTop === true &&
  //                   folderC.offsetTop &&
  //                   sectionC.offsetHeight &&
  //                   folderC.offsetHeight
  //                 ) {
  //                   sectionC.scrollTop =
  //                     folderC.offsetTop -
  //                     sectionC.offsetHeight +
  //                     folderC.offsetHeight;
  //                   console.log("updated");
  //                 }
  //               }
  //             }
  //           }
  //         });
  //       }
  //     }
  //   };
  //   // AfterApiCall(
  //   //   previousFolders,
  //   //   FolderArray,
  //   //   "folder",
  //   //   foldersRef,
  //   //   NpreviousFolders
  //   // );
  // }, [requiredFileAndFolder]);
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
  const closeContextMenu = (e) => {
    e.stopPropagation();
    console.log(performance.now());
    updateSelected((prev) => {
      return { folder: [], file: [] };
    });
    console.log(performance.now());
    SetOverlays(() => {
      return { type: "hide" };
    });
    console.log(performance.now());
  };
  const { SetOverlays } = useContext(SetOverlayContext);
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
  // const showFolderOptions = (e, key) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   getMousePosition(e);
  //   MainContainerHeightWidth();
  //   // console.time();
  //   // SetOverlays((prev) => {
  //   //   return {
  //   //     visibility: "visible",
  //   //     type: "folder",
  //   //     mouseX: posX,
  //   //     mouseY: posY,
  //   //     divHeight: divHeight,
  //   //     divWidth: divWidth,
  //   //   };
  //   // });

  //   updateSelected((prev) => {
  //     return { folder: [key.toString()], file: [] };
  //   });
  //   // console.timeEnd();
  //   console.log(1);
  // };
  // function openRecentFolder(e, key) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   // console.log(history);
  //   // console.log(e.currentTarget);
  //   // console.log(key);
  //   // if(Array.isArray(folders[]))

  //   let needArray = folders["fo" + key.toString()][0].folderPathSequence;
  //   let carryArray = [];
  //   needArray.forEach((element) => {
  //     let newEl = "fo" + element.toString();
  //     carryArray.push(newEl);
  //   });
  //   needArray = carryArray;
  //   needArray.unshift("current", "folder");
  //   // console.log(needArray);
  //   let path = needArray.join("_");
  //   // /Storage/Admin/folder/id=11234path=current_folder_foroot
  //   path = "/Storage/Admin/folder/id=" + key.toString() + "path=" + path;
  //   console.log(path);
  //   history.push(path);
  // }
  // function folderClick(e, key) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   // console.log(e.detail);
  // }
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
  // const FolderMap = ({ id, style, name }) => {
  //   // console.log(id.length);
  //   return (
  //     <div
  //       className="Folder"
  //       // extra={props.extra}
  //       id={id}
  //       onContextMenu={(e) => {
  //         // console.time();
  //         showFolderOptions(e, id);
  //         // console.timeEnd();
  //       }}
  //       onDoubleClick={(e) => {
  //         openRecentFolder(e, id);
  //       }}
  //       onClick={(e) => {
  //         folderClick(e, id);
  //       }}
  //       selected-div="false"
  //       style={style}
  //       // ref = {childRef}
  //     >
  //       <div className="star">
  //         <StarBorderIcon />
  //       </div>
  //       <div className="preview">
  //         <FolderIcon />
  //       </div>
  //       <div className="name">{name}</div>
  //     </div>
  //   );
  // };
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
  // const  FolderMapMemoRise =
  // const FolderMapMemoRise = React.memo(({ data }) => {
  //   console.log("Rendering");
  //   const FF = React.useMemo(() => {
  //     const a = data.slice(0, 15).map((value) => {
  //       let s = {};
  //       // if (selected !== []) {
  //       //   if (selected.folder.includes(value.folderid.toString())) {
  //       //     s = { backgroundColor: "#bca3d5" };
  //       //   }
  //       // }

  //       let style = s;
  //       return (
  //         <FolderMap
  //           style={style}
  //           name={value.folderName}
  //           key={value.folderid}
  //           id={value.folderid}
  //         />
  //       );
  //     });
  //     console.log(a);
  //     return a;
  //   }, [data]);

  //   return (
  //     <>
  //       {/* <div className="m">{st.toSting}</div> */}
  //       <div className="folders" ref={foldersRef}>
  //         {/* {console.log(performance.now())} */}
  //         {FF}
  //         {/* {console.log(performance.now())} */}
  //       </div>
  //     </>
  //   );
  // });

  //
  //
  // const Doof = React.memo(({ data }) => {
  //   console.log("ssssssssssssssssssssssssssssssssssssjjjjjj");
  //   console.log(data);
  //   const a = data.slice(0, 15).map((value) => {
  //     let s = {};
  //     // if (selected !== []) {
  //     //   if (selected.folder.includes(value.folderid.toString())) {
  //     //     s = { backgroundColor: "#bca3d5" };
  //     //   }
  //     // }

  //     let style = s;
  //     return (
  //       <FolderMap
  //         style={style}
  //         name={value.folderName}
  //         key={value.folderid}
  //         id={value.folderid}
  //       />
  //     );
  //   });
  //   console.log(a);

  //   return (
  //     <>
  //       <div className="folders" ref={foldersRef}>
  //         {/* {a} */}
  //       </div>
  //     </>
  //   );
  // });

  const SmallMessage = () => {
    const { message } = useContext(SmallMessageContext);
    if (message.display === "hidden") return null;
    return (
      <div
        style={{
          position: "absolute",
          bottom: "25px",
          minWidth: "100px",
          height: "50px",
          backgroundColor: "#000000",
          zIndex: "50000",
          color: "#96f421",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginRight: "20px",
            padding: "10px",
          }}
        >
          {message.message}
        </div>
        <div>Cross</div>
      </div>
    );
  };
  
  // console.log(React.memo())
  
  // console.log(Tester);
  if (fileAndFolderData.count === 1) {
    return (
      <>
        <p>Loading</p>
      </>
    );
  }
  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          j(i + 1);
        }}
      >
        Click me {i}
      </button>
      <div className="AllFolder" onClick={closeContextMenu} ref={AllFolderRefs}>
        {/* <SmallMessageContextProvider> */}
        <ContextMenu />

        <SmallMessage />

        <section onContextMenu={newFolderOptions} ref={section}>
          {/* <Doof data={arrayMapFolder} /> */}
          {/* <Tester data={arrayMapFolder} /> */}
          <TestingFolderMap data={arrayMapFolder} impRef = {section} />

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
        {/* </SmallMessageContextProvider> */}
      </div>
      {console.log("last")}
    </>
  );
}
export default React.memo(AllFolder);
