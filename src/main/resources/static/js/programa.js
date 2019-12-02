
let persona={id:0};

function setIdPersona(id) {
  persona.id=id;
}

	$(document).ready(inicio);
	 $(".boton2").hide();
 //Implementacion de las funciones
	function inicio(){
  //implementacion para agrgar registro
		$("#nuevo").click(agregar);
   //implementacion para cargar los registros en la tabla
   cargarDatos();
   //implementacion para eliminar registro
   $("#eliminar").click(function () {
     eliminar(persona.id);
   });
	//implementacion para renovar
	$("#renovar").click(modificar);
	}

 //funcion para limpiar los input
function reset() {
  $("#id").val(null);
  $("#nombre").val(null);
  $("#apellido").val(null);
  $("#edad").val(null);
  $(".boton").hide($(".boton2").show());
 
}

 //agregar nuevo registro
function agregar() {
  $.ajax({
    url:"/persona/guardarMod",
    method:"Post",
    data:{
      id:null,//Null debido al ser Auto-Incrementable
      nombre:$("#nombre").val(),
      apellido:$("#apellido").val(),
      edad:$("#edad").val()
    },
    success(response){
      reset();
      cargarDatos();
    },
    error(response){
      console.log("Algo ah salido mal :(")
    }
  });
}

//cargar los datos a la tabla
function cargarDatos() {
  $.ajax({
    url:"/persona/valores",
    method: "Get",
    success: function(response){
      $("#tabla").html("");
      //se habilita un foreach para recorrer los registros
      for (let i=0; i< response.length; i++){
        $("#tabla").append(""
            +"<tr>"
              +"<td>"+response[i].id+"</td>"
              +"<td>"+response[i].nombre+"</td>"
              +"<td>"+response[i].apellido+"</td>"
              +"<td>"+response[i].edad+"</td>"
              +"<td>"
              +"<button onclick='cargarRegistro("+response[i].id+");' type='button' class='btn btn-success mr-2'>Modificar</button>"
              +"<button onclick='setIdPersona("+response[i].id+");'type='button' class='btn btn-danger' data-toggle='modal' data-target='#ElimiPersona'>Eliminar</button>"
              +"</td>"
            +"</tr>"
        );
      }
    }, 
    error(response){
      console.log("Algo ah salido mal :(")
    }
  });
}

//funcion para modificar
function eliminar(id) {
  $.ajax({
    url:"/persona/eliminar/"+id,
    method:"Get",

    success: function (response) {
      cargarDatos();
    },
    error(response){
      console.log("Algo ah salido mal :(")
    }
  });
}

//function para cargar los datos 
function cargarRegistro(id) {
  $.ajax({
    url:"/persona/modificar/"+id,
    method:"Get",

    success: function (response) {
      $("#id").val(response.id);
      $("#nombre").val(response.nombre);
      $("#apellido").val(response.apellido);
      $("#edad").val(response.edad);
      $(".boton").html($(".boton2").show());
    },
    error(response){
      console.log("Algo ah salido mal :(")
    }
  });
}
//funcion para renovar los datos
function modificar(){
	$.ajax({
		url:"/persona/guardarMod",
        method:"Post",
		data:{
			id:$("#id").val(),
			nombre:$("#nombre").val(),
			apellido:$("#apellido").val(),
			edad:$("#edad").val()
		},
	success: function (response){
		alert("Se ha renovado exitosamente");
		cargarDatos();
		reset();
    },
    error: function (response){
      console.log("Algo ah salido mal :("+response)
    }
	});
}