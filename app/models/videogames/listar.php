<?php

require '../sql/conexion.php';

try{

    $params = $_POST;
    $response = array();

    $sql = "SELECT * FROM videogames";
    $resultado = mysqli_query($con, $sql);

    if($resultado){
        // var_dump($resultado);
        if(mysqli_num_rows($resultado)>0){
            $items = array();
            while($fila = mysqli_fetch_assoc($resultado)){
                array_push($items, $fila);
            }

            // var_dump($items);

            $response = array(
                'success' => true,
                'resultado' => $items,
                'total' => COUNT($items)
            );
        }else{
            $response = array(
                'success'=>false,
                'error'=>'No se encontraron resultados'
            );
        }
    }else{
        $response = array(
            'success'=>false,
            'error'=>mysqli_error($con)
        );
    }
    // var_dump($response);
    echo json_encode($response);
}catch(Exception $e){
    $response = array(
        'success'=>false,
        'error'=>'Error en la consulta: ' . $e->getMessage()
    );
    echo json_encode($response);
}

$con->close();
unset($response);

?>