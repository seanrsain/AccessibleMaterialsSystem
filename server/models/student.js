'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('student', {
    DisabilityTypeCert: { type: DataTypes.INTEGER},
    DistrictID: { type: DataTypes.INTEGER},
    CountyID: { type: DataTypes.INTEGER},
    EducationFacilityTypeID: { type: DataTypes.INTEGER},
    GaTestingID: { type: DataTypes.INTEGER},
    Lname: { type: DataTypes.STRING},
    Mname: { type: DataTypes.STRING},
    Fname: { type: DataTypes.STRING},
    DOB: { type: DataTypes.DATE},
    GradeID: { type: DataTypes.INTEGER},
    LanguageID: { type: DataTypes.INTEGER},
    DateLatestEyeExam:{ type: DataTypes.DATE},
    CertExamTypeID: { type: DataTypes.INTEGER},
    WrittenPlanTypeID: { type: DataTypes.INTEGER},
    DateWrittenPlan: { type: DataTypes.DATE},
    PrimaryReadingMediumTypeID: { type: DataTypes.INTEGER},
    Secondary1ReadingMediumTypeID: { type: DataTypes.INTEGER},
    Secondary2ReadingMediumTypeID: { type: DataTypes.INTEGER},
    NeedIMaterialsCert: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    APHID: { type: DataTypes.INTEGER},
    ParentConsent: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    PatronID: {type: DataTypes.INTEGER}
  });

  return Student;
};
