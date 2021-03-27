import { useRef, useState, useLayoutEffect } from "react";
import positionContextMenu from "./positionContextMenu";
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
  return (
    <div className="fileOptions" style={style} ref={container}>
      <ul>
        <li>New Folder</li>
        <li>Upload Folder</li>
        <li>Upload File</li>
      </ul>
    </div>
  );
}
