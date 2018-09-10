/*jshint esversion :  6 */

// /api/marques.js

const marquesAPi = function marquesAPi(connection) {
  const router = require("express").Router();
  const marquesModel = require("./../model/marques")(connection);

  router.post('/marques', (req, res) => {
    marquesModel.create((err, dataset) => {
      res.send(dataset);
    }, req.body); // post datas ici ...
  });

  router.get('/marques/:id', (req, res) => {
    marquesModel.get((err, dataset) => {
      res.send(dataset[0]);
    }, req.params.id);
  });

  router.get('/marques', (req, res) => {
    marquesModel.get( (err, dataset) => {
      res.send(dataset);
    }, null);
  });

  router.delete('/marques', (req, res) => {
    marquesModel.remove((err, dataset) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(dataset);
    }, req.body.ids); // tableau d'ids ici ...
  });

  router.patch('/marques', (req, res) => {
    marquesModel.update((err, dataset) => {
      if (err) return res.status(500).send(err);
      else return res.status(200).send(dataset);
    }, req.body); // un tableau d'ids ici ...
  });

  return router;
};


module.exports = marquesAPi;
