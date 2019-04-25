<?php
header("Content-type: text/csv");
header("Content-Disposition: attachment; filename=file.csv");
header("Pragma: no-cache");
header("Expires: 0");
$allItems=json_decode("{}");
$data=json_decode("{}");
foreach (glob("../data/*") as $filename) {

$currentFile = json_decode(file_get_contents($filename));
$data->{$currentFile->netid}= $currentFile->studentData;
foreach ($currentFile->studentData as $key => $value)
{$allItems->{$key}=true;

// $data->$name->

}

}
print_r("netid,".implode(array_keys ((array) $allItems),",")."\n");

foreach ($data as $name=>$stepData) {
  print_r($name.",");
  foreach ($allItems as $key=>$value) {

    if(property_exists($stepData, $key)){print_r($stepData->{$key}.",");}
else{print",";}
  }
  print"\n";
}



?>
