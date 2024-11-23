// Importar la libreria :::::::::::::::::::::::::
const express = require ("express");

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

// Configuración del middleware ::::::::::::::::::::::::::::::::
app.use(express.static("public")); // Archivos estáticos
app.use(express.json()); // Para procesar JSON en el cuerpo de las solicitudes (requerido para req.body)
app.use(express.urlencoded({ extended: false })); // Para procesar datos de formularios

// Configuración del motor de vistas ::::::::::::::::::::::::::
app.set("view engine", "ejs");


// Rutas principales :::::::::::::::::::::::::::::::::::::::::::
// Ruta base (renderiza la vista de registro)
app.get("/registro", (req, res) => {
    res.render("registro");
});

/* app.get("/",function(req,res){
    res.send("Hola mundo");
});  */ 


// Ruta para manejar datos del formulario
app.post("/registro", (req, res) => {
    const datos = req.body;
    console.log(datos);
    res.send("Datos recibidos y validados");

    let nombre= datos.nombre;
    let email= datos.email;
    let password= datos.password;

    let registrar = "INSERT INTO usuarios (nombre,email,password) VALUES ('"+nombre +"','"+email +"','"+password +"')";
    conexion.query(registrar, function(err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        });
        

});

// Configuración del servidor ::::::::::::::::::::::::::::::::::
const PORT = 3000;
app.listen(3000, () => {
    console.log(`Servidor iniciado en el puerto ${3000}: http://localhost:${3000}/`);
});
