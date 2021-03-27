<?php
require_once("./config.php");
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// echo("Hello");
class TokenChecker
{
    public $TokenAuth;
    public $error;
}
$TokenChecker = new TokenChecker();
$TokenChecker->TokenAuth = false;
$TokenChecker->error = true;


if (isset($_POST["name"])) {

    if ($_POST["name"] === "Token_Check") {

        if (isset($_POST["Token"])) {
            if (trim($_POST["Token"]) !== "") {
                // echo ("hello");
                $user_token_from_client = $_POST["Token"];
                if ($conn) {
                    $query = "SELECT * FROM `usersdeatail` WHERE `UserToken` = '$user_token_from_client'";
                    $result = mysqli_fetch_assoc(mysqli_query($conn, $query));
                    if ($result) {
                        // echo ($result["username"]);
                        $TokenChecker->TokenAuth = true;
                        $TokenChecker->error = false;
                    } else {
                        // echo ("token is wrong");
                        $TokenChecker->TokenAuth = false;
                        $TokenChecker->error = false;
                    }
                } else {
                    // echo ("Our DataBase is not responding");
                    $TokenChecker->TokenAuth = false;
                    $TokenChecker->error = false;
                }
            } else {
                $TokenChecker->TokenAuth = false;
                $TokenChecker->error = false;
            }
        } else {
            $TokenChecker->TokenAuth = false;
            $TokenChecker->error = false;
        }

        echo (json_encode($TokenChecker));
    }
}

?>