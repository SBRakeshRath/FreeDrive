<?php
require_once("./config.php");
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
// $start_time = microtime(true);

// IMPORTANT VARIABLES ------->>>>>


$superFolderPath = "../../1213456ALLUSERS";
$maxFolderId = 99999;
$minFolderId = 100;
$maxFolderCount = 50;

// SENDING VARIABLE 

$serverError = true;
$limitExceed = false ;
$success = false ;
$trashed = false ;
$rootError = false ; 
$tokenInValid = false;

// LOCAL VARIABLES 

$inputVerified = false;
$isRootRoot = true;

$response_root_random_gen = [];




// check super folder exist or not 

if (!file_exists($superFolderPath)) {
    mkdir($superFolderPath);
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (
        isset($_POST["makeNewFolder"]) &&
        isset($_POST["RootFolderPath"]) &&
        isset($_POST["folderid"]) &&
        isset($_POST["userFolderPathName"]) &&
        isset($_POST["userToken"])
    ) {
        // check Input formats 


        if (
            is_string($_POST["RootFolderPath"]) &&
            is_string($_POST["folderid"]) &&
            is_string($_POST["userFolderPathName"]) &&
            is_string($_POST["userToken"])
        ) {
            $inputVerified = true;
            if (
                $_POST["folderid"] !== "root"
            ) {
                $isRootRoot = false;
            }
        }
    }
}

// $folderId = 
function random_num_generator($conn, $maxFolderId, $minFolderId, $maxFolderCount)
{
    global $response_root_random_gen;
    global $limitExceed ;
    global $tokenInValid;
    //check if userToken is valid or not 
    $sql = "SELECT count(*) AS count FROM servertoken where userToken = ?";
    $stmt = mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $_POST["userToken"]);
    if (!mysqli_stmt_execute($stmt)) {
        echo ("first one failed");
        return;
    }
    $result = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_assoc($result);
    if($row["count"] !=  1){
        $tokenInValid = true ;
        return ;
    }

    // Get the server token 
    $sql = "SELECT serverToken FROM servertoken where userToken = ?";
    $stmt = mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $_POST["userToken"]);
    if (!mysqli_stmt_execute($stmt)) {
        echo ("first one failed");
        return;
    }
    $result = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_assoc($result);
    $saltFolderId = md5($row["serverToken"]);

    // check for limit ;

    $finalId = null;
    $response = [];

    $sql = "SELECT count(*) AS count FROM foldertable WHERE serverToken = (SELECT serverToken FROM servertoken WHERE userToken = ?)";
    $stmt = mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $_POST["userToken"]);
    if (!mysqli_stmt_execute($stmt)) {
        echo ("first one failed");
        return;
    }
    $result = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_assoc($result);
    if ($row["count"] > ($maxFolderCount - 1)) {
        $response["limit"] = true;
        $response["id"] = null;
        $response_root_random_gen = $response;
        $limitExceed = true ;
        return $response;
    }
    mysqli_stmt_close($stmt);

    // If not limit has exceeded
    $folderId = mt_rand($minFolderId, $maxFolderId);
    $folderId = $saltFolderId . $folderId ;
    $sql = "SELECT count(folderid) as count FROM foldertable where serverToken = (SELECT serverToken FROM servertoken WHERE userToken = ?) AND folderid = '$folderId'  limit 1 ";
    $stmt = mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $_POST["userToken"]);
    if (!mysqli_stmt_execute($stmt)) {
        echo (mysqli_stmt_error($stmt)) ;
        echo ("first one failed");
        return;
    }
    $result = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_assoc($result);
    if ($row["count"] !== 0) {
        random_num_generator($conn, $maxFolderId, $minFolderId, $maxFolderCount);
    } else {
        $finalId = $folderId;
        $response["limit"] = false;
        $response["id"] = $folderId;
        $response_root_random_gen = $response;
    }
}


function InsertRootFolder($conn, $maxFolderId, $minFolderId, $maxFolderCount, $allRejectedId = [], $count = 0)
{
    //Importing Global Variables 

    // Select an Id For Each Folder -----
    $folderId = null;
    //Generating An Random Id Which is not present in folderTable 

    global $response_root_random_gen;
    random_num_generator($conn, $maxFolderId, $minFolderId, $maxFolderCount);
    // print_r($response_root_random_gen);
    if ($response_root_random_gen["limit"]) {
        return;
    }
    $folderId = $response_root_random_gen["id"];
    // Checking For Rejected Id
    if (in_array($folderId, $allRejectedId)) {
        InsertRootFolder($conn, $maxFolderId, $minFolderId, $maxFolderCount, $allRejectedId, ++$count);
        return;
    }
    //Inserting Into MYSQL foldertable
    // $folderId = "1234" ;
    $root = "root";
    $sql = " INSERT INTO foldertable (folderid, `serverToken` , `folderName` , `RootFolderPath` , `LastEdited` , `createdTime` , `userFolderPathName`) SELECT
             
                ? ,
                (SELECT serverToken FROM `servertoken` WHERE `userToken` = ? LIMIT 1),
                ?,
                ?,
                CURRENT_TIMESTAMP(),
                CURRENT_TIMESTAMP(),
                ?
            WHERE EXISTS  (SELECT serverToken FROM `servertoken` WHERE `userToken` = ? LIMIT 1)
            AND   NOT EXISTS  (SELECT folderid from foldertable where serverToken = (SELECT serverToken FROM servertoken WHERE userToken = ?) AND folderid = ? limit 1)
            AND   (SELECT count(*) AS count FROM foldertable WHERE serverToken = (SELECT serverToken FROM servertoken WHERE userToken = ?)) < ?
            ";
    $stmt = mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "sssssssssi", $folderId, $_POST["userToken"], $_POST["folderName"], $_POST["RootFolderPath"], $root, $_POST["userToken"], $_POST["userToken"], $folderid , $_POST["userToken"] , $maxFolderCount);
    if (!mysqli_stmt_execute($stmt)) {
        echo "fai;ed stmt query ";
        return;
    }

    // Inserting The value to Rejected Id
    $allRejectedId[] = $folderId;
    // checking For Insertion 
    // echo "Count of inserted Row " .  mysqli_affected_rows($conn);
    if (mysqli_affected_rows($conn) < 1) {
        // check if folderid already exist or not 
        $sql = "SELECT count(folderid) as count FROM foldertable where serverToken = (SELECT serverToken FROM servertoken WHERE userToken = ?) AND folderid = $folderId  limit 1 ";
        $stmt = mysqli_stmt_init($conn);
        mysqli_stmt_prepare($stmt, $sql);
        mysqli_stmt_bind_param($stmt, "s", $_POST["userToken"]);
        if (!mysqli_stmt_execute($stmt)) {
            echo ("first one failed");
            return;
        }
        $result = mysqli_stmt_get_result($stmt);
        $row = mysqli_fetch_assoc($result);
        if ($row["count"] !== 0) {
            InsertRootFolder($conn, $maxFolderId, $minFolderId, $maxFolderCount, $allRejectedId, ++$count);
            return;
        }
    }else{
        global $success;
        $success =  true ;
    }
}

function InsertSubFolder($conn, $maxFolderId, $minFolderId, $maxFolderCount, $allRejectedId = [], $count = 0)
{
    //Importing Global Variables 
    global $serverError ;
    global $rootError ;
    global $trashed ;
    // check If root folder id exist or not 
    
    $sql =  "SELECT  count(folderid) as count from foldertable where serverToken = (SELECT serverToken FROM servertoken WHERE userToken = ? limit 1) AND folderid = ? limit 1";
    $stmt  =  mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmt , $sql) ;
    mysqli_stmt_bind_param($stmt ,  "ss" , $_POST["userToken"] , $_POST["folderid"]) ;
    if (!mysqli_stmt_execute($stmt)){
        $serverError = true ;
        return ;
    }
    $result = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_assoc($result) ;
    if($row["count"] !== 1){
        $rootError = true ;
        return;
    }

    // check if root folder is trashed or not 
    $sql = "SELECT  count(folderid) as  count from foldertable where serverToken = (SELECT serverToken FROM servertoken WHERE userToken = ? limit 1) AND folderid = ? and trashed = 0 limit 1" ;
    $stmt  =  mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmt , $sql) ;
    mysqli_stmt_bind_param($stmt ,  "ss" , $_POST["userToken"] , $_POST["folderid"]) ;
    if (!mysqli_stmt_execute($stmt)){
        $serverError = true ;
        return ;
    }
    $result = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_assoc($result) ;
    if($row["count"] !== 1){
        $trashed = true ;
        return;
    }

    // Select an Id For Each Folder -----
    $folderId = null;
    //Generating An Random Id Which is not present in folderTable 

    global $response_root_random_gen;
    random_num_generator($conn, $maxFolderId, $minFolderId, $maxFolderCount);
    if ($response_root_random_gen["limit"]) {
        return;
    }
    $folderId = $response_root_random_gen["id"];
    // Checking For Rejected Id
    if (in_array($folderId, $allRejectedId)) {
        InsertSubFolder($conn, $maxFolderId, $minFolderId, $maxFolderCount, $allRejectedId, ++$count);
        return;
    }
    //Inserting Into MYSQL foldertable
    $root = $_POST["RootFolderPath"] . "/" . $_POST["folderid"];
    $sql = " INSERT INTO foldertable (folderid, `serverToken` , `folderName` , `RootFolderPath` , `LastEdited` , `createdTime` , `userFolderPathName`) SELECT
             
                ? ,
                (SELECT serverToken FROM `servertoken` WHERE `userToken` = ? LIMIT 1),
                ?,
                ?,
                CURRENT_TIMESTAMP(),
                CURRENT_TIMESTAMP(),
                ?
            WHERE EXISTS  (SELECT serverToken FROM `servertoken` WHERE `userToken` = ? LIMIT 1)
            and exists (select folderid from foldertable where serverToken = (SELECT serverToken FROM servertoken WHERE userToken = ? limit 1) AND folderid = ? and trashed = 0 limit 1)
            AND   NOT EXISTS  (SELECT folderid from foldertable where serverToken = (SELECT serverToken FROM servertoken WHERE userToken = ?) AND folderid = ? limit 1)
            AND   (SELECT count(*) AS count FROM foldertable WHERE serverToken = (SELECT serverToken FROM servertoken WHERE userToken = ?)) < ?
            ";
    $stmt = mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmt, $sql);
    $rootFolderPath = $_POST["RootFolderPath"] . "/" . $_POST["folderid"];
    mysqli_stmt_bind_param($stmt, "sssssssssssi", $folderId, $_POST["userToken"], $_POST["folderName"], $rootFolderPath, $root, $_POST["userToken"], $_POST["userToken"], $_POST["folderid"], $_POST["userToken"], $folderid,  $_POST["userToken"], $maxFolderCount);
    if (!mysqli_stmt_execute($stmt)) {
        echo "fai;ed some tree query ";
        return;
    }

    // Inserting The value to Rejected Id
    $allRejectedId[] = $folderId;
    // checking For Insertion 
    // echo "Count of inserted Row " .  mysqli_affected_rows($conn);
    if (mysqli_affected_rows($conn) < 1) {
        // check if folderid already exist or not 
        $sql = "SELECT count(folderid) as count FROM foldertable where serverToken = (SELECT serverToken FROM servertoken WHERE userToken = ?) AND folderid = $folderId  limit 1 ";
        $stmt = mysqli_stmt_init($conn);
        mysqli_stmt_prepare($stmt, $sql);
        mysqli_stmt_bind_param($stmt, "s", $_POST["userToken"]);
        if (!mysqli_stmt_execute($stmt)) {
            echo ("first one failed");
            return;
        }

        $result = mysqli_stmt_get_result($stmt);
        $row = mysqli_fetch_assoc($result);
        // cross check 
        if ($row["count"] !== 0) {
            InsertSubFolder($conn, $maxFolderId, $minFolderId, $maxFolderCount, $allRejectedId, ++$count);
        }
    }else{
        global $success ;
        $success = true ;
    }
}

if ($conn) {
    $serverError = false;

    // root folder ----->>>>>>>
    if ($inputVerified && $isRootRoot) {
        InsertRootFolder($conn, $maxFolderId, $minFolderId, $maxFolderCount);
    } else if ($inputVerified && !$isRootRoot) {
        InsertSubFolder($conn, $maxFolderId, $minFolderId, $maxFolderCount);
    }
}


$showArray = ["success" => $success, "maxFolderExceed" => $limitExceed , "serverError" => $serverError , "trashed" => $trashed , "rootError" => $rootError ];
echo json_encode($showArray);
// $serverError = true;
// $limitExceed = true ;
// $success = false ;