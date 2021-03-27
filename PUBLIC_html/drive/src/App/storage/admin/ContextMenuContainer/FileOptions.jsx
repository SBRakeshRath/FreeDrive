import "./FileOptions.scss";
import { useRef, useState, useLayoutEffect } from "react";
import positionContextMenu from "./positionContextMenu";
export default function FileOptions(props) {
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
    <>
      <div className="fileOptions" style={style} ref={container}>
        <ul>
          <li>{props.id}</li>
          <li>Rename</li>
          <li>Delete</li>
          <li>Move</li>
        </ul>
      </div>
    </>
  );
}
