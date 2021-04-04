import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./signup.scss";
//material ui
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import HelpIcon from "@material-ui/icons/Help";
import Preloader from "./preloader";
import { Redirect, Link } from "react-router-dom";
import TokenChecker from "./TokenChecker";

//material ui close
// import AccountBoxIcon from "@material-ui/icons/AccountBox";
// import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import MainLogo from "../../logo/MainLogo";
// import FancyImage from "./images/SignUp page Images/1-[Converted].png";
import femaleImage from "./images/SignUp page Images/Femaleuser.png";

// const photo = true;

const Signup = () => {
  // console.log(TokenChecker());
  const [fetching, isFetching] = useState(false);
  const [isSuccess, updateIsSuccess] = useState(() => {
    return { state: false,showSmallMessage:false , cause: "" };
  });
  
  const [APIResponses, updateResponse] = useState(null);
  let apiURL = "http://localhost/GoogleDrive/PUBLIC_html/phpBakend/signup.php";
  // const [apiResponse, updateApiResponse] = useState(null);
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
      if (shapes === null) return;
      if (shapes.current === null) return;
      const ShapeStyle = shapes.current.children;
      // ShapeStyle[0].style.marginLeft = style.marginLeft;
      // ShapeStyle[0].style.marginTop = style.marginTop;
      // ShapeStyle[1].style.marginRight = style.marginRight;
      // ShapeStyle[1].style.marginBottom = style.marginBottom;
      // console.log(style.marginLeft);
      // console.log(
      //   parseFloat(getComputedStyle(shapes.current.children[1]).width) + "px"
      // );
      // console.log(container.current.offsetLeft);
      // console.log(container.current.clientWidth);
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
  const responsiveProfilePhoto = () => {
    if (anotherWrapper.current === null) return;
    const defaultPhotoWrapperStyle = defaultPhotoWrapper.current.style;
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
  useEffect(() => {
    if (defaultPhotoWrapper === null) return;
    if (defaultPhotoWrapper.current === null) return;

    responsiveProfilePhoto();
    backgroundShapeArrangement();
    window.addEventListener("resize", () => {
      // console.log("resized");
      responsiveProfilePhoto();
      backgroundShapeArrangement();
      backgroundShapeArrangement();
    });
  });

  //....>>>>>>Profile Image Handlers

  //profile Image changeProp
  const [ProfileImgSrc, newProfileImgSrc] = useState(femaleImage);
  //close Profile Image changer
  const PreviewProfileImage = (e) => {
    //check file is valid or not
    if (e.target.files[0]) {
      // you have a file

      const imageType = e.target.files[0].type.split("/")[0];
      // console.log(imageType);
      if (imageType !== "image") {
        alert("please enter an image ");
        e.target.value = null;
        newProfileImgSrc(femaleImage);
        return;
      }
      return (
        // console.log(URL.createObjectURL(e.target.files[0])),
        newProfileImgSrc(URL.createObjectURL(e.target.files[0]))
      );
    } else {
      alert("oops ! some error occurred");
    }
  };
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
  //message shower
  const Message = () => {
    return (
      <div className="messageContainer" ref={MessageContainer}>
        <div className="message">
          <div className="button">
            <CloseIcon
              onClick={() => {
                MessageContainer.current.style.visibility = "hidden";
                // update_preloader("none");
                if(entireSignupPage != null || entireSignupPage.current != null){
                  entireSignupPage.current.style.height = "";
                }
              }}
            />
          </div>
          <div className="text" ref={MessageTextBox}></div>
        </div>
      </div>
    );
  };
  //
  const MessageContainer = useRef(null);
  const MessageTextBox = useRef(null);
  const entireSignupPage = useRef(null);

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
    const AlertMsg = alertShowers.current.style;
    AlertMsg.visibility = "visible";
  };

  const closeAlert = () => {
    const AlertMsg = alertShowers.current.style;
    AlertMsg.visibility = "hidden";
  };

  // .......................................>>>>>>>>>>>>>>>>>>>>>>>>>>

  // Backend Part

  //>>>>>>>>>>>>>>>.....................

  // const preloader = useRef(null);
  // const preloader = React.createRef();
  // const preloader = useRef(null);
  // const [preloader, update_preloader] = useState("none");
  // let preloader = ()
  // let mounted = true;
  const sendPostRequest = async (data) => {
    // console.log(preloader);
    // update_preloader("block");
    isFetching(true);

    try {
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
      updateResponse(jsondata);
    } catch (error) {
      // console.log(JSON.stringify(error));
      // alert("oops! something went wrong ");
      // update_preloader("none");
      isFetching(false);
    }
    // return ()=> mounted = false
  };
  const form = useRef(null);
  const formSubmit = (e) => {
    if (
      form_format_error.cno_format &&
      form_format_error.email_format &&
      form_format_error.first_name_format &&
      form_format_error.last_name_format &&
      form_format_error.password_format &&
      form_format_error.username_format
    ) {
      e.preventDefault();
      const data = new FormData(form.current);
      // if(isdMounted){
      sendPostRequest(data);
      // }
      // mounted(false);
    } else {
      alert("please Enter all the valid credentials");
      e.preventDefault();
      return false;
    }
  };

  //credential Validation....>>>>>>>
  const [form_format_error, update_form_format_error] = useState({
    final_format: false,
    first_name_format: false,
    last_name_format: false,
    email_format: false,
    cno_format: false,
    password_format: false,
    username_format: false,
  });

  //fname validation
  const error_first_name = useRef(null);
  const first_name_change = (e) => {
    const fname_text = e.target.value;
    // console.log(form_format_error.first_name_format);
    if (fname_text.match(/^[a-zA-Z. ]{1,30}$/)) {
      error_first_name.current.style.visibility = "hidden";
      update_form_format_error({
        ...form_format_error,
        first_name_format: true,
      });
    } else {
      error_first_name.current.style.visibility = "visible";
    }
  };
  //lname validation
  const error_last_name = useRef(null);
  const last_name_change = (e) => {
    const lname_text = e.target.value;
    if (lname_text.match(/^[a-zA-Z. ]{1,30}$/)) {
      error_last_name.current.style.visibility = "hidden";
      update_form_format_error({
        ...form_format_error,
        last_name_format: true,
      });
    } else {
      error_last_name.current.style.visibility = "visible";
    }
  };
  //email validation
  const error_email = useRef(null);
  const email_change = (e) => {
    const email_text = e.target.value;
    // console.log(email_text);
    if (email_text.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/)) {
      error_email.current.style.visibility = "hidden";
      update_form_format_error({ ...form_format_error, email_format: true });
    } else {
      error_email.current.style.visibility = "visible";
    }
  };
  //username validation
  const error_username = useRef(null);
  const username_change = (e) => {
    const username_text = e.target.value;
    if (username_text.match(/^[a-zA-Z\-@#\-_$%^&+=§!?0-9-]{6,20}$/)) {
      error_username.current.style.visibility = "hidden";
      update_form_format_error({ ...form_format_error, username_format: true });
    } else {
      error_username.current.style.visibility = "visible";
    }
  };
  //password validation
  const error_password = useRef(null);
  const password_change = (e) => {
    const password_text = e.target.value;

    if (
      password_text.match(
        /^(?=.*\d)(?=.*[@#\-_$%^&+=§!.?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!?]{8,20}$/
      )
    ) {
      error_password.current.style.visibility = "hidden";
      update_form_format_error({ ...form_format_error, password_format: true });
    } else {
      error_password.current.style.visibility = "visible";
    }
  };
  //cno validation
  const error_cno = useRef(null);
  const cno_change = (e) => {
    const con_text = e.target.value;
    if (con_text.match(/^[0-9]{10,10}$/)) {
      error_cno.current.style.visibility = "hidden";
      update_form_format_error({ ...form_format_error, cno_format: true });
    } else {
      error_cno.current.style.visibility = "visible";
    }
  };
  //const all formats ///....>>>>>>>>
  const allFormats = {
    contactNo_qn: "Contact No must be an 10 digit number e.g (9687500219)",
    email_qn: "Valid email format is john@cena.com",
    username_qn:
      "<p1>Username must be greater than 6 and less-than  20 chars</p1> .<br/> <br/>It can only contain <br/> <ul><li>English alphabet</li><li>English number</li><li>Special Chars :--@#-_$%^&+=§!?0-9-</li></ul>",
    password_qn:
      "<p1>Password must be greater than 8 and less than 20</p1><br/><p1>password must contain :--</p1><br/><ul><li>an upperCase letter eg.- (ABCD)</li><<li>a lower case letter e.g(abcd)</li><li>a special character like (@#-_$%^&+=§!?)</li>/ul>",
    FirstName_qn:
      "<p1> First name can only be combination of letter and greater than 1 letter and less than 30 letter</p1>",
    LastName_qn:
      "<p1> last name can only be combination of letter and greater than 1 letter and less than 30 letter</p1>",
  };

  const showSmallMessage = (message) => {
    if (MessageContainer == null || MessageContainer.current == null) {
      return;
    }
    // console.log("show small message");
    MessageContainer.current.style.visibility = "visible";
    MessageTextBox.current.innerHTML = message;
  };
  useEffect(() => {
    // console.log(isSuccess);
    if (isSuccess.showSmallMessage) {
      if (MessageContainer != null || MessageContainer.current != null) {
        MessageContainer.current.style.visibility = "visible";
        MessageTextBox.current.innerHTML = isSuccess.cause;
        if(entireSignupPage != null || entireSignupPage.current!=null) {
          entireSignupPage.current.style.height ="100%";
        }
      }
    }
  }, [isSuccess]);

  const showCauseOfError = (e) => {
    const keyId = e.currentTarget.getAttribute("name");
    const message = allFormats[keyId];
    // console.log(keyId);
    // console.log(message);
    showSmallMessage(message);
  };
  //redirect header
  const ResponseValidation = (apiResponse) => {
    let updateIsSuccessState = false,
    updateIsSuccessshowSmallMessage = false,
      updateIsSuccessCause = "ho ho";
    if (apiResponse !== null) {
      if (apiResponse.ImportantResponse[0].signup) {
        // console.log("M ERROR");
        updateIsSuccessState = true;
        updateIsSuccessCause = "Successfully Registered";

        // console.log("terror");
        // return <Redirect to="/Storage" />;
      } else if (apiResponse.ImportantResponse[0].signup === false) {
        // console.log(apiResponse.ImportantResponse[0].AvailableContactNumber);
        // console.log(apiResponse.ImportantResponse[0]);
        updateIsSuccessCause = "oops! something went wrong";
        if (apiResponse.ImportantResponse[0].AvailableContactNumber) {
          updateIsSuccessCause = "This contact number is already present";
          // console.log(updateIsSuccessCause);
          updateIsSuccessshowSmallMessage = true;
          isFetching(false);
          showSmallMessage(updateIsSuccessCause);
        } else if (apiResponse.ImportantResponse[0].AvailableEmail) {
          updateIsSuccessCause = "This email is already present";
          updateIsSuccessshowSmallMessage = true;
          isFetching(false);
          // console.log(cause);
          showSmallMessage(updateIsSuccessCause);
        } else if (apiResponse.ImportantResponse[0].AvailableUsername) {
          updateIsSuccessCause = "This username is not available";
          updateIsSuccessshowSmallMessage = true;
          isFetching(false);
          showSmallMessage(updateIsSuccessCause);
        }
      }
    }
    // console.log("cause : " + updateIsSuccessCause);
    updateIsSuccess((prev) => {
      return {
        ...prev,
        state: updateIsSuccessState,
        cause: updateIsSuccessCause,
        showSmallMessage:updateIsSuccessshowSmallMessage
      };
    });
    // console.log("cause");
    // console.log(isSuccess);
  };
  if (APIResponses != null) {
    ResponseValidation(APIResponses);
    updateResponse(null);
  }
  const TokenCheckerResp = TokenChecker();
  // console.log("resp");
  // console.log(TokenCheckerResp);
  if (isSuccess.state) {
    console.log("is success");
    return <Redirect to="/Storage" />;
  }

  // console.log("before TokenChecker");
  else if (TokenCheckerResp.isLoading || fetching) {
    console.log("TokenChecking");
    return (
      <>
        <Preloader />
      </>
    );
  }
  if (TokenCheckerResp.loggedIn) {
    // console.log("TokenCheck");
    return <Redirect to="/Storage/Admin" />;
  }

  // console.log("after TokenChecker");
  // return (<h1>Hello</h1>
  //   )

  return (
    <>
      <div className="entireSignupPage" ref = {entireSignupPage}>
        {/* <Preloader display={preloader} /> */}
        <Alert />
        <Message style={{ visibility: "hidden" }} />
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
                <div
                  className="text"
                  onClick={visibleAlert}
                  style={{ cursor: "pointer" }}
                >
                  <h1>Change profile picture by click upon it</h1>
                </div>
              </div>
              <div className="form">
                <form ref={form} onSubmit={formSubmit} autoComplete="on">
                  <input type="hidden" name="SignUPForm" value="SignUPForm" />
                  <div className="name">
                    <div className="fName">
                      <label
                        htmlFor=""
                        className="l_f_name"
                        style={{ display: "none" }}
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        className="first_name"
                        placeholder="First Name"
                        name="fname"
                        onChange={first_name_change}
                      />
                      <div className="errorContainer">
                        <span className="error" ref={error_first_name}>
                          Not Valid
                        </span>
                        <HelpIcon
                          className="helpIcon"
                          name="FirstName_qn"
                          onClick={showCauseOfError}
                        />
                      </div>
                    </div>
                    <div className="lname">
                      <label
                        htmlFor="lname"
                        className="lname"
                        style={{ display: "none" }}
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        className="last_name"
                        placeholder="Last Name"
                        name="lname"
                        onChange={last_name_change}
                      />
                      <div className="errorContainer">
                        <span className="error" ref={error_last_name}>
                          Not Valid
                        </span>
                        <HelpIcon
                          className="helpIcon"
                          name="LastName_qn"
                          onClick={showCauseOfError}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="username">
                    <label
                      htmlFor="username"
                      className="l_username"
                      style={{ display: "none" }}
                    >
                      User Name
                    </label>
                    <input
                      type="username"
                      name="username"
                      placeholder="username"
                      onChange={username_change}
                      autoComplete="username"
                    />
                    <div className="errorContainer">
                      <span className="error" ref={error_username}>
                        Not Valid
                      </span>
                      <HelpIcon
                        className="helpIcon"
                        name="username_qn"
                        onClick={showCauseOfError}
                      />
                    </div>
                  </div>
                  <div className="password">
                    <label htmlFor="password" className="l_password">
                      password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      autoComplete="new-password"
                      onChange={password_change}
                    />
                    <div className="errorContainer">
                      <span className="error" ref={error_password}>
                        Not Valid
                      </span>
                      <HelpIcon
                        className="helpIcon"
                        name="password_qn"
                        onClick={showCauseOfError}
                      />
                    </div>
                  </div>
                  <div className="email">
                    <label htmlFor="email" className="l_email">
                      Enter Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      onChange={email_change}
                    />
                    <div className="errorContainer">
                      <span className="error" ref={error_email}>
                        Not Valid
                      </span>
                      <HelpIcon
                        className="helpIcon"
                        name="email_qn"
                        onClick={showCauseOfError}
                      />
                    </div>
                  </div>
                  <div className="contact_no">
                    <label htmlFor="number" className="l_c_n">
                      Enter contact number
                    </label>
                    <input
                      type="number"
                      name="contact_no"
                      placeholder="Contact No"
                      onChange={cno_change}
                    />
                    <div className="errorContainer">
                      <span className="error" ref={error_cno}>
                        Not Valid
                      </span>
                      <HelpIcon
                        className="helpIcon"
                        name="contactNo_qn"
                        onClick={showCauseOfError}
                      />
                    </div>
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
                    <span className="error"></span>
                  </div>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    name="userPhoto"
                    ref={ImageUpload}
                    onChange={PreviewProfileImage}
                  />
                  <input type="submit" className="submitButton" />
                </form>
              </div>
            </div>
            <div className="buttons" style={{ marginTop: "40px" }}>
              <Link to="/Storage" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Signup;
