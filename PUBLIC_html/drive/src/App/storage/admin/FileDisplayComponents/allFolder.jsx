import "./allfolder.scss";
import FolderIcon from "@material-ui/icons/Folder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useState, useContext, useRef } from "react";
import { OverlayContext } from "../ContextMenuContainer/overlaysContext";
import ContextMenu from "../ContextMenuContainer/contextMenu";
export default function AllFolder() {
  const [FolderAndFile, updateFolderANDFiles] = useState(() => {
    return [
      { name: "New Folder", id: "1", type: "folder" },
      { name: "New Folder", id: "2", type: "folder" },
      { name: "New Folder", id: "3", type: "folder" },
      { name: "New file", id: "1", type: "file" },
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
  const AllFolderRefs = useRef(null);
  let posX = 0;
  let posY = 0;
  let offsetTop = 0,
    offsetLeft = 0;
  function getMousePosition(e) {
    if (AllFolderRefs !== null) {
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
    if (AllFolderRefs !== null) {
      if (AllFolderRefs.current === null) return;
      divHeight = AllFolderRefs.current.clientHeight;
      divWidth = AllFolderRefs.current.clientWidth;
    }
  }
  const closeContextMenu = () => {
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
    // console.log(overlays);
  };
  const showFolderOptions = (e) => {
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
        onContextMenu={showFolderOptions}
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
        <div className="name">New File.txt</div>
      </div>
    );
  };
  return (
    <>
      <div className="AllFolder" onClick={closeContextMenu} ref={AllFolderRefs}>
        <ContextMenu />
        <section onContextMenu={newFolderOptions}>
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
