<?php

//BAwrKVGqd5FEL2cr17DENcZqeg2skJHA

$data = file_get_contents("https://BrsApi.ir/Api/Market/Gold_Currency.php?key=BAwrKVGqd5FEL2cr17DENcZqeg2skJHA");


$myfile = fopen("data.json", "w");
fwrite($myfile, $data);
fclose($myfile);
$timeFile = file_get_contents("lastUpdate.json");
$timeFile = fopen("lastUpdate.json", "w");
$time = [
    "last_update" => time()
];
fwrite($timeFile, json_encode($time));
fclose($timeFile);

?>