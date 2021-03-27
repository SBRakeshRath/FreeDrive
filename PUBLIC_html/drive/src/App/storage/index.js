import React, { useRef, useState, useEffect } from "react";
import "./index.scss";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Loading from "./preloader";

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Storage = (props) => {
  const form = useRef(null);
  // change the apiURL..>>>>>>>>>>>>>>>>>>>>>>>>

  let apiURL = "http://localhost/GoogleDrive/PUBLIC_html/phpBakend/login.php";
  //................>>>>>>>>>>

  const [loading, isLoading] = useState(false);

  const [userData, newUserData] = useState({});
  const [loggedInStatus, check] = useState(false);
  const [LSC, ILSC] = useState(0);
  const CheckedLoginState = (name) => {
    //checking if cookie is available or not
    var allCookie = document.cookie.split(";");
    console.log(allCookie);
    let ImpCookie = null;
    for (let index = 0; index < allCookie.length; index++) {
      var cookies = allCookie[index].split("=");
      if (name === cookies[0].trim()) ImpCookie = cookies;
    }
    console.log("ImpCookie" + ImpCookie);
    //....

    if (ImpCookie !== null || sessionStorage.getItem(name) !== null) {
      let userTOKEN = null;
      ImpCookie !== null
        ? (userTOKEN = ImpCookie[1].trim())
        : (userTOKEN = sessionStorage.getItem(name));
      if (userTOKEN !== null) {
        const TokenChecker = async () => {
          isLoading(true);
          console.log("userToken exist");
          let userDataToken = new FormData();
          userDataToken.append("name", "Token_Check");
          userDataToken.append("Token", userTOKEN);
          console.log(userDataToken);
          try {
            // isLoading(true);

            const config = {
              method: "POST",
              url: apiURL,
              data: userDataToken,
              withCredentials: true,
            };

            const request = await axios(config);
            const response = request.data;
            console.log(response);
            isLoading(false);
            console.log("before");
            if (response.TokenAuth === true && response.error === false) {
              check(true);
            }
          } catch (error) {
            console.log(JSON.stringify(error));
          }
          console.log("loading response : " + loading);
        };

        TokenChecker();
        // ILSC(LSC + 1);
      }
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    // console.log("submitted");
    ILSC(LSC + 1);
    const data = new FormData(form.current);
    // console.log(data.entries);
    // for (var pair of data.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    const sendPostRequest = async () => {
      isLoading(true);
      try {
        console.log(data);
        const config = {
          method: "POST",
          url: apiURL,
          data: data,
          withCredentials: true,
        };
        const PostResp = await axios(config);
        // console.log(PostResp.data);
        const jsondata = JSON.parse(JSON.stringify(PostResp.data));
        console.log(jsondata.login);
        newUserData(jsondata);
      } catch (error) {
        console.log(JSON.stringify(error));
      }
    };
    sendPostRequest();
  };

  useEffect(() => {
    // console.log(userData);
    function setCookies(n, v, e) {
      let expiry = "";
      if (e) {
        var date = new Date();
        date.setTime(date.getTime() + e * 24 * 60 * 60 * 1000);
        expiry = "; expires = " + date.toUTCString;
      }
      document.cookie = n + "=" + v + expiry + "; path=/";
    }
    if (Object.keys(userData).length !== 0) {
      console.log("login request send");
      if (userData.login === false) {
        isLoading(false);
        alert("please enter correct username and password");
      }
      if (userData.login === true) {
        if (userData.userTokenSet !== false) {
          setCookies("userToken", userData.userToken, 90);

          check(true);
        } else {
          sessionStorage.setItem("userToken", userData.userToken);
          document.cookie =
            "userToken =;expires = 01 jan 1970 00:00:00 UTC;path=/";
          check(true);
        }

        //alert must be at the bottom don't know why
        // alert("user found");
      }
    }
  }, [userData]);
  if (LSC === 0) {
    if (loggedInStatus === false) {
      CheckedLoginState("userToken");
    }
    ILSC(LSC + 1);
  }
  // }
  if (loggedInStatus === true) return <Redirect to="/Storage/Admin" />

  if (loading) {
    return <Loading display="block" />;
  }

  return (
    <>
      <div className="storageIndex">
        <section className="card" id="card">
          <form onSubmit={loginSubmit} id="formElem" ref={form}>
            <div className="logo" id="logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={100}
                height={100}
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" />
              </svg>
            </div>
            <h1>Admin Log-in</h1>
            <p className="levels l-user">Username</p>

            <input
              type="text"
              className="username"
              id="username"
              name="username"
              autoComplete="username"
            />
            <p id="levels" className="levels l-pwd">
              Password
            </p>
            <input
              type="password"
              className="password"
              id="password"
              name="password"
              autoComplete="current-password"
            />
            <div className="Remember_me">
              <input
                type="checkbox"
                name="Remember_me"
                className="check_box"
                value="on"
              />
              <p>Remember me</p>
            </div>

            {/* <input type="hidden" /> */}
            <input type="hidden" name="LoginForm" value="LoginForm" />
            {/* <input type="checkbox" class="checkbox" id="checkbox"> */}
            <button className="submit" id="submit" value="submit" name="submit">
              login
            </button>
          </form>
          <Link className="signup" id="signup" to="./storage/signup">
            <button className="b-s"> signup</button>
          </Link>
        </section>
      </div>
    </>
  );
};

export default Storage;
