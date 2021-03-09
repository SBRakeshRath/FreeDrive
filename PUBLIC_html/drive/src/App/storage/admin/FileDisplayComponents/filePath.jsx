import "./filePath.scss"
export default function FilePath() {
  const FilePath = ["a", "b", "c"];

  return (
    <div className="filePath">
      <div className="text">
          {FilePath.map((value,index)=>{

              return(
                  <>
                        {value} &#62;
                  </>
              )
          })}
      </div>
    </div>
  );
}
