/*jshint esversion :  6 */
// ./model/database.js

const database = function database(config) {
  const mysql  = require('mysql'); // on récupère le driver de connexion de nodeJS à mySQL
  // const user = require("user");
  // console.log(user);
  // READ THE DOC !!! https://github.com/mysqljs/mysql
  const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    port     : '8888',
    password : config.password, //
    database : config.database, //
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  });

  const connect = function connect() {
    connection.connect(function(err, res) {
      if (err) return console.error(err);
      else console.log("db connected");
       // le serveur node est connecté au serveur mysql (BDD)
    });
  };

  connect();

  const end = function end() {
    connection.end(); // on termine la connection à la BDD
  };

  const test = function test() {
    // fonction de tes pour vérifier la bonne connection
    const sql = 'SELECT 1 + 1 AS solution';
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results[0].solution);
    });
  };

  return {
    connection,
    test
  };
};

module.exports = database;
