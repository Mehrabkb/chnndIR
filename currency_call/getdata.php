<?php
    $time = json_decode(file_get_contents("lastUpdate.json"));
    $lastUpdate = $time->last_update;
    if(time() >= ($lastUpdate + 60)){
        // var_dump('le');
        include "getter.php";
    }

    echo file_get_contents("data.json");
