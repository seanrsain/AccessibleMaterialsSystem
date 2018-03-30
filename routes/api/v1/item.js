var express = require('express');
var router = express.Router();
var models = require('../../../server/models');
var sessionHelper = require('../../../server/helpers/session');

router.post('/add', function(req, res, next) {
  models.item.create(req.body).catch(
    function(error) {
      res.status(401).json({
        'error': error
      });
    }
  ).done(function(newItem) {
    console.log(req.body);
    console.log(newItem);
    res.status(200).json(newItem);
  })
});

router.get('/allItems', function(req, res, next) {
  models.item.findAll({

  }).catch(
    function(error) {
      res.status(401).json({
        'error': error
      });
    }
  ).done(function(allItems) {
    res.status(200).json(allItems);
  });
});

router.get('/items', function(req, res, next) {
  models.item.findAll({
    where: {
      $or: [
        {
          ISBN:
          {
            $eq: req.query.ISBN
          }
        },
        {
          Name:
          {
            $eq: req.query.Name
          }
        }
      ]
    }
  }).catch(
    function(error) {
      res.status(401).json({
        'error': error
      });
    }
  ).done(function(allItems) {
    res.status(200).json(allItems);
  });
});



module.exports = router;
