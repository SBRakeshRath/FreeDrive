import React from "react";
import "./mainlogo.css"

const MainLogo = (props) => {
  return (
    <>
      <div className="allMainLogo" >
        <h1 style={{fontSize:props.fontsize,color:props.color,textShadow:props.textShadow}}>Free Drive</h1>
      </div>
    </>
  );
};
export default MainLogo;
