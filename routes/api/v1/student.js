var express = require('express');
var router = express.Router();
var models = require('../../../server/models');
var sessionHelper = require('../../../server/helpers/session');


router.post('/register', function(req, res, next) {
   // req.body.DisabilityTypeCert = 1;
   // req.body.DistrictID = 1;
   // req.body.CountyID = 1;
   // req.body.EducationFacilityTypeID = 1;
   // req.body.GaTestingID = 1;
   // req.body.GradeID = 1;
   // req.body.LanguageID = 1;
   // req.body.CertExamTypeID = 1;
   // req.body.WrittenPlanTypeID = 1;
   // req.body.PrimaryReadingMediumTypeID = 1;
   // req.body.Secondary1ReadingMediumTypeID = 1;
   // req.body.Secondary1ReadingMediumTypeID = 1;
   // req.body.Secondary2ReadingMediumTypeID = 1;
   // req.body.NeedIMaterialsCert = true;
   // req.body.APHID = 1;
   // req.body.ParentConsent = true;
   // req.body.PatronID = 1;
   // req.body.DOB = new Date('2014-04-03');
   // req.body.DateWrittenPlan = new Date('2014-04-03');
   // req.body.DateLatestEyeExam = new Date('2014-04-03');
   models.student.create(req.body).catch(
     function(error) {
       res.status(401).json({'error': error});
     }
   ).done(function(newStudent) {
     console.log(req.body);
     console.log(newStudent);
     res.status(200).json(newStudent);
   })
});

router.get('/students', function(req, res, next) {
  models.student.findAll({
    where: {
      PatronID: req.query.patronid
    }
  }).catch(
    function(error) {
      res.status(401).json({'error': error});
    }
  ).done(function(allStudents) {
    res.status(200).json(allStudents);
  });
});


module.exports = router;
