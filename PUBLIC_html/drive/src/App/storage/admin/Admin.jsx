import React from "react";
import TokenChecker from "../TokenChecker";
import Preloader from "../preloader";
import { Redirect } from "react-router-dom";
import Nav from "./nav/nav";
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
      </div>
    </>
  );
};

export default Admin;
