import React, {
  useState,
  createContext,
  useLayoutEffect,
  useEffect,
} from "react";
import axios from "axios";
import { Redirect, useParams } from "react-router-dom";
export const FileAndFolderContext = createContext();
export const FileAndFolderContextProvider = ({ children }) => {
  const apiURL =
    "http://localhost/GoogleDrive/PUBLIC_html/phpBakend/fileAndFolderList.php";
  const [count, setCount] = useState(1);
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
    console.log(
      "teeeeeeeeeeeeeeeeeessssssssssssssssssssstttttttttttttttttttteeeeeeeeeerrrrrrrrrrrr"
    );
    console.log(count);
    if (fileAndFolderData.count === 1) return;
    console.log(fileAndFolderData.current.folder.foroot);
    let folder = fileAndFolderData;
    let found = true;
    for (let i = 0; i < path.current.length; i++) {
      if (typeof folder === "object") {
        console.log("folder path folder");
        console.log(folder[path.current[i]]);
        folder = folder[path.current[i]];
        // if(tupefolder[path[i]])
      } else {
        found = false;
        updateRedirect(true);
        console.log("hehehehehehhehehehehehehehehehehehehehehehehehehehehehe");
      }
    }
    console.log("i am found :-------" + found);
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
    console.log("pathhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    console.log(path);
    console.log(requiredFileAndFolder);
    console.log(Object.keys(requiredFileAndFolder.current.folder).length);
    console.log(Object.keys(requiredFileAndFolder.previous.folder).length);
    if (
      arrayEquals(path.current, path.prev)
      //  || Object.keys(requiredFileAndFolder.current.folder).length === 0
    ) {
      console.log("hii ji");
      updateRequiredFileAndFolder((prev) => {
        return {
          // ...prev,
          previous: { file: fileAndFolderData.file, folder: folder },
          current: { file: fileAndFolderData.file, folder: folder },
        };
      });
    } else {
      console.log("by ji");
      updateRequiredFileAndFolder((prev) => {
        return {
          ...prev,
          previous: { ...prev.current },
          current: { file: fileAndFolderData.file, folder: folder },
        };
      });
    }

    console.log("updated");
  }, [fileAndFolderData, path]);

  const name = "fileAndFolderList";
  useEffect(() => {
    console.log("hallo");
    // let isSubscribed = true;
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
              count: 2,
              prev: {
                // ...prev.current
                file:{},
                folder:{}
              },
              size: Response.size,
              // fetched: true,
            };
          });
          // setCount(count + 1);
          // updatePath(["folder","foroot"])
          // }
        } catch (error) {
          console.log(JSON.stringify(JSON.parse(error)));
        }
      };
      ApiCall();
      // return () => (isSubscribed = false);
    }
  }, [fileAndFolderData.loading]);
  // useEffect(() => {
  // }, [isRedirect]);
  console.log("redirecting=======");
  console.log(isRedirect);
  // updateRedirect(false);
  useEffect(() => {
    if (isRedirect) {
      updateRedirect(false);
      updatePath({ current: ["current", "folder", "foroot"], prev: [] });
    }
  }, [isRedirect]);
  if (isRedirect) {
    console.log("redirecting");
    // updateRedirect(false);
    console.log(isRedirect);
    console.log("redirecting");
    // updatePath(["folder", "foroot"])
    // return <Redirect exact to="/Storage/Admin" />;
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
