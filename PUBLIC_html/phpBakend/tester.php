<?php
require_once("./config.php");
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
// echo ("working");
// mysqli_begin_transaction($conn);
// $sql = "INSERT INTO foldertable (serverToken) SELECT (1234) WHERE NOT EXISTS (SELECT serverToken FROM binfolder WHERE serverToken = 123456)";
// mysqli_query($conn, $sql);
// echo("\n");
// echo (mysqli_affected_rows($conn));
// echo (mysqli_error($conn));
// // sleep(15);
// $sql = "INSERT INTO foldertable (serverToken) SELECT (12345) WHERE NOT EXISTS (SELECT serverToken FROM foldertable WHERE serverToken = 123456)";
// mysqli_query($conn, $sql);
// echo("\n");
// echo (mysqli_affected_rows($conn));
// echo (mysqli_error($conn));
// sleep(5);
// mysqli_commit($conn);
// echo (mysqli_error($conn));


// mysqli_close($conn);


// testing query

// INSERT INTO foldertable(serverToken) SELECT (123456) WHERE NOT EXISTS (SELECT serverToken FROM foldertable WHERE serverToken = 1234);

//UPDATE QUERY

mysqli_begin_transaction($conn);

$sql = "SELECT * FROM foldertable where folderid  = '1234567' FOR  UPDATE" ;
$sql = "SELECT * FROM foldertable where serverToken  = 1234567 FOR  UPDATE" ;
mysqli_query($conn , $sql) ;
echo (mysqli_error($conn)) ;
echo(mysqli_affected_rows($conn)) ;
sleep (10);
mysqli_commit($conn) ;



//Working Query 
// INSERT INTO `foldertable`(
//     `serverToken`,
//     `folderName`,
//     `folderid`,
//     `RootFolderPath`,
//     `createdTime`,
//     `LastEdited`,
//     `RootFolderPreviewPath`,
//     `userFolderPathName`,
//     `starred`,
//     `trashed`
// )
// VALUES(
//     12345656567,
//     '',
//     'ACGHHGFKB',
//     '',
//     '',
//     '',
//     '',
//     '',
//     '',
//     ''
// );

// mysqli_begin_transaction($conn);

// $sql = "SELECT * FROM foldertable where folderid  = '1234567' FOR  UPDATE" ;
// $sql = "SELECT * FROM foldertable where serverToken  = 1234567 FOR  UPDATE" ;
// mysqli_query($conn , $sql) ;
// echo (mysqli_error($conn)) ;
// echo(mysqli_affected_rows($conn)) ;
// sleep (10);
// mysqli_commit($conn) ;