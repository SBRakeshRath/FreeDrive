import React from "react";
import TokenChecker from "../TokenChecker";
import Preloader from "../preloader";
import { Redirect } from "react-router-dom";
import Nav from "./nav/nav";

const Admin = ()=>{



    const TokenCheckerResp = TokenChecker();
  if(TokenCheckerResp.isLoading){
    return (<><Preloader /></>);
  }
  if(TokenCheckerResp.loggedIn === false){
    return <Redirect to="/Storage" />
  }

    return(<><h1>HomePage</h1><Nav /></>)
}

export default Admin;