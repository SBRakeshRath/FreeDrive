import { useState } from "react";
import axios from "axios";
// import PreLoader from "./preloader";

const TokenChecker = () => {
  let apiURL = "http://localhost/GoogleDrive/PUBLIC_html/phpBakend/login.php";
  const [TokenResponse, UpdateTokenResponse] = useState({
    isLoading: true,
    loggedIn: false,
  });
  // const [rat , newRat] = useState(true);

  if (TokenResponse.isLoading === true) {
    const name = "userToken";
    var allCookie = document.cookie.split(";");
    console.log(allCookie);
    let ImpCookie = null;
    for (let index = 0; index < allCookie.length; index++) {
      var cookies = allCookie[index].split("=");
      if (name === cookies[0].trim()) ImpCookie = cookies;
    }
    if (ImpCookie !== null || sessionStorage.getItem(name) !== null) {
      console.log("insideFunction");
      let userTOKEN = null;
      ImpCookie !== null
        ? (userTOKEN = ImpCookie[1].trim())
        : (userTOKEN = sessionStorage.getItem(name));

      if (userTOKEN !== null) {
        const TokenChecker = async () => {
          //form container
          let userDataToken = new FormData();
          userDataToken.append("name", "Token_Check");
          userDataToken.append("Token", userTOKEN);
          //now fetch api with form DataBase

          try {
            const config = {
              method: "POST",
              url: apiURL,
              data: userDataToken,
            };
            const request = await axios(config);
            const response = request.data;
            // console.log(response.TokenAuth);
            UpdateTokenResponse({
              isLoading: false,
              loggedIn: response.TokenAuth,
            });
            console.log("Api response");
            console.log("stating" + response.TokenAuth);
            console.log("useState response");
            console.log(TokenResponse);
          } catch (error) {
            console.log(JSON.stringify(error));
          }
        };
        TokenChecker();
      } 
      else {
        UpdateTokenResponse({
          isLoading: false,
          loggedIn: false,
        });
      }
    } 
    else {
      UpdateTokenResponse({
        isLoading: false,
        loggedIn: false,
      });
    }
    console.log(TokenResponse);

    //for Testing purpose
    console.log("ImpCookie" + ImpCookie);

    console.log("console from TokenChecker page");
    // console.log(TokenResponse);
  }

  return TokenResponse;
};

export default TokenChecker;
