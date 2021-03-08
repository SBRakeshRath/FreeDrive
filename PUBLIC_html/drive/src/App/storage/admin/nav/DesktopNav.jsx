import { Link } from "react-router-dom";
import GoogleDriveImage from "./DriveImage";


export default function DesktopNav (){

    return(

        <>
        <nav className="desktopNav">
        <div className="logo">
          <Link>
    
         <GoogleDriveImage />
          
          </Link>
        </div>
      </nav>
        </>
    )
}