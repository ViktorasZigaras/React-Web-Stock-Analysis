<?php 

//echo 'aaaa';
//echo $_GET['url'];
//function getJson($url)
//{
    $ch = curl_init(); 
    curl_setopt($ch, CURLOPT_URL, $_GET['url']); //_POST
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    $output = curl_exec($ch); 
    curl_close($ch);

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    echo $output;
    //return $output;
//}

?>