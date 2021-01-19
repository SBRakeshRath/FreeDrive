

<?php
require_once("./config.php");
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
// echo ("helloBackendPage");
class Userdata
{
    public $login;
    public $session_id;
    public $userToken;
    public $error_exists;
    public $errors_list;
    public $success_list;
}
class Errors
{
    // public $post_request;
    public $sql_connection;
    public $receive_username_password;
    public $cause_ERROR;
}
class Success
{
    // public $post_request;
    public $sql_connection;
    public $receive_username_password;
    public $detail_Success;
}
class Cause_error
{
    public $sql_connection;
    public $receive_username_password;
}
class Detail_success
{
    public $sql_connection;
    public $receive_username_password;
}

$error = new Errors();
$userdata = new Userdata();
$success = new Success();
$cause_ERROR = new Cause_error();
$detail_Success = new Detail_success();
// $success->post_request = "post Request was successful";
$error->sql_connection = true;
$error->receive_username_password = true;
$error->cause_ERROR = $cause_ERROR;
$success->sql_connection = true;
$success->receive_username_password = true;
$success->detail_Success = $detail_Success;

$show_error_page = false;

//Token Checker.....>>>>>>>>

class TokenChecker
{
    public $TokenAuth;
    public $error;
}
$TokenChecker = new TokenChecker();
$TokenChecker->TokenAuth = false;
$TokenChecker->error = true;


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // echo ("\n OP post request");

    $userdata->error_exists = true;

    if (isset($_POST["LoginForm"])) {
        // echo ("\n result from loginPage");
        if ($conn) {
            $username = mysqli_real_escape_string($conn, trim($_POST["username"]));
            // $password_r = trim($_POST["password"]);
            $password = mysqli_real_escape_string($conn, $_POST["password"]);
            // echo ($username . $password);
        } else {
            $cause_ERROR->sql_connection = "our database is not responding Your request";
            $error->sql_connection = false;
            $userdata->error_exists = true;
        }
        // echo($password);
        // $_lastname = mysql_real_escape_string($username);
        // echo($_lastname);
        // $remember_me = $_POST["Remember_me"];
        // echo($remember_me);
        // if(isset($_POST["Remember_me"])){
        // 	$userdata->userToken = $_POST["Remember_me"];
        // }else{$userdata->userToken = "off";}

        if (isset($username) && (isset($password))) {
            // echo("username is" . $username."\nPassword is".$password);
            $success->receive_username_password = true;
            $detail_Success->receive_username_password = "received username and password";
            if (!$conn) {
                // die("connection die : " . mysqli_connect_error());
                $cause_ERROR->sql_connection = "our database is not responding Your request";
                $error->sql_connection = false;
                $userdata->error_exists = true;
            } else {
                $detail_Success->sql_connection = "connection to the database established";
                $success->sql_connection = true;
                $userdata->error_exists = false;
                // $query = "SELECT * FROM `usersdeatail` WHERE `username` = '$username' AND `password` = '$password'";
                // $result = mysqli_query($conn, $query);
                // $result = mysqli_fetch_assoc($result);

                //..>>>> prepared statements

                //create a template
                $sql = "SELECT * FROM `usersdeatail` WHERE `username` = ? AND `password` = ?";
                //create a prepared statement
                $stmt = mysqli_stmt_init($conn);
                if (!mysqli_stmt_prepare($stmt, $sql)) {
                    echo ("Sql Statement Failed");
                } else {
                    mysqli_stmt_bind_param($stmt, "ss", $username, $password);
                    //run parameters in DataBase
                    mysqli_stmt_execute($stmt);
                    $result = mysqli_stmt_get_result($stmt);
                    $row = mysqli_fetch_assoc($result);
                }

                if ($row) {
                    $userdata->login = true;
                    // echo ("\nwelcome to login page");
                    if (isset($_POST["Remember_me"])) {
                        $userdata->userToken = $result["UserToken"];
                    } else {
                        $userdata->userToken = false;
                    }

                    session_start();
                    $_SESSION["username"] = $username;
                    $_SESSION["login"] = $username;
                    if (isset($_SESSION["username"])) {
                        // echo ("\nsession set");
                        // echo ("\n session id is :--" . session_id());
                        // $userdata = new userdata();
                        $userdata->login = true;
                        $userdata->session_id = session_id();
                    }
                } else {
                    // echo ("\nuser not found");
                    $userdata->login = false;
                }
            }
        } else {
            $cause_ERROR->receive_username_password = "server has not received your request";
            $error->receive_username_password = true;
        }
        $userdata->success_list = $success;
        $userdata->errors_list = $error;
        $jsonData = json_encode($userdata);
        echo ("\n");
        echo ($jsonData);
    } else {
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
        } else {
            echo ("\n U areNot allow to visit this page");
            $show_error_page = true;
        }
    }
} else {
    // echo ("\n no post Request");
    // header("Location: http://localhost:3000/storage/");
    $show_error_page = true;
}

?>



