<?
$a = new stdClass();
$a -> studentData = $_REQUEST['studentData'];
// $a -> stats = json_decode($_REQUEST['stats']);
$a -> netid =$_SERVER['cn'];
//file_put_contents("data/winners.csv",$info, FILE_APPEND | LOCK_EX);

$a = json_encode($a);
file_put_contents("data/".$_SERVER['cn'],$a) or die("Unable to write file!");;
print($a);
?>
