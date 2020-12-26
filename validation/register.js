const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.nama = !isEmpty(data.nama) ? data.nama : "";

  if (!Validator.isEmail(data.username)) {
    errors.username = "Username/Email tidak valid";
  }

  if (isEmpty(data.username)) {
    errors.username = "Email / Username tidak boleh kosong";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password tidak boleh kosong";
  }

  if (Validator.isEmpty(data.role)) {
    errors.role = "Role tidak boleh kosong";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Nama tidak boleh kosong";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
