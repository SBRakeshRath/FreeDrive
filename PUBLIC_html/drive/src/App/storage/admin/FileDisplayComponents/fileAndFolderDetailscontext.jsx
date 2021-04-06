import React, {
  useState,
  createContext,
  useLayoutEffect,
  useEffect,
} from "react";
import axios from "axios";
export const FileAndFolderContext = createContext();
export const FileAndFolderContextProvider = ({ children }) => {
  const apiURL =
    "http://localhost/GoogleDrive/PUBLIC_html/phpBakend/fileAndFolderList.php";
  const [fileAndFolderData, changeFileAndFolderData] = useState(() => {
    return {
      loading: true,
      size: 500,
      file: [],
      folder: [],
    };
  });
  const [path, updatePath] = useState(() => {
    return ["folder", "foroot"];
  });
  const [requiredFileAndFolder, updateRequiredFileAndFolder] = useState(() => {
    return {
      previous:{file:[],folder:[]},
      current: { file: [], folder: [] },
      currentFolderId: 0,
    };
  });

  useLayoutEffect(() => {
    let folder = fileAndFolderData;
    for (let i = 0; i < path.length; i++) {
      folder = folder[path[i]];
    }
    updateRequiredFileAndFolder((prev) => {
      return {
        ...prev,
        // file: fileAndFolderData.file,
        // // folder: fileAndFolderData.folder.fo1,
        // folder: folder,
        previous:{...prev.current},
        current: { file: fileAndFolderData.file, folder: folder },
      };
    });
  }, [fileAndFolderData, path]);
  useLayoutEffect(() => {
    // updatePath((prev) => {
    //   return ["folder", "foroot"];
    // });
  }, [fileAndFolderData]);

  const name = "fileAndFolderList";
  useEffect(() => {
    console.log("hallo");
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
          console.log("response");
          console.log(Response);
          changeFileAndFolderData((prev) => {
            return {
              // ...prev,
              loading: false,
              file: Response.file,
              folder: Response.folder,
              size: Response.size,
              // fetched: true,
            };
          });
        } catch (error) {
          console.log(JSON.stringify(JSON.parse(error)));
        }
      };
      ApiCall();
    }
  }, [fileAndFolderData.loading]);

  return (
    <FileAndFolderContext.Provider
      value={{
        fileAndFolder: [fileAndFolderData, changeFileAndFolderData],
        RequiredOnesFileAndFolder: [
          requiredFileAndFolder,
          updateRequiredFileAndFolder,
        ],
      }}
    >
      {children}
    </FileAndFolderContext.Provider>
  );
};
