//Inicializao Express
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
//Inicializar  conexion y Express
const app = express();
// configuraciones que necesita mi servidor como puerto
app.set('port',process.env.PORT || 4000);    //si existe un puerto en el sistema tomalo caso contrario utilizar el 4000
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get ('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
// Middlewares  son funciones que se ejecutan cada vez que un usuario envie peticion al servidor, morgan 
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//variables globales  (como almacenar el nombre de la app)

app.use((req,res,next)=> {   
    next();
});

//Rutas se define las url que hacer cuando el usuario visite las url
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));

//archivos Publico codigo que el navegador pueda 

app.use(express.static(path.join(__dirname, 'public')));

// iniciando el servidor
app.listen(app.get('port'),()=> {
    console.log('servidor en el puerto', app.get('port'))
})

