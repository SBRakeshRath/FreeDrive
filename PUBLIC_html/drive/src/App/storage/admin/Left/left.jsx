import { Link } from "react-router-dom";
import SdStorageIcon from "@material-ui/icons/SdStorage";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import HistoryIcon from "@material-ui/icons/History";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import "./left.scss";
export default function Left() {
  return (
    <>
      <div className="container">
        <div className="new"></div>
        <div className="buttons">
          <ul>
            <li>
              <div className="icon">
                <SdStorageIcon />
              </div>
              My Drive
            </li>
            <li>
              <div className="icon">
                <FolderSharedIcon />
              </div>
              Shared with me
            </li>
            <li>
              <div className="icon">
                
                <HistoryIcon />
              </div>
              Recent
            </li>
            <li>
              <div className="icon">
                <StarBorderIcon />
              </div>
              Stared
            </li>
            <li>
              <div className="icon">
                <DeleteIcon />
              </div>
              Trash
            </li>
          </ul>
        </div>
        <div className="storageInfo">
          <div className="text">
            <div className="icon">
              <CloudQueueIcon />
            </div>
            <p>Storage (94% full)</p>
          </div>
          <div className="bar-container">
            <div className="bar"></div>
          </div>
          <p>
              10 GB of 15 GB used
          </p>
          <div className="button">
            <Link to = "/Storage/Admin">Buy Storage</Link>
          </div>
        </div>
      </div>
    </>
  );
}
