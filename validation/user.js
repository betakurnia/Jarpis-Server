const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateUserInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Email / Username tidak boleh kosong";
  }

  if (!Validator.isEmail(data.username)) {
    errors.username = "Username/Email tidak valid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password tidak boleh kosong";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
