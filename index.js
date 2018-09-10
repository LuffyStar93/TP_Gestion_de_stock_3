const express = require("express");
const app = express();
const port = 4444;
const api = require(__dirname + "/api")(app);
const http = require("http");



// APP CONFIG !!!
app.use(express.json({extended: false}));
app.use(api.prefix, api.routers);
app.set('view engine', 'ejs'); // CHECK THE DOC http://ejs.co/
app.set('views', __dirname + '/view'); //  précise à express le dossier des vues
app.use('/ejs', express.static(__dirname + '/node_modules/ejs'));
app.use(express.static(__dirname + '/public'));

// TEMPLATE VARS !!!
// Accessibles dans tout le template via app.locals (API express)
app.locals.site = {};
app.locals.site.title = "TP - Gestion de Stock 3";
app.locals.site.description = "TP CRUD";
app.locals.site.nav = [
  {label: "BizOnline - Gestion de Stock", route: "/"},
];


// ROUTES DES PAGES DE l'APPLICATION

app.get('/', function(req, res) {
  const url = "http://localhost:4444/api/v1/produits";
  http.get (url, function(response) {
    var result = [];
    response.on("data", function (chunk){
      result += chunk;
    })


  const url2 = "http://localhost:4444/api/v1/marques";
  http.get (url2, function(response) {
    var result2 = [];
    response.on("data", function (chunk){
      result2 += chunk;
    })

    response.on("end", function(){
      res.render('index' , {
        title: 'produits',
        prod: JSON.parse(result),
        marques: JSON.parse(result2)
      });
    });
    response.on("error", function() {
      console.error("erreur");
    })
  });
   });
});





//----------------------------------------------
app.listen(port, function() {
  console.log("node server started on port " + port);
});