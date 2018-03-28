var express = require('express');
var router = express.Router();
var models = require('../../../server/models');
var sessionHelper = require('../../../server/helpers/session');

router.post('/add', function(req, res, next) {
  req.body.PatronID = sessionHelper.currentUserId(req, res);
  models.order.create(req.body).catch(
    function(error) {
      res.status(401).json({
        'error': error
      });
    }
  ).done(function(newOrder) {
    console.log(req.body);
    console.log(newOrder);
    res.status(200).json(newOrder);
  })
});

router.get('/orders', function(req, res, next) {
  models.order.findAll({
    where: {
      PatronID: req.query.patronid
    }
  }).catch(
    function(error) {
      res.status(401).json({
        'error': error
      });
    }
  ).done(function(allOrders) {
    res.status(200).json(allOrders);
  });
});

module.exports = router;
