<?php
//ازه دسترسی از همه دامنه‌ها
header("Access-Control-Allow-Origin: *");

// اگر نیاز به متدهای خاص دارید
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// اگر نیاز به هدرهای خاص دارید
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// ادامه کد شما...

    $time = json_decode(file_get_contents("lastUpdate.json"));
    $lastUpdate = $time->last_update;
    if(time() >= ($lastUpdate + 60)){
        // var_dump('le');
        include "getter.php";
    }

    echo file_get_contents("data.json");
