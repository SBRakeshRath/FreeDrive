import "./App.css";
import Intro from "./App/intro/index.jsx";
import Storage from "./App/storage/index.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./App/storage/admin/Admin";
import Signup from "./App/storage/signup.jsx";
import { FileAndFolderContextProvider } from "./App/storage/admin/FileDisplayComponents/fileAndFolderDetailscontext";
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
        <Route exact path="/Storage/Admin">
          <FileAndFolderContextProvider>
            {/* <SpecificFileAndFolderProvider> */}
              <Admin />
            {/* </SpecificFileAndFolderProvider> */}
          </FileAndFolderContextProvider>
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
