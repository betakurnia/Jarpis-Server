const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTheorys(data, file) {
  let errors = {};

  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.description)) {
    errors.description = "Judul tidak boleh kosong";
  }

  if (isEmpty(file)) {
    errors.file = "File tidak boleh kosong";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
