import { useRef, useState, useLayoutEffect, useContext } from "react";
import positionContextMenu from "./positionContextMenu";
import { SelectedFolderFile } from "./../FileDisplayComponents/selectedFolderAndFile";
import axios from "axios";
import { allUserDetailsContexts } from "./../allUserDetailsContext";
import { FileAndFolderContext } from "./../FileDisplayComponents/fileAndFolderDetailscontext";

/**
 * Create an Axios api with defaults
 */

export default function FolderOptions(props) {
  const container = useRef(null);
  const [style, UStyle] = useState({
    marginLeft: props.mouseX,
    marginTop: props.mouseY,
    position: "absolute",
  });
  useLayoutEffect(() => {
    positionContextMenu(props, container, UStyle);
  }, [props]);
  const { selected } = useContext(SelectedFolderFile);
  const { userTOKEN, deleteFolderFileApi } = useContext(allUserDetailsContexts);
  const { RequiredOnesFileAndFolder, fileAndFolder } = useContext(
    FileAndFolderContext
  );
  const [requiredFileAndFolder] = RequiredOnesFileAndFolder;
  const [, changeFileAndFolderData] = fileAndFolder;
  const deletes = (e) => {
    e.stopPropagation();
    let sendingArray = { folder: [], file: [] };
    // for Folder
    for (let index = 0; index < selected.folder.length; index++) {
      let element = selected.folder[index];
      element = "fo" + parseInt(element);
      let fo =
        RequiredOnesFileAndFolder[0].current.folder[element][0].folderPath;
      sendingArray = {
        folder: [...sendingArray.folder, fo],
        file: [...sendingArray.file],
      };
    }
    console.log(sendingArray);
    const formData = new FormData();

    formData.append("binFolderArray", sendingArray);
    formData.append("userToken", userTOKEN);
    const config = {
      method: "POST",
      url: deleteFolderFileApi,
      data: {
        binFolderArray: sendingArray,
        userToken: userTOKEN,
      },
    };
    const d = {
      binFolderArray: sendingArray,
        userToken: userTOKEN,
    }
    console.log(JSON.stringify(d));
    const apiCall = async () => {
      try {
        const req = await axios(config);
        const res = req.data;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    apiCall();
  };

  return (
    <>
      <div className="fileOptions" style={style} ref={container}>
        <ul>
          <li>Renames</li>
          <li onClick={deletes}>Delete</li>
          <li>Move</li>
        </ul>
      </div>
    </>
  );
}
