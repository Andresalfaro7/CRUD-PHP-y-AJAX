$(document).ready(function () {
    listar_videogames();

    $("#btn_guardar_vgame").click(function () { 
        guardar_vgame();
    });

    $('#mdl_registro_vgame').on('hidden.bs.modal', function (event) {
        $("#frm_registro_vgame").trigger('reset');
        $("#id").val("");
    });

    $("#tabla_vgames").on('click','.editar-vgame', function (){
        let id = $(this).attr('data-id');

        obtener_vgame(id);
    });

    $("#tabla_vgames").on('click','.eliminar-vgame', function (){
        let id = $(this).attr('data-id');

        delete_vgame(id);
    });

    $("#btn_nuevo_vgame").click(function () { 
        $("#mdl_title_registro").html('<i class="fas fa-plus"></i> Registrar nuevo videojuego');
        $("#btn_guardar_vgame").addClass('btn-success').removeClass('btn-warning').html('<i class="fas fa-save"></i> Guardar');
    });
});

function listar_videogames(){
    $.ajax({
        url: 'app/models/videogames/listar.php',
        type: 'POST',
        dataType: 'json',
        data: {}
    })
    .done(function (response){
        if(response.success){
            console.log(response.resultado);
            let cuerpo = '';
            for (let i = 0; i < response.total; i++) {
                cuerpo +=
                '<tr>'+
                    '<td>'+(i+1)+'</td>'+
                    '<td>'+response.resultado[i].name+'</td>'+
                    '<td>'+response.resultado[i].synopsis+'</td>'+
                    '<td>'+response.resultado[i].category+'</td>'+
                    '<td>'+response.resultado[i].plataform+'</td>'+
                    '<td>'+response.resultado[i].publisher+'</td>'+
                    '<td>'+response.resultado[i].developers+'</td>'+
                    '<td>'+response.resultado[i].release_date+'</td>'+
                    '<td>'+
                        '<div class="d-flex"><button type="button" title="Editar" class="btn btn-warning editar-vgame" data-id="'+response.resultado[i].id+'">'+
                        '<i class="fas fa-edit"></i>'+
                        '</button>'+
                        '<button type="button" title="Editar" class="btn btn-danger eliminar-vgame" data-id="'+response.resultado[i].id+'">'+
                        '<i class="fas fa-trash"></i>'+
                        '</button></div>'+
                    '</td>'+
                '</tr>';
            }

            $("#tb_vehiculos").html(cuerpo);
        }else{
            console.error(response.error);
            Swal.fire({
                title: "<strong>Atención</strong>",
                icon: "info",
                html: response.error,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            });
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR);
        console.log("Error al realizar la solicitud: "+ textStatus, errorThrown);
    })
}

function guardar_vgame(){
    let datos = {
        name: $("#name").val(),
        synopsis: $("#synopsis").val(),
        category: $("#category").val(),
        plataform: $("#plataform").val(),
        publisher: $("#publisher").val(),
        developers: $("#developers").val(),
        release_date: $("#release_date").val(),
        id: $("#id").val(),
    }
    console.log(datos);
    $.ajax({
        url: 'app/models/videogames/registrar.php',
        type: 'POST',
        dataType: 'json',
        data: datos
    })
    .done(function (response){
        if(response.success){
            listar_videogames();
            $("#mdl_registro_vgame").modal('hide');
            Swal.fire({
                title: "<strong>Éxito</strong>",
                icon: "success",
                html: response.msg,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            });
        }else{
            //console.error(response.error);
            Swal.fire({
                title: "<strong>Atención</strong>",
                icon: "info",
                html: response.error,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            });
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown){
        console.log("Error al realizar la solicitud: "+ textStatus, errorThrown);
    })
}

function obtener_vgame(id){
    $.ajax({
        url: 'app/models/videogames/obtener.php',
        type: 'POST',
        dataType: 'json',
        data: {
            id: id
        }
    })
    .done(function (response){
        if(response.success){
            $("#mdl_title_registro").html('<i class="fas fa-edit"></i> Actualizar videogame');
            $("#btn_guardar_vgame").removeClass('btn-success').addClass('btn-warning').html('<i class="fas fa-edit"></i> Actualizar');
            let valores = response.resultado[0];
            $("#id").val(valores.id);
            $("#name").val(valores.name);
            $("#synopsis").val(valores.synopsis);
            $("#category").val(valores.category);
            $("#plataform").val(valores.plataform);
            $("#publisher").val(valores.publisher);
            $("#developers").val(valores.developers);
            $("#release_date").val(valores.release_date);
            $("#mdl_registro_vgame").modal('show');
        }else{
            Swal.fire({
                title: "<strong>Atención</strong>",
                icon: "info",
                html: response.error,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            });
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown){
        console.log("Error al realizar la solicitud: "+ textStatus, errorThrown);
    })
}

function delete_vgame(id){
    Swal.fire({
        title: "¿Esta seguro de eliminar el registro?",
        text: "¡Los datos perderan sin opción de recuperar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Borrar!"
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'app/models/videogames/delete.php',
                type: 'POST',
                dataType: 'json',
                data: { id }
            })
            .done(function (response){
                if(response.success){
                    listar_videogames();
                    Swal.fire({
                        title: "<strong>Éxito</strong>",
                        icon: "success",
                        html: response.msg,
                        showCloseButton: true,
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar',
                    });
                }else{
                    Swal.fire({
                        title: "<strong>Atención</strong>",
                        icon: "info",
                        html: response.error,
                        showCloseButton: true,
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar',
                    });
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown){
                console.log("Error al realizar la solicitud: "+ textStatus, errorThrown);
            })
        }
      });
}