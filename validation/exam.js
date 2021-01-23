const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExamData(data) {
  let errors = {};

  if (!data.question.length === data.examStudentAnswer.length) {
    errors.examStudentAnswer = "Field tidak boleh kosong";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
