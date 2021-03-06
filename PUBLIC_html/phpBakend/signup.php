<?php
require_once("./config.php");
// header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// echo ("in signup PHP");
//connection Check 
$connection = false;

//..>>>>

//user Credential check for
$userDataGet = false;

//...>>>

// user Details availability check
$AvailableUsername = false;
$AvailableEmail = false;
$AvailableCno = false;


//...>>>>>
//signup Success Message
$signup = false;

//..>>>>
//Response  Message
//.....
if ($_POST) {
    // echo ("in post request");
    if ($conn) {
        // echo ("\n connection established");
        $connection = true;
        if (isset($_POST["SignUPForm"])) {
            // echo ("in signup Page");
            // $fname = mysqli_real_escape_string($conn, $_POST['fname']);
            // $lname = mysqli_real_escape_string($conn, $_POST['lname']);
            // $username = mysqli_real_escape_string($conn, $_POST['username']);
            // $password = mysqli_real_escape_string($conn, $_POST['password']);
            // $email = mysqli_real_escape_string($conn, $_POST['email']);
            // $cno = mysqli_real_escape_string($conn, $_POST['contact_no']);
            // $about = mysqli_real_escape_string($conn, $_POST['description']);
            //removing all unwanted slashes
            // if(get_magic_quotes_gpc()){
            //     echo("hello");
            // }
            $fname = trim($_POST['fname']);
            $lname =  trim($_POST['lname']);
            $username =  trim($_POST['username']);
            $password = trim($_POST['password']);
            $email =  trim($_POST['email']);
            $cno =  trim($_POST['contact_no']);
            $about = $_POST['description'];
            if (preg_match("/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/", $email)) {
                // echo "\nmy_email is a not valid email address\n";
                $mail_format = true;
            } else {
                $mail_format = false;
            }
            if (preg_match("/^[a-zA-Z\-\@#\-_$%^&+=§!\?0-9-]{6,20}$/", $username)) {
                // echo ("\nInvalid Name\n");
                $username_format = true;
            } else {
                $username_format = false;
            }
            if (
                preg_match('/^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?\'\"]{8,20}$/', $password)
            ) {
                $password_format = true;
                // echo ("\n password incorrect");
                /* conditions for true
                at least one lowercase char
                at least one uppercase char
                at least one digit
                at least one special sign of @#-_$%^&+=§!?

                */
            } else {
                $password_format = false;
            }
            if (preg_match('/^[0-9]{10,10}$/', $cno)) {
                // echo("\nInvalid contact no.");
                $cno_format = true;
            } else {
                $cno_format = false;
            }
            if (preg_match('/^[a-zA-Z\.\ ]{1,30}$/', $fname)) {
                // echo("\n invalid fname");
                $fname_format = true;
            } else {
                $fname_format = false;
            }
            if (preg_match('/^[a-zA-Z\.\ ]{1,30}$/', $lname)) {
                // echo("\n invalid lname");
                $lname_format = true;
            } else {
                $lname_format = false;
            }

            echo ("\n");
            if ($lname_format && $fname_format && $cno_format && $password_format && $username_format) {
                $userCredentialFormat = true;

                if ($fname && $lname && $username && $password && $email && $cno) {

                    //hashing the password after verifying its formats
                    $password_salt = "dev_SBRR";
                    $password_salt = sha1(md5($password_salt));
                    $password = sha1(md5($password.$password_salt));


                    //already changed the password string
                    $userDataGet = true;

                    $usernameCheck = "SELECT * FROM `usersdeatail` WHERE `username` = ?";
                    $emailCheck = "SELECT * FROM `usersdeatail` WHERE `email` = ?";
                    $cnoCheck = "SELECT * FROM `usersdeatail` WHERE `cno` = ?";
                    $stmt = mysqli_stmt_init($conn);
                    // username Availability Check
                    // echo ("before prepare Statement \n");
                    if (mysqli_stmt_prepare($stmt, $usernameCheck)) {
                        // echo ("prepare Statement");
                        mysqli_stmt_bind_param($stmt, 's', $username);
                        mysqli_stmt_execute($stmt);
                        $result = mysqli_stmt_get_result($stmt);
                        $row = mysqli_fetch_assoc($result);
                        if ($row) {
                            // echo ("username Already Taken");
                            $AvailableUsername = true;
                        }
                    }
                    if (mysqli_stmt_prepare($stmt, $emailCheck)) {
                        mysqli_stmt_bind_param($stmt, 's', $email);
                        mysqli_stmt_execute($stmt);
                        $result = mysqli_stmt_get_result($stmt);
                        $row = mysqli_fetch_assoc($result);
                        if ($row) {
                            // echo ("This email is already in use");
                            $AvailableEmail = true;
                        }
                    }
                    if (mysqli_stmt_prepare($stmt, $cnoCheck)) {
                        mysqli_stmt_bind_param($stmt, 's', $cno);
                        mysqli_stmt_execute($stmt);
                        $result = mysqli_stmt_get_result($stmt);
                        $row = mysqli_fetch_assoc($result);
                        if ($row) {
                            // echo ("Contact no. is already in use");
                            $AvailableCno = true;
                        }
                    }

                    //create user tokens


                    function create_user_token()
                    {
                        $token = openssl_random_pseudo_bytes(16);

                        //Convert the binary data into hexadecimal representation.
                        $token = bin2hex($token);

                        //Print it out for example purposes.
                        return $token;
                        // create_user_token();
                    }

                    $userTokenInDatabase = true;
                    if ($userTokenInDatabase = true) {
                        // echo("hello");
                        // echo create_user_token();
                        // echo($token);
                        for ($i = 0; $i < 5;) {
                            # code...
                            // echo $i;
                            $token = openssl_random_pseudo_bytes(16);

                            //Convert the binary data into hexadecimal representation.
                            $token = bin2hex($token);
                            // if ($i !=4){
                            // $token = "6f7793da58c35fca5610cda45713882f";}
                            $TokenCheck = "SELECT * FROM `usersdeatail` WHERE `UserToken` = ?";
                            $statements = mysqli_stmt_init($conn);
                            $prepareStatement = mysqli_stmt_prepare($statements, $TokenCheck);
                            if ($prepareStatement) {
                                mysqli_stmt_bind_param($statements, 's', $token);
                                if (mysqli_stmt_execute($statements)) {
                                    $result = mysqli_stmt_get_result($statements);
                                    $row = mysqli_fetch_assoc($result);
                                    if ($row) {
                                        // echo ("Contact no. is already in use");
                                        $userTokenInDatabase = true;
                                        // return $userTokenInDatabase;
                                        // echo ("true");
                                    } else {
                                        $userTokenInDatabase = false;
                                        // return $userTokenInDatabase;
                                        // echo ("false");
                                        $FinalUserToken = $token;
                                        break;
                                    }
                                }
                            }
                        }
                    }

                    if ($AvailableUsername == false && $AvailableEmail == false && $AvailableCno == false) {
                        $newDirRoot = "../../1213456ALLUSERS/";
                        // $newDirRoot = "";
                        clearstatcache();
                        $salt = "sbrakeshrath1234";
                        $folderName = $FinalUserToken.$salt;
                        if (file_exists($newDirRoot . $folderName)) {
                            $signup = false;
                            
                        } else {
                            // echo ("username Check");
                            // $FinalUserToken = "ASDSADSAD";
                            $sql = "INSERT INTO `usersdeatail` ( `fName`, `lName`, `email`, `cno`, `username`, `password`, `UserToken`, `about` ) VALUES ( ? , ? , ? , ? , ? , ?, ?, ? )";
                            // $sql = "SELECT * FROM `usersdeatail` WHERE `username` = ? AND `password` = ?";
                            // $sql = "INSERT INTO `usersdeatail` (`fname`,`lName`) VALUES (?)";

                            $stmt = mysqli_stmt_init($conn);
                            if (isset($stmt)) {
                                // echo("hh");
                            }
                            $prepare = mysqli_stmt_prepare($stmt, $sql);
                            if ($prepare) {
                                mysqli_stmt_bind_param($stmt, 'ssssssss', $fname, $lname, $email, $cno, $username, $password, $FinalUserToken, $about);
                                // mysqli_stmt_bind_param($stmt,'s',$username);
                                // mysqli_stmt_execute($stmt);
                                // $InsertResult = mysqli_stmt_get_result($stmt);
                                // echo ("prepare stmt");
                                if (mysqli_stmt_execute($stmt)) {
                                    $signup = true;
                                    // echo ($username);
                                    // echo ("\n");
                                    // echo ($about);
                                    mkdir($newDirRoot . $folderName);
                                    // mkdir($username);
                                    // create 2 Separate directories 1.root  to give user to access this
                                    //& 2.to store user details.
                                    mkdir($newDirRoot . $folderName . "/userDetails");
                                    mkdir($newDirRoot . $folderName . "/root");
                                    $ImageUploadDir = $newDirRoot . $folderName . "/userDetails" . "/";
                                    $target_file = $ImageUploadDir . basename($_FILES["userPhoto"]["name"]);
                                    $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
                                    $ImageRename = "userPhoto" . "." . $imageFileType;
                                    $target_file = $ImageUploadDir . $ImageRename;
                                    if (move_uploaded_file($_FILES["userPhoto"]["tmp_name"], $target_file)) {
                                        $signup = true;
                                    }
                                } else {
                                    // echo ("execution failed");
                                }
                            } else {
                                // echo ("prepare Statement fail");
                            }
                        }
                    }
                }
            }else{$userCredentialFormat = false;}
            //Response  ...>>>>>>>
            $super_response_arr = array();
            $super_response_arr["ImportantResponse"] = array();
            $super_response_arr["validationDetails"] = array();
            $validation_details = array(
                "userCredentialFormat" => $userCredentialFormat,
                "usernameFormat" => $username_format,
                "emailFormat" => $mail_format,
                "fnameFormat" => $fname_format,
                "passwordFormat" => $password_format,
                "lnameFormat" => $lname_format,
                "cno" => $cno_format
            );
            array_push($super_response_arr["validationDetails"], $validation_details);
            $Imp_response = array(
                "signup" => $signup,
                "ReceivedUserDetails" => $userDataGet,
                "AvailableUsername" => $AvailableUsername,
                "AvailableEmail" => $AvailableEmail,
                "AvailableContactNumber" => $AvailableCno,
            );
            array_push($super_response_arr["ImportantResponse"], $Imp_response);
            echo json_encode($super_response_arr);

            //.....>>>
        }
    }
}else{include("./errorpage.html");}
?>



