
/* jshint esversion : 6 */

// /api/index.js

// ROUTAGE DE L'API
const api = function api() {

  const APIVersion = 1; // notre api est en version 1

  const database = require(__dirname + "/../model")({
    user: "root",
    password: "root",
    database: "gestion_stock_crud",
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
  });

  // IMPORT DES ROUTES DE l'API produit
  const routers = []; // on expotera ce tableau une fois rempli
  const produitsRouter = require("./produits")(database.connection); // module api produit
  
  routers.push(produitsRouter);
  

  const marquesRouter = require("./marques")(database.connection);
  routers.push(marquesRouter);
 
  
  return { // définition des propriétés publiques du module /api/index.js
    version: APIVersion,
    prefix:`/api/v${APIVersion}`,
    routers: routers
  }; // on récupère ces valeurs dans @root/index.js
};

module.exports = api;