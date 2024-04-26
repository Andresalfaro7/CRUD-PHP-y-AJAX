<?php 
require '../sql/conexion.php';
try{
    $sql = "DELETE FROM videogames WHERE id='$_POST[id]'";
    mysqli_query($con, $sql);

    if(mysqli_affected_rows($con)>0){
        $response = array(
            'success'=>true,
            'msg'=>'Videojuego borrado correctamente'
        );
    }else{
        $response = array(
            'success'=>false,
            'error'=>'No fue posible borrarlo'
        );
    }
}catch(Exception $e){
    $response = array(
        'success'=>false,
        'error'=>'Error en la consulta: ' . $e->getMessage()
    );
}

echo json_encode($response);

$con->close();
unset($response, $_POST, $sql);

?>