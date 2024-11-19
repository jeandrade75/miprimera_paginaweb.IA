// importar la libreria
const express = require ("express");

// objetos para llamar los metodos de express
const app = express();

app.get("/",function(req,res){
    res.send("Hola mundo");

});

// configurar el puerto usado por el servidor 
app.listen(3000,function(){
    console.log("Servidor iniciado en el puerto 3000 es http://localhost:3000/");


});
