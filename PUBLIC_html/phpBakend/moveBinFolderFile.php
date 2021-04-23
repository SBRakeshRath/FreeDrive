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
$success = true;
$insert = false;
$delete = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isJson(file_get_contents('php://input', true))) {
        $data = json_decode(file_get_contents('php://input', true), true);
    }
    echo ("request received");

    if (isset($data["binFolderArray"]) && isset($data["userToken"])) {

        if (is_array($data["binFolderArray"]) && is_string($data["userToken"])) {
            $folderArray = $data["binFolderArray"]["folder"];
            if (count($folderArray) > 0) {
                echo ("fetched");
                print_r($folderArray);
                for ($i = 0; $i < count($folderArray); $i++) {
                    if ($conn) {
                        $token = $data["userToken"];
                        $path = $folderArray[$i];
                        echo ($token);
                        echo ($path);
                        //
                        // mysqli_autocommit($conn, FALSE);
                        // mysql_query("START TRANSACTION");

                        mysqli_begin_transaction($conn);
                        $stmt = mysqli_stmt_init($conn);

                        // DELETE
                        //  FROM foldertable 
                        //   WHERE serverToken = (SELECT serverToken FROM `servertoken` WHERE `userToken` = ? LIMIT 1)
                        //   AND foldertable.folderPath LIKE ?
                        $sql = " INSERT INTO binfolder
                        SELECT *
                         FROM foldertable 
                          WHERE serverToken = (SELECT serverToken FROM `servertoken` WHERE `userToken` = ? LIMIT 1)
                          AND foldertable.folderPath LIKE ?
                          
                        
                          ";
                        mysqli_stmt_prepare($stmt, $sql);
                        if (mysqli_stmt_prepare($stmt, $sql)) {
                            $pathSearch = addcslashes($path, '%_');
                            $pathSearch = $pathSearch . "%";
                            mysqli_stmt_bind_param($stmt, "ss", $token, $pathSearch);
                            if (mysqli_stmt_execute($stmt)) {
                                echo ("\ndone\n");
                                $insert = true;
                            }
                        } else {
                            echo (" not prepared");
                        }
                        mysqli_stmt_close($stmt);
                        sleep(10);
                        $stmt = mysqli_stmt_init($conn);

                        // DELETE
                        //  FROM foldertable 
                        //   WHERE serverToken = (SELECT serverToken FROM `servertoken` WHERE `userToken` = ? LIMIT 1)
                        //   AND foldertable.folderPath LIKE ?
                        $sql = "DELETE
                         FROM foldertable 
                          WHERE serverToken = (SELECT serverToken FROM `servertoken` WHERE `userToken` = ? LIMIT 1)
                          AND foldertable.folderPath LIKE ?
                          
                        
                          ";
                        mysqli_stmt_prepare($stmt, $sql);
                        if (mysqli_stmt_prepare($stmt, $sql)) {
                            $pathSearch = addcslashes($path, '%_');
                            $pathSearch = $pathSearch . "%";
                            mysqli_stmt_bind_param($stmt, "ss", $token, $pathSearch);
                            if (mysqli_stmt_execute($stmt)) {
                                echo ("\ndone 2\n");
                                $delete = true;
                            }
                        } else {
                            echo ("not prepared true");
                        }
                        mysqli_stmt_close($stmt);
                        // mysqli_commit($conn);
                        if ($insert && $delete) {
                            echo ("\ncompleted");
                            mysqli_commit($conn);
                        }else{
                            mysqli_rollback($conn);
                        }
                        $query = "SELECT *
                    FROM foldertable
                    WHERE EXISTS (SELECT * FROM foldertable WHERE `folderPath` =  $pathSearch)
                    
                   ";
                   $result = mysqli_query($conn, $query);

                //    if (mysqli_num_rows($result) > 0) {
                     // output data of each row
                     echo "datasssssss\n";
                     while($row = mysqli_fetch_assoc($result)) {
                      print_r($row);
                     }
                //    } else {
                //      echo "0 results";
                //    }
                   
                //    mysqli_close($conn);
                    }
                }
            }
        }
    }
}
