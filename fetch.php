<?php

//set timezone to UTC
date_default_timezone_set('UTC');

//start session
session_start();

//check if session data !exist or is outdated
if (!isset($_SESSION['rcDataExpiration']) || time() > $_SESSION['rcDataExpiration']) {
    try {
        $src = @file_get_contents("https://www.rentcafe.com/rentcafeapi.aspx?requestType=apartmentavailability&APIToken=NDY5OTI%3d-XDY6KCjhwhg%3d&propertyCode=p0155985&lipi=urn%3Ali%3Apage%3Ad_flagship3_messaging%3BjgVrDTCuT7Gm3y%2Bl5aixcw%3D%3D");
        $src ? $_SESSION['rcData'] = json_decode($src) : null; //do not update data if $src is false
        $src ? $_SESSION['rcDataCached'] = $src : null;
        $expiration = time() + 600;
        $src ? $_SESSION['rcDataExpiration'] = $expiration : null;
        echo $src;
    } catch (Exception $e) {
        die("Error fetching data: " . $e . ".");
    }
} else {
    echo $_SESSION['rcDataCached'];
}