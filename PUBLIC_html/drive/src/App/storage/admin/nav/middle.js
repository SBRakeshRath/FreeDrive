import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import "./middle.scss";
export default function Middle() {
  const SearchFolder = () => {};

  return (
    <>
      <div className="search">
        <div className="searchIcon">
          <SearchIcon />
        </div>
        <input
          type="text"
          onChange={SearchFolder}
          placeholder="Search in Drive"
        />
        <div className="crossButton">
          <ClearIcon />
        </div>
      </div>
      <div className="others">
        <div className="actionButtons">
          {/* <div className="others"></div> */}
        </div>
      </div>
    </>
  );
}
