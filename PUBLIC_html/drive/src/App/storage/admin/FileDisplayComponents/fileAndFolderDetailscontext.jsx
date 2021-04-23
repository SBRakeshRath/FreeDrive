import React, {
  useState,
  createContext,
  useLayoutEffect,
  useEffect,
  useContext,
} from "react";
import axios from "axios";
import { SmallMessageContext } from "./SmallMessageContext";
import { Redirect, useParams } from "react-router-dom";
export const FileAndFolderContext = createContext();
export const FileAndFolderContextProvider = ({ children }) => {
  const apiURL =
    "http://localhost/GoogleDrive/PUBLIC_html/phpBakend/fileAndFolderList.php";
  const { message, setMessage } = useContext(SmallMessageContext);

  const [fileAndFolderData, changeFileAndFolderData] = useState(() => {
    return {
      loading: true,
      size: 500,
      count: 1,
      // file: [],
      // folder: { foroot: {} },
      current: {
        file: [],
        folder: {},
      },
      prev: {
        file: [],
        folder: {},
      },
    };
  });
  const [path, updatePath] = useState(() => {
    return { current: ["current", "folder", "foroot"], prev: [] };
  });
  const [requiredFileAndFolder, updateRequiredFileAndFolder] = useState(() => {
    return {
      previous: { file: [], folder: [] },
      current: { file: [], folder: [] },
      // currentFolderId: 0,
    };
  });
  // let redirect = false;
  const [isRedirect, updateRedirect] = useState(false);

  useLayoutEffect(() => {
    if (fileAndFolderData.count === 1) return;

    let folder = fileAndFolderData;
    let found = true;
    for (let i = 0; i < path.current.length; i++) {
      if (typeof folder === "object") {
        folder = folder[path.current[i]];
      } else {
        found = false;
        updateRedirect(true);
      }
    }
    if (typeof folder === "undefined") {
      updateRedirect(true);
      return;
    }
    // const OPath = ["folder", "foroot"];
    function arrayEquals(a, b) {
      return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
      );
    }
    if (
      arrayEquals(path.current, path.prev)
      //  || Object.keys(requiredFileAndFolder.current.folder).length === 0
    ) {
      updateRequiredFileAndFolder((prev) => {
        return {
          // ...prev,
          previous: { file: fileAndFolderData.file, folder: folder },
          current: { file: fileAndFolderData.file, folder: folder },
        };
      });
    } else {
      updateRequiredFileAndFolder((prev) => {
        return {
          ...prev,
          previous: { ...prev.current },
          current: { file: fileAndFolderData.file, folder: folder },
        };
      });
    }
  }, [fileAndFolderData, path]);

  const name = "fileAndFolderList";
  useEffect(() => {
    if (fileAndFolderData.loading === true) {
      const ApiCall = async () => {
        let formData = new FormData();
        formData.append("name", name);

        try {
          const config = {
            method: "POST",
            url: apiURL,
            data: formData,
            // timeout: 4000,
          };
          const request = await axios(config);
          const Response = request.data;
          console.log(Response);
          changeFileAndFolderData((prev) => {
            return {
              // ...prev,
              loading: false,
              current: {
                file: Response.file,
                folder: Response.folder,
              },
              count: fileAndFolderData.count + 1,
              prev: {
                // ...prev.current
                file: {},
                folder: {},
              },
              size: Response.size,
              // fetched: true,
            };
          });
          if (message.display === "flex" && message.type === "newFolderMaker") {
            setMessage({ display: "flex" ,message:"New Folder HighLighted",type:null});

          }
        } catch (error) {
          console.log(JSON.stringify(JSON.parse(error)));
        }
      };
      ApiCall();
    }
  }, [fileAndFolderData.loading]);

  useEffect(() => {
    if (isRedirect) {
      updateRedirect(false);
      updatePath({ current: ["current", "folder", "foroot"], prev: [] });
    }
  }, [isRedirect]);
  if (isRedirect) {
    return <Redirect to="/Storage/Admin/" />;
  }

  return (
    <FileAndFolderContext.Provider
      value={{
        fileAndFolder: [fileAndFolderData, changeFileAndFolderData],
        RequiredOnesFileAndFolder: [
          requiredFileAndFolder,
          updateRequiredFileAndFolder,
        ],
        path: [path, updatePath],
      }}
    >
      {children}
    </FileAndFolderContext.Provider>
  );
};
