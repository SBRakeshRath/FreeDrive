import "./extra.scss";
import React, { useContext,useState } from 'react';
import { userDatacontext } from "./userDetailscontext";
export default function Extra() {
  // const userData = useContext(userDatacontext).userData;
  // const setUserData = useContext(userDatacontext).setUserData;
  const {userData , setUserData} = useContext(userDatacontext)
  // console.log("context : " +userData.userData.firstName);
 
//  const timeout =  setTimeout(() =>{
//     setUserData({firstName: "C"});
//   },3000);
  // console.log(userData);
  // return () => clearTimeout(timeout);
  return (
    <>
      
      <div className="user">
        <div className="circle">
          <div className="letter">
            <h1>{userData.firstName}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
