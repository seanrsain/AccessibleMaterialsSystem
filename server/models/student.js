'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('tblStudent', {
    StudentID: { type: Sequelize.INTEGER, primaryKey: true },
    DisabilityTypeCert: { type: Sequelize.INTEGER},
    DistrictID: { type: Sequelize.INTEGER},
    CountyID: { type: Sequelize.INTEGER},
    EducationFacilityTypeID: { type: Sequelize.INTEGER},
    GaTestingID: { type: Sequelize.INTEGER},
    Lname: { type: Sequelize.STRING},
    Mname: { type: Sequelize.STRING},
    Fname: { type: Sequelize.STRING},
    DOB: { type: Sequelize.DATE},
    GradeID: { type: Sequelize.INTEGER},
    LanguageID: { type: Sequelize.INTEGER},
    DateLatestEyeExam:{ type: Sequelize.DATE},
    CertExamTypeID: { type: Sequelize.INTEGER},
    WrittenPlanTypeID: { type: Sequelize.INTEGER},
    DateWrittenPlan: { type: Sequelize.INTEGER},
    PrimaryReadingMediumTypeID: { type: Sequelize.INTEGER},
    Secondary1ReadingMediumTypeID: { type: Sequelize.INTEGER},
    Secondary2ReadingMediumTypeID: { type: Sequelize.INTEGER},
    NeedIMaterialsCert: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    APHID: { type: Sequelize.INTEGER},
    ParentConsent: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
  });

  return Student;
};
