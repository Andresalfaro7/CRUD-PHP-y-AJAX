<?php

error_reporting(E_ERROR);

$servidor = '127.0.0.1';
$usuario = 'root';
$clave = '';
$bd = 'vgamedb';

$con = mysqli_connect($servidor, $usuario,$clave, $bd);

if($con){
    // var_dump($con);
    // $con->set_charset("utf-8");
    mysqli_set_charset($con,"utf8");
}else{
    $response = array(
        'success'=>false,
        'error'=>'No hay conexión a la base de datos'
    );

    echo json_encode($response);

    exit();
}

?>