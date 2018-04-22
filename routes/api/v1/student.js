var express = require('express');
var router = express.Router();
var models = require('../../../server/models');
var sessionHelper = require('../../../server/helpers/session');


router.post('/register', function(req, res, next) {
  req.body.DisabilityTypeCert = parseInt(req.body.DisabilityTypeCert);
  req.body.DistrictID = parseInt(req.body.DistrictID);
  req.body.CountyID = parseInt(req.body.CountyID);
  req.body.EducationFacilityTypeID = parseInt(req.body.EducationFacilityTypeID);
  req.body.GaTestingID = parseInt(req.body.GaTestingID);
  req.body.GradeID = parseInt(req.body.GradeID);
  req.body.LanguageID = parseInt(req.body.LanguageID);
  req.body.CertExamTypeID = parseInt(req.body.CertExamTypeID);
  req.body.WrittenPlanTypeID = parseInt(req.body.WrittenPlanTypeID);
  req.body.PrimaryReadingMediumTypeID = parseInt(req.body.PrimaryReadingMediumTypeID);
  req.body.Secondary1ReadingMediumTypeID = parseInt(req.body.Secondary1ReadingMediumTypeID);
  req.body.Secondary2ReadingMediumTypeID = parseInt(req.body.Secondary2ReadingMediumTypeID);;
  req.body.NeedIMaterialsCert = req.body.NeedIMaterialsCert == "true";
  req.body.APHID = parseInt(req.body.APHID);
  req.body.ParentConsent = req.body.ParentConsent == "true";
  req.body.PatronID = sessionHelper.currentUserId(req, res);
  req.body.DOB = new Date(req.body.DOB);
  req.body.DateWrittenPlan = new Date(req.body.DateWrittenPlan);
  req.body.DateLatestEyeExam = new Date(req.body.DateLatestEyeExam);
  req.body.Status = 0;
  console.log(req.body);
  models.student.create(req.body).catch(
    function(error) {
      res.status(401).json({
        'error': error
      });
    }
  ).done(function(newStudent) {
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
      res.status(401).json({
        'error': error
      });
    }
  ).done(function(allStudents) {
    res.status(200).json(allStudents);
  });
});

router.put('/changeStatus', function(req, res, next) {
  req.body.StudentID = parseInt(req.body.StudentID);
  models.student.find({
    where: {
      id: req.body.StudentID
    }
  }).done(function(record) {
    console.log(record);
    if (record) {
      record.updateAttributes({
        Status: req.body.Status
      }).done(function() {
        res.status(200).json({
          'message': 'Student status changed'
        });
      });
    }
  });
});


module.exports = router;
