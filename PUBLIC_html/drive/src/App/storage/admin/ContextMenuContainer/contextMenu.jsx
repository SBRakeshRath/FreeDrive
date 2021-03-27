import NewFolderMaker from "./NewFolderMaker";
import FileOptions from "./FileOptions";
import FolderOptions from "./FileOptions";
import { OverlayContext } from "./overlaysContext";
import React, { useContext } from "react";
export default function Overlay(props) {
  const { overlays } = useContext(OverlayContext);
  let menu = null;

  if (overlays.type === "file") {
    menu = (
      <FileOptions
        id={overlays.id}
        mouseX={overlays.mouseX}
        mouseY={overlays.mouseY}
        divHeight={overlays.divHeight}
        divWidth={overlays.divWidth}
      />
    );
  } else if (overlays.type === "folder") {
    menu = (
      <FolderOptions
        id={overlays.id}
        mouseX={overlays.mouseX}
        mouseY={overlays.mouseY}
        divHeight={overlays.divHeight}
        divWidth={overlays.divWidth}
      />
    );
  } else if (overlays.type === "NewFolder") {
    menu = (
      <NewFolderMaker
        id={overlays.id}
        mouseX={overlays.mouseX}
        mouseY={overlays.mouseY}
        divHeight={overlays.divHeight}
        divWidth={overlays.divWidth}
      />
    );
  }
  if (overlays.type === "hide") {
    menu = null;
  }

  return (
    // <div
    //   className="Overlays"
    //   style={{ visibility: overlays.visibility }}
    //   // onClick={close}
    // >
    <>
      {menu}

      {/* </div> */}
    </>
  );
}