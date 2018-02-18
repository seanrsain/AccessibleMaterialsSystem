var express = require('express');
var router = express.Router();
var models = require('../../../server/models');
var sessionHelper = require('../../../server/helpers/session');




router.post('/register', function(req, res, next) {
   models.student.create(req.body).catch(
     function(error) {
       res.status(401).json({'error': error});
     }
   ).done(function(newStudent) {
     res.status(200).json(newStudent);
   })
});


module.exports = router;
