import {Button} from "@material-ui/core";
import {useRef,useContext} from "react";
import {FileAndFolderContext} from "./../FileDisplayComponents/fileAndFolderDetailscontext"
export default function NewFolderMaker (props){
    const input = useRef(null);
    const { RequiredOnesFileAndFolder } = useContext(
        FileAndFolderContext
      );
      const [requiredFileAndFolder] = RequiredOnesFileAndFolder;
    console.log(requiredFileAndFolder.folder[0].previewPath);
    // console.log(props);
    const style = {
        position:"absolute",
        zIndex:"5000",
        height:"100%",
        width:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column"
    }
    const sectionStyle = {
        width:"350px",
        maxWidth:"100%",
        height:"auto",
        backgroundColor:"white",
        margin:"auto",
        boxShadow:"0px 0px 16px 1px #f89999",
        padding:"35px 18px",
        // marginTop:"50%",
        transform:"translate(0, -25%)"
        // boxShadow:"0px 16px 1px #f78989"
    }
    const inputStyle = {
        margin:"20px 0",
        width:"100%",
        border:"none",
        backgroundColor:"transparent",
        borderBottom:"2px solid #b2b2ff",
        height:"26px",
    }
    const buttonDivStyle = {
        display:"flex",
        justifyContent:"space-between",
        marginTop:"20px"
    }
    const CreateFolder = (e)=>{
        e.stopPropagation()
        const data = new FormData();
        if(input!=null||input.current!=null)
        data.append("folderName",input.current.value);
        data.append("folderPath",requiredFileAndFolder.folder[0].previewPath);
        data.append("userToken","123456789");

    }
    return(
        <>
        <div style= {style} >
            <section style={sectionStyle}onClick = {(e)=>e.stopPropagation()}>
                <p>New Folder Name</p>
                <input type="text" style = {inputStyle} placeholder="Enter New Folder Name" ref = {input}/>
                <div style={buttonDivStyle}>
                    <Button variant='contained' color='primary'>Cancel</Button>
                    <Button variant='contained' color='primary' onClick={CreateFolder}>Create</Button>
                </div>
            </section>
        </div>
        </>
    )
}