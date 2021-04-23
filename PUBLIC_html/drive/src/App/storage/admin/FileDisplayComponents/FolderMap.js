import React, { useContext } from "react";
import FolderIcon from "@material-ui/icons/Folder";
import { SelectedFolderFile } from "./../FileDisplayComponents/selectedFolderAndFile";
import { FileAndFolderContext } from "./fileAndFolderDetailscontext";
// import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { SetOverlayContext } from "../ContextMenuContainer/overlaysContext";
import { useHistory } from "react-router-dom";

const FolderMap = ({ data }) => {
  // const [count, setCount] = React.useState(1);
  const foldersRef = React.useRef(null);
  const history = useHistory();
  const { fileAndFolder, RequiredOnesFileAndFolder } = useContext(
    FileAndFolderContext
  );
  const [requiredFileAndFolder] = RequiredOnesFileAndFolder;
  let previousFolders = requiredFileAndFolder.previous.folder;
  const { selected, updateSelected } = React.useContext(SelectedFolderFile);
  let folders = React.useMemo(() => {
    return requiredFileAndFolder.current.folder;
  }, [requiredFileAndFolder]);
  let FolderArray = [],
    PFolderArray = undefined;
  let NpreviousFolders = [];
  function dataS() {
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
  dataS();
  const { SetOverlays } = useContext(SetOverlayContext);
  let posX = 0;
  let posY = 0;
  let offsetTop = 0,
    offsetLeft = 0;
  function getMousePosition(e) {
    let AllFolderRefs = null;
    if (foldersRef != null) {
      AllFolderRefs = foldersRef.current.parentElement.parentElement;
    }
    if (AllFolderRefs != null) {
      offsetTop = AllFolderRefs.getBoundingClientRect().y - 5;
      offsetLeft = AllFolderRefs.getBoundingClientRect().x - 15;
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
    let AllFolderRefs = null;
    if (foldersRef != null) {
      AllFolderRefs = foldersRef.current.parentElement.parentElement;
    }
    if (AllFolderRefs != null) {
      // if (AllFolderRefs.current == null) return;
      divHeight = AllFolderRefs.clientHeight;
      divWidth = AllFolderRefs.clientWidth;
    }
  }
  const showFolderOptions = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    getMousePosition(e);
    MainContainerHeightWidth();
    SetOverlays((prev) => {
      return {
        visibility: "visible",
        type: "folder",
        mouseX: posX,
        mouseY: posY,
        divHeight: divHeight,
        divWidth: divWidth,
      };
    });
    // alert(selected.folder.toString());
    if(selectedRef.current.folder.length > 1){
      return;

    }
    updateSelected((prev) => {
      return { folder: [key.toString()], file: [] };
    });
  };
  function openRecentFolder(e, key) {
    e.preventDefault();
    e.stopPropagation();

    let needArray = folders["fo" + key.toString()][0].folderPathSequence;
    let carryArray = [];
    needArray.forEach((element) => {
      let newEl = "fo" + element.toString();
      carryArray.push(newEl);
    });
    needArray = carryArray;
    needArray.unshift("current", "folder");

    let path = needArray.join("_");
    // /Storage/Admin/folder/id=11234path=current_folder_foroot
    path = "/Storage/Admin/folder/id=" + key.toString() + "path=" + path;
    history.push(path);
  }

  // new answer:
  const pressedKeys = React.useRef([]);
  const selectedRef = React.useRef([]);
  React.useEffect(() => {
    function handleKeydownEvent(event) {
      // event.preventDefault();
      // event.stopPropagation();

      const { keyCode } = event;

      if (pressedKeys.current.includes(keyCode)) return;
      pressedKeys.current = [...pressedKeys.current, keyCode];
    }
    function handleKeyupEvent(event) {
      event.preventDefault();
      pressedKeys.current = [];
    }

    window.addEventListener("keydown", handleKeydownEvent);
    window.addEventListener("keyup", handleKeyupEvent);
    selectedRef.current = selected;

    return () => {
      window.removeEventListener("keydown", handleKeydownEvent);
      window.removeEventListener("keyup", handleKeyupEvent);
    };
  });

  function folderClick(e, id) {
    e.stopPropagation();
    e.preventDefault();

    SetOverlays((prev) => {
      return {
        visibility: "hidden",
      };
    });

    if (e.shiftKey) {
      updateSelected((prev) => {
        return {
          folder: [...prev.folder, id.toString()],
          file: prev.file,
        };
      });
    } else if (
      pressedKeys.current.length === 1 &&
      pressedKeys.current[0] === 17
    ) {
      let CI = null;
      for (let index = 0; index < FolderArray.length; index++) {
        if (
          selectedRef.current.folder.includes(
            FolderArray[index].folderid.toString()
          )
        ) {
          if (CI == null) {
            CI = index;
          } else {
            if (CI > index) {
              CI = index;
            }
          }
        }
      }
      if (CI == null) {
        CI = 0;
      }

      let firstIndex = CI;
      let lastIndex = 0;
      for (let index = 0; index < FolderArray.length; index++) {
        const element = FolderArray[index].folderid;
        if (element === id) {
          lastIndex = index;
        }
      }
      let CA = [];
      for (let index = 0; index < FolderArray.length; index++) {
        const element = FolderArray[index].folderid;
        if (index >= firstIndex && index <= lastIndex) {
          CA = [...CA, element.toString()];
        }
      }
      updateSelected((prev) => {
        return { folder: CA, file: selected.file };
      });
    } else {
      updateSelected((prev) => {
        return { folder: [id.toString()], file: [] };
      });
    }
  }
  const FolderMap = ({ id, style, name }) => {
    return (
      <div
        className="Folder"
        // extra={props.extra}
        id={id}
        onContextMenu={(e) => {
          showFolderOptions(e, id);
        }}
        onDoubleClick={(e) => {
          openRecentFolder(e, id);
        }}
        onClick={(e) => {
          folderClick(e, id);
        }}
        selected-div="false"
        style={style}
        // ref = {childRef}
      >
        <div className="star">
          <StarBorderIcon />
        </div>
        <div className="preview">
          <FolderIcon />
        </div>
        <div className="name">{name}</div>
      </div>
    );
  };
  React.useLayoutEffect(() => {
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
        if (previousFolders.length === 0 && fileAndFolder[0].count < 3) return;
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
                  const sectionC = foldersRef.current.parentElement;
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
  React.useLayoutEffect(() => {
    if (selected.folder === []) return;
    if (foldersRef == null) return;
    if (typeof foldersRef.current.children !== "object") return;
    for (let i = 0; i < FolderArray.length; i++) {
      const element = FolderArray[i];
      if (selected.folder.includes(element.folderid.toString())) {
        foldersRef.current.children[i].style.backgroundColor = "#00ff7d";
        foldersRef.current.children[i].style.border = "5px solid #0300ff";
      } else {
        foldersRef.current.children[i].style.backgroundColor = "#e5d2f8ed";
        foldersRef.current.children[i].style.border = null;
      }
    }
  });
  const b = React.useMemo(() => {
    if (data.length === 0) {
      return (
        <>
          <h1>No Folder</h1>
        </>
      );
    }
    const c = data.slice(0, 5000).map((value) => {
      let s = {};
      let style = s;
      return (
        <FolderMap
          style={style}
          name={value.folderName}
          key={value.folderid}
          id={value.folderid}
        />
      );
    });
    return c;
  }, [data]);
  return (
    <>
      {/* <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click {count}
      </button> */}
      <div className="folders" ref={foldersRef}>
        {b}
      </div>
    </>
  );
};
// );
export default FolderMap;
