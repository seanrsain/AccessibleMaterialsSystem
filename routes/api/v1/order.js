var express = require('express');
var router = express.Router();
var models = require('../../../server/models');
var sessionHelper = require('../../../server/helpers/session');

router.post('/add', function(req, res, next) {
  req.body.PatronID = sessionHelper.currentUserId(req, res);
  req.body.Status = "Awaiting Approval"
  models.order.create(req.body).catch(
    function(error) {
      res.status(401).json({
        'error': error
      });
    }
  ).done(function(newOrder) {
    //console.log(req.body);
    //console.log(newOrder);
    res.status(200).json(newOrder);
  })
});

router.get('/orders', function(req, res, next) {
  models.order.findAll({
    where: {
      PatronID: req.query.patronid,
    },
    include: [{
      model: models.item
    },{
      model: models.student
    }],
  }).catch((error) => {
    res.status(401).json({
      'error': error
    });
  }).done((allOrders) => {
    res.status(200).json(allOrders);
  });
  // models.student.findAll({
  //   where: {
  //     PatronID: req.query.patronid
  //   },
  //   //include: [{model: models.student}],
  //   include: [{
  //     model: models.order,
  //     include: [{
  //       model: models.item
  //     }]
  //   }]
  // }).catch(
  //   function(error) {
  //     res.status(401).json({
  //       'error': error
  //     });
  //   }
  // ).done(function(allOrders) {
  //   console.log("All Orders");
  //   console.log(allOrders);
  //   res.status(200).json(allOrders);
  // });
});

router.put('/reassign', function(req, res, next) {
  req.body.OrderID = parseInt(req.body.OrderID);
  req.body.StudentID = parseInt(req.body.StudentID);
  models.order.find({
    where: {
      id: req.body.OrderID
    }
  }).done(function(record) {
    if (record) {
      record.updateAttributes({
        studentId: req.body.StudentID
      }).done(function() {
        res.status(200).json({
          'message': 'Student changed for order'
        });
      });
    }
  });
});

router.put('/cancel', function(req, res, next) {
  req.body.OrderID = parseInt(req.body.OrderID);
  models.order.destroy({
    where: {
      id: req.body.OrderID
    }
  }).done(function() {
    res.status(200).json({
      'message': 'Order deleted'
    })
  })
});

module.exports = router;
