import "./filePath.scss"
import React from "react"
export default function FilePath() {
  const FilePath = ["a", "b", "c"];

  return (
    <div className="filePath" key = {1}>
      <div className="text" style = {{display:"flex"}}>
          {FilePath.map((value,index)=>{
            console.log(index);
              return(
                  <React.Fragment key = {index}>
                        <p >{value} &#62;</p>
                  </React.Fragment>
              )
          })}
      </div>
    </div>
  );
}
