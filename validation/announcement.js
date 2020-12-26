const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAnnouncement(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Judul tidak boleh kosong";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Deskripsi tidak boleh kosong";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
