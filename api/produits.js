/* jshint esversion : 6 */

// /api/produits.js

const produitsAPi = function produitsAPi(connection) {
  const router = require("express").Router();
  const produitsModel = require("./../model/produits")(connection);

  router.post('/produits', (req, res) => {
    console.log(req.body)
    produitsModel.create((err, dataset) => {
      res.send(dataset);

    }, req.body); // post datas ici ...
  });

  router.get('/produits/:id', (req, res) => {
    produitsModel.get((err, dataset) => {
      res.send(dataset[0]);
    }, req.params.id);
  });

  router.get('/produits', (req, res) => {
    produitsModel.get( (err, dataset) => {
      res.send(dataset);
    }, null);
  });

  router.delete('/produits', (req, res) => {
    produitsModel.remove((err, dataset) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(dataset);
    }, req.body.ids); // tableau d'ids ici ...
  });

  router.patch('/produits', (req, res) => {
    produitsModel.update((err, dataset) => {
      if (err) return res.status(500).send(err);
      else return res.status(200).send(dataset);
    }, req.body); // un tableau d'ids ici ...
  });

  return router;
};

module.exports = produitsAPi;
