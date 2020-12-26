const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExamsData(data) {
  let errors = {};

  // data.question = !isEmpty(data.question) ? data.question : "";
  data.question.examName = !isEmpty(data.question.examName)
    ? data.question.examName
    : "";

  for (let i = 0; i < data.question.length; i++) {
    if (data.question[i].possibilitesAnswer.includes("")) {
      errors.examStudentAnswer = "Field tidak boleh kosong";
    }
  }

  if (!isEmpty(data.question.examName)) {
    errors.examStudentAnswer = "Field tidak boleh kosong";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
