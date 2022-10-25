const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
const app = express();
const session = require('express-session')

// var corsOptions = {
//   origin: "http://localhost:4200"
// };

app.use(cors());
conectarDB();

const port = process.env.PORT || 3000;
app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));
//cargar models
require('./');
require('./models/product.model');
require('./models/category.model');
require('./models/User.model');
require('./config/passport')

app.use(express.json());
// app.use(cors());
app.use(require("./routes"));

app.get('/', function(req, res) {
  res.send("{Message: THE APPLICATION IS RUNNING}");
})

//  app.use(function (req, res, next) {
//      var err = new Error("Not Found");
//      err.status = 404;
//      next(err);
//    });
    
app.listen(port, "0.0.0.0", () => {
console.log(`El servidor está corriendo perfectamente en el puerto ${port}`);
});