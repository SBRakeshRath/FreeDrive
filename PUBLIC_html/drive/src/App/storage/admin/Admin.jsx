import React from "react";
import TokenChecker from "../TokenChecker";
import Preloader from "../preloader";
import { Redirect } from "react-router-dom";
import Nav from "./nav/nav";
import Left from "./Left/left";
import Main from "./FileDisplayComponents/Main";
import "./Admin.scss";
import { Route, Link, Switch } from "react-router-dom";

// import { FileAndFolderContextProvider } from "./FileDisplayComponents/fileAndFolderDetailscontext";
// import fileAndFolderApiData from "./allContexts/fileAndFolderApi";

import {
  OverlayContextProvider,
  // OverlayContext,
} from "./ContextMenuContainer/overlaysContext.js";

const Admin = (props) => {
  // const { overlays, SetOverlays } = useContext(OverlayContext);

  const TokenCheckerResp = TokenChecker();
  if (TokenCheckerResp.isLoading) {
    return (
      <>
        <Preloader />
      </>
    );
  }
  if (TokenCheckerResp.loggedIn === false) {
    return <Redirect to="/Storage" />;
  }

  return (
    <>
      <OverlayContextProvider>
        {/* <FileAndFolderContextProvider> */}
        
        <div className="AdminPage">
          {/* </OverlayContextProvider> */}

          <Nav />
          <div className="left">
            <Left />
          </div>
          <div className="mainContainer">
            {/* <OverlayContextProvider> */}
            <Switch>
              <Route exact path="/Storage/Admin">
                {console.log("khsdfksdhfkdshfukhkjhdsfkj")}
                {/* <h1>okk</h1> */}
                <Main />
              </Route>
              <Route exact path="/Storage/Admin/folder/">
                <Redirect to="/Storage/Admin" />
              </Route>
              <Route exact path="/Storage/Admin/folder/:details">
                {/* <Main /> */}
                <Link to="/Storage/Admin/folder/id=11234path=current_folder_foroot_fo9669714164">Click Me</Link>
                <Main />
              </Route>
            </Switch>
          </div>
        </div>
      </OverlayContextProvider>
    </>
  );
};

export default Admin;
