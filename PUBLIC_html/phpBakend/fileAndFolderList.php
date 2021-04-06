<?php
require_once("./config.php");
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");



//testing
$showArray = array();

$sqlFile = "SELECT * FROM `foldertable` WHERE `serverToken` = ?";
$FileStmt = mysqli_stmt_init($conn);
$folderTableFetched = false;
if (mysqli_stmt_prepare($FileStmt, $sqlFile)) {
    $serverToken = 2147483647;
    mysqli_stmt_bind_param($FileStmt, 'i', $serverToken);
    mysqli_stmt_execute($FileStmt);
    $filePreStmtR = mysqli_stmt_get_result($FileStmt);
    $superFolderArray = array();
    while ($row = mysqli_fetch_assoc($filePreStmtR)) {

        $FolderTableFetched = true;
        $pathSequenceArray = array();
        $CFP = $row["folderPath"];

        $CFP = explode("/", $CFP);
        $row["folderPathSequence"] = $CFP;
        array_push($superFolderArray, $row);
    }

    // extra
    $rootArray = [
        "folderName"=>"root", "folderid"=>"root","folderPath"=>"root","previewPath"=>"root","userFolderPathName"=>"root","folderPathSequence"=>["root"]
    ];
    $superFolderArray[] = $rootArray;
    //Shorting
    $skeleton =array();
    if (count($superFolderArray) > 0) {
        for ($i = 0; $i < count($superFolderArray); $i++) {
            $var = $superFolderArray[$i]["folderPathSequence"];
            // print_r($var);
            $var = array_reverse($var);
            $imp = array($superFolderArray[$i]);
            foreach($var as $row){
                $imp = array("fo$row" => $imp);
            }
            $skeleton = array_merge_recursive($skeleton,$imp);

        }
 
  
    }

 $showArray["folder"] = $skeleton;




}

echo json_encode($showArray);






//  stacks











//



$array = array();
$array["file"] = array();
$array["folder"] = array();
$array["file"] =
    array(
        array("name" => "one", "id" => 1, "folderId" => 0),
        array("name" => "two", "id" => 2, "folderId" => 0),
        array("name" => "one", "id" => 3, "folderId" => 1),
        array("name" => "two", "id" => 4, "folderId" => 1),
        array("name" => "one", "id" => 5, "folderId" => 2),
        array("name" => "two", "id" => 6, "folderId" => 2),

    );
$array["folder"] = array(
    array(
        "name" => "one", "id" => 1, "folderId" => 0, "otherFolders" => array(
            array("name" => "one", "id" => 1, "folderId" => 1),
            array("name" => "two", "id" => 2, "folderId" => 1)
        )
    ),
    array("name" => "two", "id" => 2, "folderId" => 0),
);
// array_push($array["file"],$files);
$array["file"] = $array["file"];
// array_push($array["folder"],$folders);
$array["folder"] = $array["folder"];
// sleep(5);
// echo json_encode($array);



