import React, { useContext } from "react";
import TokenChecker from "../TokenChecker";
import Preloader from "../preloader";
import { Redirect } from "react-router-dom";
import Nav from "./nav/nav";
import Left from "./Left/left";
import Main from "./FileDisplayComponents/Main";
import "./Admin.scss";
import OverLays from "./overLays/overlay";
import {
  OverlayContextProvider,
  // OverlayContext,
} from "./overLays/overlaysContext.js";

const Admin = () => {
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
        <div className="AdminPage">
          <OverLays />
          {/* </OverlayContextProvider> */}

          <Nav />
          <div className="left">
            <Left />
          </div>
          <div className="mainContainer">
            {/* <OverlayContextProvider> */}
            <Main />
            {/* </OverlayContextProvider> */}
          </div>
        </div>
      </OverlayContextProvider>
    </>
  );
};

export default Admin;
