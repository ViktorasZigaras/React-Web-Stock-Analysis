<?php 

//function getJson($url)
//{
    $ch = curl_init(); 
    curl_setopt($ch, CURLOPT_URL, $_POST['url']); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    $output = curl_exec($ch); 
    curl_close($ch);

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    echo $output;
    //return $output;
//}

?>