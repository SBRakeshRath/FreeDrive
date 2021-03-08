import { Link } from "react-router-dom";
import GoogleDriveImage from "./DriveImage";
import Middle from "./middle.js";
import "./Desktopnav.scss";
import "./logo.scss";
import Extra from "./extra"

export default function DesktopNav() {
  return (
    <>
      <nav className="desktopNav">
        <div className="logo">
          <Link>
            <GoogleDriveImage />
            <div className="text">
              <p>Drive</p>
            </div>
          </Link>
        </div>
        <div className="middle">
          <Middle />
        </div>
        <div className="extra"><Extra /></div>
      </nav>
    </>
  );
}
