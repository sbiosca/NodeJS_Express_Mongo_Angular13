const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));


conectarDB();

const port = process.env.PORT || 8080;
//cargar models
require('./models/Product.model');
require('./models/category.model');

app.use(express.json());
// app.use(cors());
app.use(require("./routes"));
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
    
app.listen(port, "0.0.0.0", () => {
//app.get('port')
console.log(`El servidor está corriendo perfectamente en el puerto ${port}`);
});