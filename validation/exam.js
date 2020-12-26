const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExamData(data) {
  let errors = {};

  // data.examStudentAnswer = !isEmpty(data.examStudentAnswer)
  //   ? data.examStudentAnswer
  //   : "";

  for (let i = 0; i < data.question.length; i++) {
    console.log(data.question[i]);
    // console.log(data.question[i].examStudentAnswer);
    if (
      (data.question[i].answer === "a") |
      (data.question[i].answer === "b") |
      (data.question[i].answer === "c") |
      (data.question[i].answer === "d")
    ) {
      errors.examStudentAnswer = "Field tidak boleh kosong";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
