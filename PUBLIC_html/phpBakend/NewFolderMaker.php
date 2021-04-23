<?php
require_once("./config.php");
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
$folderId = null;
$createFolder = false;
$success = false;
$a = "a";
$rootF = false;
$cause  = "some error happened";
if ($_POST) {
    // echo ("hallo");
    // print_r($_POST);
    if (isset($_POST["makeNewFolder"]) && $_POST["makeNewFolder"]) {
        // for ($lm=0; $lm < 1; $lm++) { 
        # code...

        if (
            ($_POST["folderName"] !== "" && is_string($_POST["folderName"])) &&
            ($_POST["folderPath"] !== "" && is_string($_POST["folderPath"])) &&
            ($_POST["userToken"] !== "" && is_string($_POST["userToken"])) &&
            substr($_POST["folderPath"], 0, 4) === "root" && is_string($_POST["userFolderPathName"])
            && substr($_POST["userFolderPathName"], 0, 4) === "root"
        ) {
            if (
                $_POST["folderPath"]  && $_POST["folderPath"] !== "root"
            ) {
                mysqli_begin_transaction($conn);
                $stmt = mysqli_stmt_init($conn);
                // $sql = "SELECT * FROM foldertable JOIN servertoken ON servertoken.userToken = ? AND foldertable.folderPath = ? LIMIT 1";
                $sql = "SELECT * FROM foldertable 
                WHERE serverToken = (SELECT serverToken FROM `servertoken` WHERE `userToken` = ? LIMIT 1)
                AND foldertable.folderPath = ?
                ";
                mysqli_stmt_prepare($stmt, $sql);
                if (mysqli_stmt_prepare($stmt, $sql)) {
                    // echo ("\n prepared\n");
                }
                mysqli_stmt_bind_param($stmt, "ss", $_POST["userToken"], $_POST["folderPath"]);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);
                if ($row = mysqli_fetch_array($result)) {
                    $createFolder = true;
                    // print
                    print_r($row);
                    echo ("\n create \n");
                    $rootF = false;
                }
            } else if ($_POST["folderPath"] === "root") {
                $createFolder = true;
                $a = "b";
                $rootF = true;
            } else {
                $createFolder = false;
                $rootF = false;
            }
            // echo ("all Credentials are okay");
            if ($createFolder) {

                for ($i = 0; ;) { //`servertoken`.`serverToken` AS `sToken`
                    $id = mt_rand(100, 9999999999);
                    // echo($id);
                    // $id = 1;
                    $stmt = mysqli_stmt_init($conn);
                    //     $sql = "SELECT foldertable.*

                    // FROM foldertable

                    // JOIN servertoken

                    // ON servertoken.userToken = ? AND foldertable.folderPath = ? LIMIT 1";
                    $sql = "SELECT * FROM foldertable 
                 WHERE serverToken = (SELECT serverToken FROM `servertoken` WHERE `userToken` = ? LIMIT 1)
                 AND foldertable.folderPath = ?
                 ";

                    if (!mysqli_stmt_prepare($stmt, $sql)) {
                        // echo ("\nprepare failed");
                    } else {
                        // $token ="36daaae649c8b5bcfffe14e7cf5702cb";
                        $path = $_POST["folderPath"] . "/" . strval($id);
                        $path = substr(strstr($path, '/'), 1);
                        $path = "root/" . $path;
                        // $path =  "1/1";
                        mysqli_stmt_bind_param($stmt, "ss", $_POST["userToken"], $path);
                        mysqli_stmt_execute($stmt);
                        $result = mysqli_stmt_get_result($stmt);
                        if (mysqli_fetch_assoc($result)) {
                            // echo ("found");
                        } else {
                            $folderId = $id;
                            break;
                        }
                    }
                    // break;
                }
            }
        } else {
            // echo ("some error");
        }
        if ($folderId != null && !$rootF) {

            # code...

            $stmt = mysqli_stmt_init($conn);
            $sql = "SELECT * FROM `servertoken` WHERE `userToken` = ?  LIMIT 1";
            if (mysqli_stmt_prepare($stmt, $sql)) {
                mysqli_stmt_bind_param($stmt, "s", $_POST["userToken"]);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);
                if ($row = mysqli_fetch_assoc($result)) {
                    // echo "\ntoken";
                    // print_r($row);
                    $FileServerToken = $row["serverToken"];
                    //Insert Data
                    $stmt = mysqli_stmt_init($conn);
                    $sql = "INSERT INTO foldertable(`serverToken` , `folderName` , `folderid` , `folderPath` , `createdTime` , `LastEdited` , `previewPath` , `userFolderPathName`)
                           VALUES( (SELECT serverToken FROM `servertoken` WHERE `userToken` = ? LIMIT 1) ,? ,? ,? ,CURRENT_TIMESTAMP() ,CURRENT_TIMESTAMP() ,? ,? ) 
                     ";
                    $sql = "  INSERT INTO foldertable(`serverToken` , `folderName` , `folderid` , `folderPath` , `createdTime` , `LastEdited` , `previewPath` , `userFolderPathName`)
                     SELECT (SELECT serverToken FROM `servertoken` WHERE `userToken` = ? LIMIT 1) ,? ,? ,? ,CURRENT_TIMESTAMP() ,CURRENT_TIMESTAMP() ,? ,?
                     FROM foldertable
                     WHERE (`folderPath` = ?
                     AND serverToken = (SELECT serverToken FROM `servertoken` WHERE `userToken` = ? LIMIT 1))
                    ";
                    $sql = "  INSERT INTO foldertable(`serverToken` , `folderName` , `folderid` , `folderPath` , `createdTime` , `LastEdited` , `previewPath` , `userFolderPathName`)
                     SELECT (SELECT serverToken FROM `servertoken` WHERE `userToken` = ? LIMIT 1) ,? ,? ,? ,CURRENT_TIMESTAMP() ,CURRENT_TIMESTAMP() ,? ,?
                     FROM foldertable
                     WHERE  NOT  EXISTS (SELECT * FROM foldertable WHERE folderPath = ? AND serverToken = (SELECT serverToken FROM `servertoken` WHERE `userToken` = ? LIMIT 1))
                     AND NOT  EXISTS (SELECT * FROM binfolder WHERE folderPath = ? AND serverToken = (SELECT serverToken FROM `servertoken` WHERE `userToken` = ? LIMIT 1))
                     AND  EXISTS (SELECT * FROM foldertable WHERE folderPath = ? AND serverToken = (SELECT serverToken FROM `servertoken` WHERE `userToken` = ? LIMIT 1))
                    ";
                    mysqli_stmt_prepare($stmt, $sql);
                    if (mysqli_stmt_prepare($stmt, $sql)) {
                        // echo ("success");
                        $folderPath = $_POST["folderPath"] . "/" . strval($folderId);
                        $folderPath = substr(strstr($folderPath, '/'), 1);
                        $folderPath = "root/" . $folderPath;
                        $userFolderPathName = $_POST["userFolderPathName"] . "/" . $_POST["folderName"];
                        $userFolderPathName = substr(strstr($userFolderPathName, '/'), 1);
                        $userFolderPathName = "root/" . $userFolderPathName;
                        // mysqli_stmt_bind_param($stmt, "ssisss", $_POST["userToken"], $_POST["folderName"], $folderId, $folderPath, $folderPath, $userFolderPathName);
                        $token12345 = $_POST["userToken"];
                        // $token12345 = "12345";
                        $path = "root/4056194994";
                        $TTS = "36daaae649c8b5bcfffe14e7cf5702cb";
                        mysqli_stmt_bind_param($stmt, "ssisssssssss", $_POST["userToken"], $_POST["folderName"], $folderId, $folderPath, $folderPath, $userFolderPathName,  $folderPath, $_POST["userToken"], $folderPath, $_POST["userToken"], $_POST["folderPath"], $_POST["userToken"]);
                        if (mysqli_stmt_execute($stmt) && mysqli_stmt_affected_rows($stmt) > 0) {
                            echo ("inserted");
                            $salt = "sbrakeshrath1234";
                            $folderName = $FileServerToken . $salt;
                            $folderName = sha1($folderName);
                            // echo ("\n");
                            echo ($folderPath);
                            echo ("\n" . $_POST["folderPath"] . "\n");
                            // echo("\n");
                            // echo ("\nnew Path :- ");
                            $rootFolderPath = "../../1213456ALLUSERS/" . $folderName;
                            // echo($rootFolderPath);
                            // echo ("\n" . $rootFolderPath . "/" . $folderPath);
                            if (mkdir($rootFolderPath . "/" . $folderPath)) {
                                $success = true;
                                $cause = "Success";
                                mysqli_commit($conn);
                            };
                        }
                        // print_r($stmt);
                    } else {
                        // echo "failed ";
                    }
                    mysqli_close($conn);
                    //end of insert data
                } else {
                    // echo "user Not Found";
                }
                // }

            }
        }
        // else if()
    }
}
$showArray = ["success" => $success, "cause" => $cause];
echo json_encode($showArray);
