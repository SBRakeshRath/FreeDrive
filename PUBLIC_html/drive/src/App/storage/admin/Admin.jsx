import React from "react";
import TokenChecker from "../TokenChecker";
import Preloader from "../preloader";
import { Redirect } from "react-router-dom";
import Nav from "./nav/nav";
import Left from "./Left/left"
import Main from "./FileDisplayComponents/Main"
import "./Admin.scss";

const Admin = () => {
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
      <div className="AdminPage">
        <Nav />
        <div className="left">
          <Left />
        </div>
        <div className="mainContainer">
          <Main />
        </div>
      </div>
    </>
  );
};

export default Admin;
