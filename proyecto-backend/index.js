var express = require('express');
var app = express();
const {mongoose} = require('./database')
const cors = require('cors');
//middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//Cargamos el modulo de direccionamiento de rutas para puntos
app.use('/api/alumno', require('./routes/alumno.route.js'));
app.use('/api/persona', require('./routes/persona.route.js'));
app.use('/api/rol', require('./routes/rol.route.js'));
app.use('/api/plan', require('./routes/plan.route.js'));
app.use('/api/rutina', require('./routes/rutina.route'));
app.use('/api/ejercicio', require('./routes/ejercicio.route.js'));
app.use('/api/usuario', require('./routes/usuario.route.js'));
app.use('/api/asistencia', require('./routes/asistencia.route.js'));
app.use('/api/pago', require('./routes/pago.route.js'));
//setting
app.set('port', process.env.PORT || 3000);


//starting the server
app.listen(app.get('port'), () => {
 console.log(`Server started on port`, app.get('port'));
});