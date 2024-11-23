const mysql = require("mysql2");

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "talento",
  authPlugins: { mysql_clear_password: () => () => Buffer.from("123456") },
});

conexion.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err);
  } else {
    console.log("Conexión exitosa");
  }
});

const nuevoregistro =
  "INSERT INTO novedades (id_novedad, titulo, contenido, autor, fecha_publicacion, categoria) VALUES (NULL, 'Great Place to work', 'Todo lo que necesitas saber sobre great Place to work', 'Juan Perez', CURRENT_TIMESTAMP, 'Novedades')";
conexion.query(nuevoregistro, (err, results) => {
  if (err) {
    console.error("Error de inserción:", err);
  } else {
    console.log("Registro insertado con éxito");
  }
});

const modificar =
  "UPDATE novedades SET titulo = 'De vuelta a la oficina?' WHERE novedades.id_novedad = 14";
conexion.query(modificar, (err, results) => {
  if (err) {
    console.error("Error de modificación:", err);
  } else console.log("Registro modificado con éxito");
});

const borrarregistro =
"DELETE FROM novedades WHERE novedades.id_novedad = 20";
conexion.query(borrarregistro, (err, results) => {
    if (err) {
        console.error("Error de eliminación:", err);
        } else console.log("Registro eliminado con éxito");
        });

const categorias = "SELECT * FROM novedades";
conexion.query(categorias, (err, rows) => {
  if (err) {
    console.error("Error de consulta:", err);
  }
  //console.log(rows.length); // si quiero que me muestre todos los datos hago la consulta sin el length
  else console.log(rows);
});

conexion.end();
