<?php

require '../sql/conexion.php';

try{
    $response = array();

    $sql = "SELECT 
        id, 
        `name`, 
        synopsis, 
        CAST(category AS UNSIGNED) category, 
        CAST(plataform AS UNSIGNED) plataform, 
        CAST(publisher AS UNSIGNED) publisher, 
        CAST(developers AS UNSIGNED) developers, 
        release_date 
        FROM videogames
        WHERE id = '$_POST[id]'";
    $resultado = mysqli_query($con, $sql);

    if($resultado){
        if(mysqli_num_rows($resultado)>0){
            $items = array();
            while($fila = mysqli_fetch_assoc($resultado)){
                array_push($items, $fila);
            }

            $response = array(
                'success' => true,
                'resultado' => $items,
                'total' => COUNT($items)
            );
        }else{
            $response = array(
                'success'=>false,
                'error'=>'No se encontró el videojuego seleccionado'
            );
        }
    }else{
        $response = array(
            'success'=>false,
            'error'=>mysqli_error($con)
        );
    }

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