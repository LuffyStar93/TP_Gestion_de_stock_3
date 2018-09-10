/*jshint esversion :  6 */

// /model/marques.js

const marquesModel = function marqueModel(connection) {

  const create = function createMarques(clbk, data) {
    const q = "INSERT INTO marque(name) VALUES (?)";
    const payload = [data.name];

    connection.query(q, payload, (err, res, cols) => {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(err, null);
      return clbk(null, res);
    });
  };

  const remove = function deleteMarques(clbk, ids) {
    // la clause SQL IN permet de chercher une valeur dans un tableau
    const q = "DELETE FROM marque WHERE id IN (?)";

    connection.query(q, [ids], function (err, res, fields) {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(res, null);
      return clbk(null, res);
    });
  };

  const update = function editMarques(clbk, marque) {
    const q = "UPDATE marque SET name = ? WHERE id = ?";
    const payload = [marque.name, marque.id];
    connection.query(q, payload, function (err, res, fields) {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(err, null);
      return clbk(null, res);
    });
  };

  const get = function getMarques(clbk, id) {
    var sql;

    if (id && !isNaN(id)) {
      sql = "SELECT * FROM marque WHERE id = ?";
    } else {
      sql = "SELECT * FROM marque";
    }

    connection.query(sql, [id], (error, results, fields) => {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (error) return clbk(error, null);
      return clbk(null, results);
    });
  };

  return {
    create,
    remove,
    update,
    get
  };
};

module.exports = marquesModel;