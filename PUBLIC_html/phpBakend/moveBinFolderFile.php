<?php
require_once("./config.php");
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

function isJson($string)
{
    $data =  json_decode($string);
    return (json_last_error() == JSON_ERROR_NONE);
}
$success = false;
$insert = false;
$delete = false;
$idNotValid = false;
$serverError = false;

//Local variables
$inputVerified = false;



$rootFolderPath = "../../1213456ALLUSERS";
$deletedFolder = [];
if (!file_exists($rootFolderPath)) {
    mkdir($rootFolderPath);
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isJson(file_get_contents('php://input', true))) {
        $data = json_decode(file_get_contents('php://input', true), true);
    }

    if (isset($data["binFolderArray"]) && isset($data["userToken"])) {

        if (is_array($data["binFolderArray"]) && is_string($data["userToken"])) {
            $folderArray = $data["binFolderArray"]["folder"];
            if (count($folderArray) > 0) {
                $inputVerified = true;
            }
        }
    }
}

function trash_folder($id)
{
    //import global variables
    global $conn;
    global $idNotValid;
    global $data;
    global $success;
    global $serverError;

    // check if id is valid or not 
    $sql =  "SELECT count(folderid) AS count from foldertable where serverToken =  (SELECT serverToken from servertoken where userToken = ?) and folderid = ? limit 1";
    $stmt =  mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "si", $data["userToken"], $id);
    if (!mysqli_stmt_execute($stmt)) {
        $serverError = true;
        echo "server Error";
        return;
    }
    $result = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_assoc($result);

    if ($row["count"] === 0) {
        $idNotValid = true;
        return;
    }

    // update the folders to trashed
    mysqli_begin_transaction($conn);
    $sql = "UPDATE LOW_PRIORITY foldertable SET trashed = 1 WHERE serverToken = (SELECT serverToken from servertoken where userToken = ? limit 1) and 
    
    (folderId = ?
    or 
    RootFolderPath LIKE 
                CONCAT (
                    (SELECT RootFolderPath FROM foldertable WHERE serverToken = (SELECT serverToken from servertoken where userToken = ? ) AND folderid = ? limit 1)
                    ,'/'
                    , ?
                    ,'%'

                )
    )";
    $stmt =  mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "sisii", $data["userToken"], $id, $data["userToken"], $id, $id);
    if (!mysqli_stmt_execute($stmt)) {
        echo mysqli_stmt_error($stmt);
        $serverError = true;
        return;
    }
    // echo "\n\n affected rows " . mysqli_affected_rows($conn);
    if (mysqli_affected_rows($conn) > 0) {
        sleep(15);
        // Insert into bin folder
        $sql = "INSERT INTO binfolder (serverToken , folderId) value ( (SELECT serverToken from servertoken where userToken = ? limit 1) , ?)";
        $stmt =  mysqli_stmt_init($conn);
        mysqli_stmt_prepare($stmt, $sql);
        mysqli_stmt_bind_param($stmt, "si", $data["userToken"], $id);
        if (!mysqli_stmt_execute($stmt)) {
            echo mysqli_stmt_error($stmt);
            $serverError = true;
            return;
        }
        if (mysqli_affected_rows($conn) > 0) {
            $success = true;
            mysqli_commit($conn);
        }
        else {
            mysqli_rollback($conn);
        }

    }
}






if ($inputVerified) {
    if (!$conn) {
        $serverError = true;
        return;
    }
    for ($i = 0; $i < count($data["binFolderArray"]["folder"]); $i++) {
        trash_folder($data["binFolderArray"]["folder"][$i]);
    }
}


$showArray = array("idNotValid" => $idNotValid, "success" => $success, "serverError" => $serverError);

echo json_encode($showArray);
