import "./App.css";
import Intro from "./App/intro/index.jsx";
import Storage from "./App/storage/index.js";
import { Switch, Route } from "react-router-dom";
import Admin from "./App/storage/admin/Admin";
import Signup from "./App/storage/signup.jsx";
import { FileAndFolderContextProvider } from "./App/storage/admin/FileDisplayComponents/fileAndFolderDetailscontext";
import { AllUserDetailsContextsProvider } from "./App/storage/admin/allUserDetailsContext";
import { SelectedFolderFileProvider } from "./App/storage/admin/FileDisplayComponents/selectedFolderAndFile";
import { SmallMessageContextProvider } from "./App/storage/admin/FileDisplayComponents/SmallMessageContext";
// import { SpecificFileAndFolderProvider } from "./App/storage/admin/FileDisplayComponents/SpecificfileAndFolderDetailscontext";

function App() {
  const NotFound = () => {
    return (
      <>
        <h1>Page not found</h1>
      </>
    );
  };
  return (
    <>
      {/* <Intro /> */}

      <Switch>
        <Route exact path="/">
          <Intro />
        </Route>
        <Route exact path="/Storage">
          <Storage />
        </Route>
        <Route path="/Storage/Admin">
          <SmallMessageContextProvider>
            <AllUserDetailsContextsProvider>
              <SelectedFolderFileProvider>
                <FileAndFolderContextProvider>
                  {/* <SpecificFileAndFolderProvider> */}
                  <Admin />
                  {/* </SpecificFileAndFolderProvider> */}
                </FileAndFolderContextProvider>
              </SelectedFolderFileProvider>
            </AllUserDetailsContextsProvider>
          </SmallMessageContextProvider>
        </Route>
        <Route exact path="/Storage/signup">
          <Signup />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
