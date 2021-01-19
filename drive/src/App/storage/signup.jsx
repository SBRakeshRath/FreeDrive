import React, { useState, useEffect, useRef } from "react";
import "./signup.scss";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import MainLogo from "../../logo/MainLogo";
import FancyImage from "./images/SignUp page Images/1-[Converted].png";
import femaleImage from "./images/SignUp page Images/Femaleuser.png";
// const photo = true;

const Signup = () => {
  const [uploadImage, uploadImageCheck] = useState(false);
  const imagePreview = () => {
    console.log("changed");
    const photo = document.getElementById("user_profile_photo");
    const file = this.innerHTML;
    console.log(file);
  };
  const container = useRef(null);
  const shapes = useRef(null);
  const defaultPhotoWrapper = useRef(null);
  const backgroundShapeArrangement = () => {
    if (container !== null) {
      const style = getComputedStyle(container.current);
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
      console.log(container.current.clientWidth)
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
    });
  }, [defaultPhotoWrapper, anotherWrapper]);

  return (
    <>
      <div className="entireSignupPage">
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
                      {uploadImage === false && (
                        <>
                          <div
                            className="defaultPhotoWrapper"
                            ref={defaultPhotoWrapper}
                          >
                            <div className="default_Photo">
                              {/* <AccountBoxIcon /> */}
                              <img src={femaleImage} alt="userImage" />
                            </div>
                          </div>
                          <div className="changePhotoOption">
                            <div className="shader"></div>
                            <div className="icons"></div>
                          </div>

                          <div className="upload_image_div_container">
                            <label htmlFor="uploaded_img">
                              <div className="uploadIcon">
                                <AddAPhotoIcon />
                              </div>
                            </label>
                            <input
                              type="file"
                              style={{ visibility: "hidden" }}
                              id="uploaded_img"
                              onChange={imagePreview}
                            />
                          </div>
                        </>
                      )}
                      {/* <div className="default_Photo"><AccountBoxIcon/></div> */}
                      {uploadImage === false && (
                        <div className="upload_Image">
                          <img src="" alt="" id="user_profile_photo" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="form">
                <form>
                  <div className="name">
                    <div className="fName">
                      <label htmlFor="" className="l_f_name">
                        First Name
                      </label>
                      <input type="text" className="first_name" />
                      <span className="error">No error</span>
                    </div>
                    <div className="lname">
                      <label htmlFor="lname" className="lname">
                        Last name
                      </label>
                      <input type="text" className="last_name" />
                      <span className="error">No error</span>
                    </div>
                  </div>
                  <div className="username">
                    <label htmlFor="username" className="l_username">
                      User Name
                    </label>
                    <input type="username" name="username" />
                    <span className="error">No error</span>
                  </div>
                  <div className="password">
                    <label htmlFor="password" className="l_password">
                      password
                    </label>
                    <input type="password" name="password" />
                    <span className="error">No error</span>
                  </div>
                  <div className="email">
                    <label htmlFor="email" className="l_email">
                      Enter Email
                    </label>
                    <input type="email" name="email" />
                    <span className="error">No error</span>
                  </div>
                  <div className="contact_no">
                    <label htmlFor="number" className="l_c_n">
                      Enter contact number
                    </label>
                    <input type="text" name="contact_no" />
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
                    ></textarea>
                    <span className="error">No error</span>
                  </div>
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
