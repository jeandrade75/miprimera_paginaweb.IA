// Importar la libreria :::::::::::::::::::::::::
const express = require ("express");
const session = require("express-session");

const mysql = require("mysql2");

// Crear el objeto principal de la aplicación :::::::::::::::::::
const app = express();

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "talento"
    });

// Configuración del middleware ::::::::::::::::::::::::::::::::
app.use(express.static("public")); // Archivos estáticosxa
app.use(express.json()); // Para procesar JSON en el cuerpo de las solicitudes (requerido para req.body)
app.use(express.urlencoded({ extended: false })); // Para procesar datos de formularios

// Manejo de sesiones ::::::::::::::::::::::::::::::
app.use(session({
    secret: "clave secreta",
    resave: false
    , saveUninitialized: false
   //, cookie: { secure: false

}));

// Configuración del motor de vistas ::::::::::::::::::::::::::
app.set("view engine", "ejs");
app.set("views", "./views/templates");

// Rutas a cada pagina ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

app.get("/",(req, res) => {
    res.render("index");

});

app.get("/registro", (req, res) => {
    res.render("registro");
});
/* app.get("/",function(req,res){
    res.send("Hola mundo");
});  */ 

// Ruta para manejar datos del formulario
app.post("/registro", (req, res) => {
    const datos = req.body;
    //console.log(datos);
    //res.send("Datos recibidos y validados");

    let Documento= datos.Documento;
    let nombre= datos.nombre;
    let email= datos.email;
    let telefono = datos.telefono;
    let password= datos.password;

    let buscar = "SELECT * FROM usuarios WHERE Documento = "+Documento +" ";
    
    conexion.query(buscar, function(err, row) {
        if (err) {
            console.log(err);
            
            }else{
                if(row.length > 0){
                    //res.send("No se puede registrar El usuario ya existe"); Asi lo colocamos si quiero que se vea por consola
                    mensaje="No se puede registrar El usuario ya existe";
                    res.render("registro",{mensaje});
                }else{
                    
                    //let registrar = "INSERT INTO usuarios (Documento,nombre,email,telefono,password) VALUES ('"+Documento +"','"+nombre +"','"+email +"''"+telefono +"','"+password +"')";
                    let registrar = `INSERT INTO usuarios (Documento, nombre, email, telefono, password) VALUES ('${Documento}', '${nombre}', '${email}', '${telefono}', '${password}')`;

                    conexion.query(
                        registrar, function(err) {
                    if (err) throw err;

                    mensaje = "Usuario registrado con éxito";
                    res.render("registro",{mensaje});
                });    
                    
            }
        }
    });
});
                    
// Configuración del servidor ::::::::::::::::::::::::::::::::::
const PORT = 3000;
app.listen(3000, () => {
    console.log(`Servidor iniciado en el puerto ${3000}: http://localhost:${3000}/`);
    });




