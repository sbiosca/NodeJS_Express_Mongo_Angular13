const express = require("express");
const conectarDB = require("./config/db");
// const cors = require("cors");
const app = express();


conectarDB();

app.use(express.json());
// app.use(cors());
app.use(require("./routes"));
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
    
app.listen(3000, "127.0.0.1", () => {
//app.get('port')
console.log(`El servidor está corriendo perfectamente en el puerto 3000`);
});