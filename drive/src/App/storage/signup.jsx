import React, { useState, useEffect, useRef } from "react";
import  axios from 'axios';
import "./signup.scss";
//material ui
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";


//material ui close
// import AccountBoxIcon from "@material-ui/icons/AccountBox";
// import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import MainLogo from "../../logo/MainLogo";
// import FancyImage from "./images/SignUp page Images/1-[Converted].png";
import femaleImage from "./images/SignUp page Images/Femaleuser.png";

// const photo = true;

const Signup = () => {
  let apiURL = "http://localhost/GoogleDrive/phpBakend/signup.php";
  // const [uploadImage, uploadImageCheck] = useState(false);
  // const imagePreview = () => {
  //   console.log("changed");
  //   const photo = document.getElementById("user_profile_photo");
  //   const file = this.innerHTML;
  //   console.log(file);
  // };
  const container = useRef(null);
  const shapes = useRef(null);
  const defaultPhotoWrapper = useRef(null);
  const backgroundShapeArrangement = () => {
    if (container !== null) {
      const ShapeStyle = shapes.current.children;
      // ShapeStyle[0].style.marginLeft = style.marginLeft;
      // ShapeStyle[0].style.marginTop = style.marginTop;
      // ShapeStyle[1].style.marginRight = style.marginRight;
      // ShapeStyle[1].style.marginBottom = style.marginBottom;
      // console.log(style.marginLeft);
      console.log(
        parseFloat(getComputedStyle(shapes.current.children[1]).width) + "px"
      );
      console.log(container.current.offsetLeft);
      console.log(container.current.clientWidth);
      ShapeStyle[0].style.marginLeft = container.current.offsetLeft + "px";
      ShapeStyle[0].style.marginTop = container.current.offsetTop + "px";
      ShapeStyle[1].style.marginLeft =
        container.current.offsetLeft +
        container.current.clientWidth -
        parseFloat(getComputedStyle(shapes.current.children[1]).width) +
        "px";
      ShapeStyle[1].style.marginTop =
        container.current.offsetTop +
        container.current.clientHeight -
        parseFloat(getComputedStyle(shapes.current.children[1]).height) +
        "px";
    }
  };
  // useEffect(() => {

  //   backgroundShapeArrangement();
  // }, [container]);
  const anotherWrapper = useRef(null);
  useEffect(() => {
    const defaultPhotoWrapperStyle = defaultPhotoWrapper.current.style;
    const responsiveProfilePhoto = () => {
      const anotherWrapperStyle = getComputedStyle(anotherWrapper.current);
      const width = anotherWrapperStyle.width;
      const height = anotherWrapperStyle.height;
      // console.log(width + "   "+ height)
      if (parseFloat(width) >= parseFloat(height)) {
        // console.log("width is longer than height");
        if (parseFloat(width) > parseFloat(height)) {
          // console.log("width is greater than height");
          defaultPhotoWrapperStyle.width = height;
          defaultPhotoWrapperStyle.height = height;
        } else {
          // console.log("width is equal to height");
          defaultPhotoWrapperStyle.width = height;
          defaultPhotoWrapperStyle.height = height;
        }
      } else {
        // console.log("height is longer than width");
        defaultPhotoWrapperStyle.width = width;
        defaultPhotoWrapperStyle.height = width;
      }
    };
    responsiveProfilePhoto();
    backgroundShapeArrangement();
    window.addEventListener("resize", () => {
      console.log("resized");
      responsiveProfilePhoto();
      backgroundShapeArrangement();
      backgroundShapeArrangement();
    });
  }, [defaultPhotoWrapper, anotherWrapper]);

  //....>>>>>>Profile Image Handlers

  //profile Image changeProp
  const [ProfileImgSrc, newProfileImgSrc] = useState(femaleImage);
  //close Profile Image changer
const PreviewProfileImage =  (e)=>{
  console.log(URL.createObjectURL(e.target.files[0]));
  newProfileImgSrc(URL.createObjectURL(e.target.files[0]));
}
  const ProfileImage = (props) => {
    return (
      <div className="ProfileImage">
        <img src={props.src} alt="ProfilePhoto" />
      </div>
    );
  };
  const ImageUpload = useRef(null);
  const ChangeImage = () => {
    ImageUpload.current.click();
  };
  const Alert = () => {
    
    // const ChangeImage = () => {
    //   ImageUpload.current.click();
    // };
    return (
      <div
        className="alert"
        style={{ visibility: "hidden" }}
        ref={alertShowers}
      >
        <div className="msgContainer">
          <div className="top">
            <div className="cancelled" onClick={closeAlert}>
              <CloseIcon />
            </div>
          </div>
          <div className="content">
            <ProfileImage src={ProfileImgSrc} />
          </div>
          <div className="bottom">
            <Button variant="contained" color="primary" onClick={ChangeImage}>
              Change
            </Button>
            {/* <input type="file" style={{ display: "none" }} ref={ImageUpload}  onChange={PreviewProfileImage}/> */}
          </div>
        </div>
      </div>
    );
  };

  const alertShowers = useRef(null);
  const visibleAlert = () => {
    // alert("clicked");
    // var t0 = performance.now();
    const AlertMsg = alertShowers.current.style;
    AlertMsg.visibility = "visible";
    //   var t1 = performance.now()
    // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
  };

  const closeAlert = () => {
    // var t0 = performance.now()
    // <---- The function you're measuring time for

    const AlertMsg = alertShowers.current.style;
    AlertMsg.visibility = "hidden";

    // var t1 = performance.now()
    // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
  };


// .......................................>>>>>>>>>>>>>>>>>>>>>>>>>>

// Backend Part

//>>>>>>>>>>>>>>>.....................
const sendPostRequest = async (data)=>{
  console.log("sendPostRequest");
  const config = {
    method: "POST",
    url: apiURL,
    data: data,
    withCredentials: true,
  };
  const req = await axios(config);
  const jsondata = JSON.parse(JSON.stringify(req.data));
  console.log(jsondata);

}
const form = useRef(null);
const formSubmit = (e)=>{
  e.preventDefault();
  const data = new FormData(form.current);
    // console.log(data);
    // console.log(data.entries);
    // for (var pair of data.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    sendPostRequest(data);
}





  return (
    <>
      <div className="entireSignupPage">
        <Alert/>
        <div className="signupBackgroundShapes">
          <div className="shapeWrapper" ref={shapes}>
            <div className="circle first" id="circleShapeFirst"></div>
            <div className="circle second"></div>
          </div>
        </div>
        <section className="signup" id="signup-page-container">
          <div className="container" ref={container}>
            <div className="logo">
              {/* <h1>Logo</h1> */}

              <MainLogo
                fontsize="50px"
                color=" #1300ee"
                textShadow="text-shadow: 2px 4px #959ef8ab"
              />
            </div>
            <div className="exceptLogo">
              <div className="fancyThing">
                <div className="userPhoto">
                  <div className="wrapper">
                    <div className="anotherWrapper" ref={anotherWrapper}>
                      <div
                        className="defaultPhotoWrapper"
                        ref={defaultPhotoWrapper}
                      >
                        <div className="default_Photo" onClick={visibleAlert}>
                          <img src={ProfileImgSrc} alt="userImage" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text" onClick={ChangeImage}>
                  <h1 >Change profile picture by click upon it</h1>
                </div>
              </div>
              <div className="form">
                <form ref={form} onSubmit={formSubmit}>
                <input type="hidden" name="SignUPForm" value="SignUPForm" />
                  <div className="name">
                    <div className="fName" >
                      <label htmlFor="" className="l_f_name" style={{display:"none"}}>
                        First Name
                      </label>
                      <input type="text" className="first_name" placeholder="First Name" name="fname"/>
                      <span className="error">No error</span>
                    </div>
                    <div className="lname">
                      <label htmlFor="lname" className="lname" style={{display:"none"}} >
                        Last name
                      </label>
                      <input type="text" className="last_name" placeholder="Last Name" name = "lname"/>
                      <span className="error">No error</span>
                    </div>
                  </div>
                  <div className="username">
                    <label htmlFor="username" className="l_username" style = {{display:"none"}}>
                      User Name
                    </label>
                    <input type="username" name="username" placeholder="username"  />
                    <span className="error">No error</span>
                  </div>
                  <div className="password">
                    <label htmlFor="password" className="l_password">
                      password
                    </label>
                    <input type="password" name="password" placeholder="password"  />
                    <span className="error">No error</span>
                  </div>
                  <div className="email">
                    <label htmlFor="email" className="l_email">
                      Enter Email
                    </label>
                    <input type="email" name="email" placeholder="email" />
                    <span className="error">No error</span>
                  </div>
                  <div className="contact_no">
                    <label htmlFor="number" className="l_c_n">
                      Enter contact number
                    </label>
                    <input type="text" name="contact_no" placeholder="Contact No" />
                    <span className="error">No error</span>
                  </div>
                  <div className="desc">
                    <label htmlFor="textarea" className="l_desc">
                      Enter something about you
                    </label>
                    <textarea
                      name="description"
                      id=""
                      cols="30"
                      rows="10"
                      placeholder="Write Something About You..."
                    ></textarea>
                    <span className="error">No error</span>
                  </div>
                  <input type="file" style={{ display: "none" }} name="userPhoto" ref={ImageUpload}  onChange={PreviewProfileImage}/>
                  <input type="submit" className="submitButton"/>
                </form>
              </div>
              <div className="buttons"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Signup;
