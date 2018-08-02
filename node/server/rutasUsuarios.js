const Router = require('express').Router();
const Usuarios = require('./modelUsuarios.js')
const Eventos = require('./modelEventos.js')
const Operaciones = require('./crud.js')


// Validate login
Router.post('/login', function(req, res) {
    let user = req.body.user
    let password = req.body.pass
    let sess = req.session;
    Usuarios.find({user: user}).count({}, function(err, count) { // Verify user
        if (err) {
            res.status(500)
            res.json(err)
        } else {
          if(count == 1){
            Usuarios.find({user: user, password: password }).count({}, function(err, count) { // verify password
                if (err) {
                    res.status(500)
                    res.json(err)
                } else {
                  if(count == 1) { // Validate on success
                    sess.user = req.body.user; // Store username on session variable
                    res.send("Validado")
                  } else { // Error
                    res.send("Contraseña incorrecta") // Invalid pwd
                  }
                }
            })
          } else {
            res.send("Usuario no registrado") // Invalid user
          }
        }

    })
})

// Validate logout
Router.post('/logout', function(req, res) {
  req.session.destroy(function(err) {
  if(err) {
    console.log(err);
    res.json(err)
  } else {
    req.session = null
    res.send('logout') // Return logout
    res.end()
  }
  });
});

Router.all('*', function(req, res) {
  res.send('Error al mostrar el recurso solicitado. Por favor verifique la dirección url a la cual desea ingresar' )
  res.end()
})

module.exports = Router
