<?php 
require '../sql/conexion.php';
try{
    if(isset($_POST['id']) && $_POST['id']==""){
        $sql = "INSERT INTO videogames(`name`, synopsis, category, plataform, publisher, developers, release_date)
        VALUES('$_POST[name]','$_POST[synopsis]','$_POST[category]', '$_POST[plataform]', '$_POST[publisher]','$_POST[developers]', '$_POST[release_date]')";
        $guardar_vehiculo = mysqli_query($con, $sql);

        if(mysqli_insert_id($con)>0){
            $response = array(
                'success'=>true,
                'msg'=>'El videojuego fue registrado exitosamente'
            );
        }else{
            $response = array(
                'success'=>false,
                'error'=>'No fue posible registrar el videojuego'
            );
        }
    }else{
        $sql = "UPDATE videogames
            SET `name`='$_POST[name]',
            synopsis='$_POST[synopsis]',
            category='$_POST[category]',
            plataform='$_POST[plataform]',
            publisher='$_POST[publisher]',
            developers='$_POST[developers]',
            release_date='$_POST[release_date]'
            WHERE id='$_POST[id]'";
        $actualizacion = mysqli_query($con, $sql);

        if(mysqli_affected_rows($con)>0){
            $response = array(
                'success'=>true,
                'msg'=>'Videojuego actualizado correctamente'
            );
        }else{
            $response = array(
                'success'=>false,
                'error'=>'No fue posible actualizar'
            );
        }
    }
}catch(Exception $e){
    $response = array(
        'success'=>false,
        'error'=>'Error en la consulta: ' . $e->getMessage()
    );
}

echo json_encode($response);

$con->close();
unset($response, $_POST, $dato, $sql);


?>