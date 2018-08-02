var Usuario = require('./modelUsuarios.js') // Asignarle a la variable USUARIO el modelo del usuario

module.exports.crearUsuarioDemo = function(callback){ //Función para crear usuarios
  var arr = [{ email: 'gerardo@mail.com', user: "gerave", password: "123456"}, { email: 'pepe@mail.com', user: "pepe", password: "123456"}]; //array con la información de los usuarios a insertar
  Usuario.insertMany(arr, function(error, docs) {
    if (error) {
      if (error.code == 11000){ //Verificar si el nombre de usuario (PrimaryKey) del existe
        callback("Utilizar los siguientes usuarios: </br>usuario:gerave password:123456 </br>usuario:pepe password:123456")
      } else {
        callback(error.message) // Error msg
      }
    } else {
      callback(null, "El usuario 'gerave' y 'pepe' se han registrado correctamente. </br>usuario:gerave password:123456 </br >usuario:pepe password:123456") // Success
    }
  });
}
